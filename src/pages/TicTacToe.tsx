// https://react.dev/learn/tutorial-tic-tac-toe

// ---

import { useState, type SetStateAction } from 'react';

/*

useState

Syntax:
const [value, setValue] = useState(null);

value: 目前的值
setValue: 改變值(value)的方法 & 觸發re render dom
null: 初始值為null
return: 一個陣列

https://www.w3schools.com/react/react_usestate.asp

*/

interface SquareProps {
	value: string | null;
	onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
	return (
		<button className="size-12 rounded-md bg-(--bg) dark:bg-amber-200" onClick={onSquareClick}>
			{value === 'X' && <i className="fa-solid fa-xmark"></i>}
			{value === 'O' && <i className="fa-regular fa-circle"></i>}
		</button>
	);
}

// 用type
// type BoardProps = {
// 	xIsNext: boolean;
// 	squares: (string | null)[];
// 	onPlay: (nextSquares: (string | null)[]) => void;
// };

// 用interface
interface BoardProps {
	xIsNext: boolean;
	squares: Array<string | null>;
	onPlay: (nextSquares: Array<string | null>) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {

	/* 1. ES6解構語法
	function Board(props) {
		const xIsNext = props.xIsNext;	// boolean	現在輪到X嗎
		const squares = props.squares;	// array	現在的棋盤狀態
		const onPlay = props.onPlay;	// function	更新棋盤
	}
	*/

	// 每個square被點擊之後 會將自己的index傳入這個function
	function handleClick(i: number) {

		// 判斷是不是能繼續下棋
		// 不能的狀況:
		// 1. 已有贏家
		// 2. 該格子已經有棋子
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		// 複製一份squares 不直接修改原本的state
		const nextSquares = squares.slice();

		// 下棋 在棋盤上留下誰下的棋
		// 在棋盤位置上 紀錄是誰下的棋
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}

		// 讓父元件更新歷史資料
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
			<div>{status}</div>
			<div className="grid grid-cols-3 gap-2">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />

				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />

				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

// 計算誰是贏家
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

	// 1. 對弈歷史紀錄
	// history = 初始值 (9個null) 因為遊戲尚未開始
	// [[null, null, null, ... , null]]
	const [history, setHistory] = useState([Array(9).fill(null)]);

	// 2. 目前下到第幾步
	// currentMove = 初始值 0 => 遊戲尚未開始
	const [currentMove, setCurrentMove] = useState(0);

	// 3. 
	// 偶數步: 選手X 
	// 奇數步: 選手O
	const xIsNext = currentMove % 2 === 0;

	// 4. 取得目前這一步的遊戲狀態
	// 第0步: 全部是null
	// 第1步: 某一個是X
	// 第2步: 某一個是X 某一個是O
	const currentSquares = history[currentMove];

	/* 下棋的過程: 

	// 初始狀態
	history = [
			[null, null, null, null, null, null, null, null, null],  // step 0
	];
	currentMove = 0;
	xIsNext = true;
	currentSquares = [null, null, null, null, null, null, null, null, null];


	// 第一步
	history = [
			[null, null, null, null, null, null, null, null, null],  // step 0
			['X', null, null, null, null, null, null, null, null],   // step 1
	];
	currentMove = 1;
	xIsNext = false;
	currentSquares = ['X', null, null, null, null, null, null, null, null];


	// 第二步
	history = [
			[null, null, null, null, null, null, null, null, null],  // step 0
			['X', null, null, null, null, null, null, null, null],   // step 1
		['X', null, null, null, 'O', null, null, null, null]     // step 2
	];
	currentMove = 2;
	xIsNext = true;
	currentSquares = ['X', null, null, null, 'O', null, null, null, null];
	*/


	// 下棋 + 更新歷史
	function handlePlay(nextSquares: any) {

		// 1. 產生新的棋盤

		/*
		slice(start, end) → 取陣列的一部分
		這邊用來保證 如果跳回過去某一步再下棋，之後的歷史會被截掉

		history = [
			[null, null, null, null, null, null, null, null, null],   // step 0
			['X', null, null, null, null, null, null, null, null],    // step 1
			['X', null, null, null, 'O', null, null, null, null]      // step 2
		];

		假設currentMove = 1;
		history.slice(0, currentMove + 1) → history.slice(0, 2)
		取第 0、1 步：

		[
			[null, null, null, null, null, null, null, null, null], 
			['X', null, null, null, null, null, null, null, null]
		]
		*/

		// nextSquares: 新的棋盤狀態
		// 加入新的棋盤紀錄
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

		// 2. 更新下棋紀錄
		setHistory(nextHistory);

		// 3. 設定目前走到第幾步
		setCurrentMove(nextHistory.length - 1);
	}

	// 把目前步數改成指定步數 不改歷史 (倒退一步or跳到某一步)
	function jumpTo(nextMove: SetStateAction<number>) {
		setCurrentMove(nextMove);
	}

	// 產生每一步的按鈕
	// 每個按鈕都可以回到那一步
	const moves = history.map((_squares: string[], move: number) => {
		// _squares是棋盤
		// move是步數
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
		<div className="flex gap-8">
			<div>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div>
				<ol className="space-y-2">{moves}</ol>
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