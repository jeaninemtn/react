// https://react.dev/learn/tutorial-tic-tac-toe

// ---

import { useState, type SetStateAction } from 'react';

function Square({ value, onSquareClick }) {
	return (
		<button className="size-12 border" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay }) {
	function handleClick(i: number) {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="flex">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="flex">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="flex">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

function calculateWinner(squares: any[]) {
	// 贏的方式 有9種
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
		// 如果3個位置都是同一個選手 就是贏家
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			// 回傳贏家的名字
			return squares[a];
		}
	}
	return null;
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares: any) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove: SetStateAction<number>) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
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
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

// ---

// `export` is a JavaScript Keyword making this function accessible outside of this file

// `default` means it is the main function in this file

/*
注意這個語法

return (
  <>
	... html dom ...
  </>
)

React components need to return a single JSX element and not multiple adjacent JSX elements like two buttons. To fix this you can use Fragments (<> and </>) to wrap multiple adjacent JSX elements like this
*/