import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [draw, setDraw] = useState(false);
  const [wonX, setWonX] = useState(0);
  const [wonO, setWonO] = useState(0);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    if (!newBoard.includes(null) && !calculateWinner(newBoard)) {
      setDraw(true);
      Swal.fire({
        title: "DRAW",
        text: "Something went wrong!",
      });
    }

    const winner = calculateWinner(newBoard);

    if (winner) {
      Swal.fire({
        title: `Winner: ${winner}`,
        text: "Congratulations!",
        icon: "success",
      });
      if (winner === "X") {
        setWonX(wonX + 1);
      } else if (winner === "O") {
        setWonO(wonO + 1);
      }
    } else if (!newBoard.includes(null)) {
      Swal.fire({
        title: "Draw",
        text: "It's a draw!",
        icon: "info",
      });
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="p-1" onClick={() => handleClick(index)}>
        <div className="position-relative p-4 m-3">
          <div className="position-absolute top-50 start-50 translate-middle">
            {board[index]}
          </div>
        </div>
      </button>
    );
  };
  const resetBoard = () => {
    console.log(board);
    board.fill(null);
    handleClick();
    setDraw(false);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="container h-100 d-flex align-items-center">
      <div className="row w-100 justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <div className="status mb-3">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <button
            className="btn btn-primary btn-lg btn-block my-3"
            onClick={resetBoard}
          >
            RESET
          </button>
          <div className="text-center">
            <div>games won X: {wonX}</div>
            <div>games won O: {wonO}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

export default App;
