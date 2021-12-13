import React from "react";
import "./Node.css";

export default function Node(props) {
  const { row, col, type, onMouseDown, onMouseEnter, onMouseUp } = props;

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${type}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
    ></div>
  );
}
