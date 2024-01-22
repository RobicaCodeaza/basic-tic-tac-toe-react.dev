import { useRef, useState } from 'react';

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

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const sign = useRef('X');
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // TODO
    const nextHistory = [...history.slice(0, currentMove + 1, nextSquares)];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    sign.current === 'X' ? (sign.current = 'O') : (sign.current = 'X');
  }
  function jumpTo(move) {
    setCurrentMove(move);
    move % 2 === 0 ? (sign.current = 'X') : (sign.current = 'O');
  }
  return (
    <div className='game'>
      <div className='game-board'>
        <Board sign={sign} squares={currentSquares} onPlay={handlePlay}></Board>
      </div>
      <div className='game-info'>
        <ol>
          {history.map((squares, move) => {
            let description;
            if (move > 0) {
              description = 'Go to move #' + move;
            } else {
              description = 'Go to game start';
            }
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Board({ sign, squares, onPlay }) {
  // const [squares, setSquares] = useState(Array.from(9).fill(null));
  // const sign = useRef('X');
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + sign.current;
  }

  const handleClick = function (i) {
    const newSquares = squares.slice();
    if (newSquares[i] || calculateWinner(squares)) return;
    newSquares[i] = sign.current;
    onPlay(newSquares);
  };
  return (
    <div className='Board'>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square
          value={squares[0]}
          onClickSquare={() => handleClick(0)}
        ></Square>
        <Square
          value={squares[1]}
          onClickSquare={() => handleClick(1)}
        ></Square>
        <Square
          value={squares[2]}
          onClickSquare={() => handleClick(2)}
        ></Square>
      </div>
      <div className='board-row'>
        <Square
          value={squares[3]}
          onClickSquare={() => handleClick(3)}
        ></Square>
        <Square
          value={squares[4]}
          onClickSquare={() => handleClick(4)}
        ></Square>
        <Square
          value={squares[5]}
          onClickSquare={() => handleClick(5)}
        ></Square>
      </div>
      <div className='board-row'>
        <Square
          value={squares[6]}
          onClickSquare={() => handleClick(6)}
        ></Square>
        <Square
          value={squares[7]}
          onClickSquare={() => handleClick(7)}
        ></Square>
        <Square
          value={squares[8]}
          onClickSquare={() => handleClick(8)}
        ></Square>
      </div>
    </div>
  );
}
function Square({ value, onClickSquare }) {
  return (
    <button className='square' onClick={onClickSquare}>
      {value}
    </button>
  );
}

export default App;
