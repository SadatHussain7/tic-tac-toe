import React from "react";
import Board from "./Board";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;
