import { useEffect, useState, useRef } from 'react'
import { useMouse } from "@uidotdev/usehooks";
import './Game.css';

const CELL_SIZE = 10;
const WIDTH = 1000;
const HEIGHT = 750;

function useInterval(callback, delay) {
    const savedCallback = useRef();
   
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
   
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  

function Cell({ x, y }) {
    return (
        <div className="Cell" style={{
            left: `${CELL_SIZE * x + 1}px`,
            top: `${CELL_SIZE * y + 1}px`,
            width: `${CELL_SIZE - 1}px`,
            height: `${CELL_SIZE - 1}px`,
        }} />
    );
}

export default function Game() {
    const rows = HEIGHT / CELL_SIZE;
    const cols = WIDTH / CELL_SIZE;
    const [board, setBoard] = useState(makeEmptyBoard());
    const [cells, setCells] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInt] = useState(1000);
    const [mouse, ref] = useMouse();
    const [intervalId, setIntervalID] = useState(null);
    
    useInterval(() => {
        runIteration();
    }, isRunning ? interval : null);

    function makeEmptyBoard() {
        let b = [];
        for (let y = 0; y < rows; y++) {
            b[y] = [];
            for (let x = 0; x < cols; x++) {
                b[y][x] = false;
            }
        }
        return b;
    }

    function makeCells() {
        let nextCells = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (board[y][x]) {
                    nextCells.push({ x, y });
                }
            }
        }
        return nextCells;
    }

    function handleClick(x, y) {
        console.log(x, y, cells.length)

        if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
            const nextBoard = board.slice();
            nextBoard[y][x] = !nextBoard[y][x];
            setBoard(nextBoard);
            setCells(makeCells(nextBoard));
        }
    }

    function runGame() {
        setIsRunning(true);
    }

    function stopGame() {
        setIsRunning(false);
        clearInterval(intervalId);
    }

    function runIteration() {
        console.log('running iteration');
        const nextBoard = makeEmptyBoard();

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let neighbors = calculateNeighbors(board, x, y);
                if (board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        nextBoard[y][x] = true;
                    } else {
                        nextBoard[y][x] = false;
                    }
                } else {
                    if (neighbors === 3) {
                        nextBoard[y][x] = true;
                    }
                }
            }
        }
        
        setBoard(nextBoard);
        setCells(makeCells);
    }

    function handleRandom() {

    }

    function handleClear() {
        setBoard(makeEmptyBoard);
        setCells([]);
    }

    function calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];
    
            if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
                neighbors++;
            }
        }
    
        return neighbors;
    }


    return (
        <div>
            <div className="Board"
                style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
                onClick={() => handleClick(Math.floor(mouse.elementX / CELL_SIZE), Math.floor(mouse.elementY / CELL_SIZE))}
                ref={ref}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y}
                        key={`${cell.x},${cell.y}`} />
                ))}
            </div>
            <div className="controls">
                Update every <input value={interval} onChange={e => setInt(e.target.value)} /> msec
                {isRunning ?
                    <button className="button" onClick={stopGame}>Stop</button> :
                    <button className="button" onClick={runGame}>Run</button>
                }
                <button className="button" onClick={handleRandom}>Random</button>
                <button className="button" onClick={handleClear}>Clear</button>
            </div>
            <div>
                <button className="button" onClick={runIteration}>Advance</button>
            </div>

        </div>);
}

function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    );
}

