// Calls all the needed functions to get the algorithm up and running
export function visualizeDijkstra(
  grid,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol,
  setIsAnimationRunning
) {
  const startNode = grid[startNodeRow][startNodeCol];
  const finishNode = grid[finishNodeRow][finishNodeCol];
  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateDijkstra(
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    startNodeRow,
    startNodeCol,
    finishNodeRow,
    finishNodeCol
  );
  return false;
}

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If closest node is a wall, skip it
    if (closestNode.type === "wall") continue;
    // If the closest node is at a distance of infinity, we are trapped
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

// Animates the Dijktra algorithm working
function animateDijkstra(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(
          nodesInShortestPathOrder,
          startNodeRow,
          startNodeCol,
          finishNodeRow,
          finishNodeCol
        );
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      if (
        (node.row === startNodeRow && node.col === startNodeCol) ||
        (node.row === finishNodeRow && node.col === finishNodeCol)
      )
        return;

      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node instantvisited";

      setTimeout(async () => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 1);
    }, 10 * i);
  }
}

// Animates the shortest path when the algorithm reaches the end point
function animateShortestPath(
  nodesInShortestPathOrder,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const lastNode = nodesInShortestPathOrder[i - 1];
      const node = nodesInShortestPathOrder[i];

      if (
        (node.row === startNodeRow && node.col === startNodeCol) ||
        (node.row === finishNodeRow && node.col === finishNodeCol)
      )
        return;

      if (node.col > lastNode.col) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node right";
      }

      if (node.col < lastNode.col) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node left";
      }

      if (node.row > lastNode.row) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node down";
      }

      if (node.row < lastNode.row) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node up";
      }

      setTimeout(async () => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 90);
    }, 100 * i);
  }
}
