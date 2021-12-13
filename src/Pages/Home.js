import React from "react";
import PathfindingVisualizer from "../PathfindingVisualizer/PathfindingVisualizer";

export default function Home() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
      <PathfindingVisualizer />
    </div>
  );
}
