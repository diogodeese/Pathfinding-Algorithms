// Creates single nodes
const createNode = (
  col,
  row,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => {
  return {
    col,
    row,
    type:
      row === startNodeRow && col === startNodeCol
        ? "start"
        : row === finishNodeRow && col === finishNodeCol
        ? "finish"
        : "",
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

// Creates the whole grid with the nodes
export function getInitialGrid(
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(
        createNode(
          col,
          row,
          startNodeRow,
          startNodeCol,
          finishNodeRow,
          finishNodeCol
        )
      );
    }
    grid.push(currentRow);
  }
  return grid;
}
