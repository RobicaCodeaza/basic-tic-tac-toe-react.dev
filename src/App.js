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
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}

function App() {
  // const sign = useRef('X');
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [historyPosition, setHistoryPosition] = useState([null, null]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const sign = currentMove % 2 === 0 ? 'X' : 'O';
  const [ascendingOrder, setAscendingOrder] = useState(true);
  console.log(history);

  function handlePlay(nextSquares, position) {
    // TODO
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    const row = Math.trunc(position / 3) + 1;
    const column = (position % 3) + 1;
    const currentPosition = [row, column];
    setHistoryPosition([
      ...historyPosition.slice(0, currentMove + 1),
      currentPosition,
    ]);
  }
  function jumpTo(move) {
    setCurrentMove(move);
  }
  function sort() {
    setAscendingOrder((order) => !order);
  }
  return (
    <div className='game'>
      <div className='game-board'>
        <Board sign={sign} squares={currentSquares} onPlay={handlePlay}></Board>
      </div>
      <div className='game-info'>
        <ol>
          {ascendingOrder &&
            history.map((squares, move) => {
              let description;
              if (move > 0) {
                description = `Go to move # ${move} (${historyPosition[move]})`;
              } else {
                description = 'Go to game start';
              }
              return (
                <li key={move}>
                  <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
              );
            })}
          {ascendingOrder ||
            history
              .map((squares, move) => {
                let description;
                if (move > 0) {
                  description = `Go to move # ${move} (${historyPosition[move]})`;
                } else {
                  description = 'Go to game start';
                }
                return (
                  <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                  </li>
                );
              })
              .reverse()}
        </ol>
        <button onClick={sort}>Sort by</button>
      </div>
    </div>
  );
}

function Board({ sign, squares, onPlay }) {
  // const [squares, setSquares] = useState(Array.from(9).fill(null));
  // const sign = useRef('X');
  const [winner, lines] = calculateWinner(squares);
  const boardRow = Array.from({ length: 3 });
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + sign;
  }

  const handleClick = function (i) {
    const newSquares = squares.slice();
    if (newSquares[i] || winner) return;
    newSquares[i] = sign;
    onPlay(newSquares, i);
  };
  return (
    <div className='Board'>
      <div className='status'>{status}</div>
      {boardRow.map((el, index) => {
        return (
          <div className='board-row'>
            {Array.from({ length: 3 }, (_, currentIndex) => {
              const position = index * 3 + currentIndex;
              return (
                <Square
                  winSquare={lines?.find(
                    (winningPosition) => winningPosition === position
                  )}
                  value={squares[position]}
                  onClickSquare={() => handleClick(position)}
                ></Square>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
function Square({ value, onClickSquare, winSquare }) {
  return (
    <button
      className={winSquare ? `active square` : 'square'}
      onClick={onClickSquare}
    >
      {value}
    </button>
  );
}

export default App;
