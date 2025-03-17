import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Circle } from 'lucide-react';
import { triggerWinConfetti } from '../utils/confetti';

type Player = 'X' | 'O';
type Cell = Player | null;
type GameResult = Player | 'draw' | null;

export function TicTacToe({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<GameResult>(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (squares: Cell[]): [GameResult, number[]] => {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [a, b, c]];
      }
    }
    if (squares.every(square => square !== null)) return ['draw', []];
    return [null, []];
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const [gameResult, winningLine] = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      setWinningCells(winningLine);
      if (gameResult !== 'draw') {
        if (gameResult === 'X') {
          triggerWinConfetti();
          setStreak(prev => {
            const newStreak = prev + 1;
            if (newStreak > bestStreak) {
              setBestStreak(newStreak);
            }
            return newStreak;
          });
        } else {
          setStreak(0);
        }
        setScore(prev => ({
          ...prev,
          [gameResult]: prev[gameResult] + 1
        }));
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCells([]);
  };

  // AI move
  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      const timeout = setTimeout(() => {
        const emptySquares = board
          .map((cell, index) => cell === null ? index : null)
          .filter((index): index is number => index !== null);
        
        if (emptySquares.length > 0) {
          const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          handleClick(randomIndex);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, winner]);

  return (
    <div className="max-w-md mx-auto">
      <button 
        onClick={onBack}
        className="arcade-btn mb-8 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Menu
      </button>

      <div className="score-card mb-8">
        <h2 className="text-xl text-arcade-yellow mb-4">Score Card</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-arcade-cyan mb-2">Player (X)</h3>
            <p className="text-2xl">{score.X}</p>
            <p className="text-sm mt-2 text-arcade-text/60">
              Current Streak: {streak}
            </p>
            <p className="text-sm mt-1 text-arcade-text/60">
              Best Streak: {bestStreak}
            </p>
          </div>
          <div>
            <h3 className="text-arcade-purple mb-2">Computer (O)</h3>
            <p className="text-2xl">{score.O}</p>
          </div>
        </div>
      </div>

      {winner && (
        <div className={`text-2xl text-center mb-4 ${
          winner === 'X' ? 'text-arcade-cyan victory-text' :
          winner === 'O' ? 'text-arcade-purple' :
          'text-arcade-yellow'
        }`}>
          {winner === 'draw' ? 'DRAW!' : `${winner} WINS!`}
        </div>
      )}

      {winner && (
        <button 
          onClick={resetGame}
          className="arcade-btn mx-auto block mb-8"
        >
          Play Again
        </button>
      )}

      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner || currentPlayer === 'O'}
            className={`
              h-24 bg-arcade-bg/50 rounded-lg border-2
              transition-all duration-300
              ${cell ? 'cursor-not-allowed' : 'hover:bg-arcade-bg'}
              ${
                cell === 'X' ? 'border-arcade-cyan' :
                cell === 'O' ? 'border-arcade-purple' :
                'border-arcade-text/20'
              }
              ${winningCells.includes(index) ? 'winning-cell' : ''}
            `}
          >
            {cell === 'X' && <X size={32} className="mx-auto text-arcade-cyan" />}
            {cell === 'O' && <Circle size={32} className="mx-auto text-arcade-purple" />}
          </button>
        ))}
      </div>
    </div>
  );
}