import React, { useState } from "react";
import "./App.css"; // Ensure you have this line to import the CSS

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i] || isDraw(newSquares)) {
      return;
    }
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i: number) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  const draw = isDraw(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="board-container">
      <div className="status">{status}</div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        {winner && (
          <div
            className={`winning-line winning-line-${winningLine.join("-")}`}
          />
        )}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

const isDraw = (squares: Array<string | null>) => {
  return (
    squares.every((square) => square !== null) && !calculateWinner(squares)
  );
};

export default Board;
