import React from "react";
import { render } from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
