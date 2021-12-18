import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { visualizeDijkstra } from "../Algorithms/Dijkstra";
import { getInitialGrid } from "./InitalGrid";
import "./PathfindingVisualizer.css";

// Setting up the default values
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const algorithms = ["Dijkstra"];

export default function PathfindingVisualizer() {
  const [choosenAlgorithm, setChoosenAlgorithm] = useState(algorithms[0]);
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    // Creates the whole grid with the nodes
    const grid = getInitialGrid(
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );
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

  // Changes the type of the node to "Wall" when a node is pressed or passed over
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    let newNode;

    if (node.type === "start" || node.type === "finish") {
      newNode = {
        ...node,
      };
    } else if (node.type === "wall") {
      newNode = {
        ...node,
        type: "",
      };
    } else {
      newNode = {
        ...node,
        type: "wall",
      };
    }

    newGrid[row][col] = newNode;
    return newGrid;
  };

  return (
    <div className="pathfinding-visualizer">
      <div className="bar">
        <h1 className="title">Pathfinding Algorithms</h1>

        <select
          onChange={(e) => {
            setChoosenAlgorithm(e.target.value);
          }}
        >
          {algorithms.map((algorithm) => {
            return <option>{algorithm}</option>;
          })}
        </select>
        <button
          onClick={() =>
            visualizeDijkstra(
              grid,
              START_NODE_ROW,
              START_NODE_COL,
              FINISH_NODE_ROW,
              FINISH_NODE_COL
            )
          }
          className="button"
        >
          Visualize {choosenAlgorithm}
        </button>
        <button
          onClick={() => {
            const restartGrid = getInitialGrid(
              START_NODE_ROW,
              START_NODE_COL,
              FINISH_NODE_ROW,
              FINISH_NODE_COL
            );
            setGrid(restartGrid);
          }}
          className="button"
        >
          Clear Board
        </button>
      </div>
      <div className="legend">
        <ul>
          <li>
            <div className="node start"></div>
            <h2>Start Node</h2>
          </li>
          <li>
            <div className="node finish"></div>
            <h2>Target Node</h2>
          </li>
          <li>
            <div className="node"></div>
            <h2>Unvisited Node</h2>
          </li>
          <li>
            <div className="node node-visited"></div>
            <h2>Visited Node</h2>
          </li>
          <li>
            <div className="node node-shortest-path"></div>
            <h2>Shortest Path Node</h2>
          </li>
          <li>
            <div className="node wall"></div>
            <h2>Wall Node</h2>
          </li>
        </ul>
      </div>
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
