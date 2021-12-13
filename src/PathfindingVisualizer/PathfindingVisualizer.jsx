import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/Dijkstra";
import "./PathfindingVisualizer.css";

  // Setting up the default values
  const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  const FINISH_NODE_ROW = 10;
  const FINISH_NODE_COL = 35;


export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // Creates single nodes
  const createNode = (col, row) => {
    return {
      col,
      row,
      type:
        row === START_NODE_ROW && col === START_NODE_COL
          ? "start"
          : row === FINISH_NODE_ROW && col === FINISH_NODE_COL
          ? "finish"
          : "",
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
  };

  useEffect(() => {
    // Creates the whole grid with the nodes
    const getInitialGrid = () => {
      const grid = [];
      for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
    };

    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  // Handle the wall function that work with the mouse
  function handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  // Animates the Dijktra algorithm working
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  // Animates the shortest path when the algorithm reaches the end point
  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  // Calls all the needed functions to get the algorithm up and running
  function visualizeDijkstra(grid) {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Changes the type of the node to "Wall" when a node is pressed or passed over
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    let newNode

    if(node.type === "start" || node.type === "finish") {
      newNode = {
        ...node,
      };
    } else if(node.type === "wall") {
      newNode = {
        ...node,
        type: ""
      };
    } else {
      newNode = {
        ...node,
        type: "wall"
      };
    };

    newGrid[row][col] = newNode;
    return newGrid;
  };

  return (
    <div className="pathfinding-visualizer">
      <button onClick={() => visualizeDijkstra(grid)} className="button">
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => window.location.reload()} className="button">
        Clear Border
      </button>
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIdx) => {
                const { row, col, type } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    type={type}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
