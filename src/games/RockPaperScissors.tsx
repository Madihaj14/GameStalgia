import React, { useState } from 'react';
import { ArrowLeft, Hand, Scissors, Square } from 'lucide-react';
import { triggerWinConfetti } from '../utils/confetti';

type Move = 'rock' | 'paper' | 'scissors';
type GameResult = 'win' | 'lose' | 'draw' | null;

export function RockPaperScissors({ onBack }: { onBack: () => void }) {
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [computerMove, setComputerMove] = useState<Move | null>(null);
  const [result, setResult] = useState<GameResult>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const moves: Move[] = ['rock', 'paper', 'scissors'];

  const getIcon = (move: Move) => {
    switch (move) {
      case 'rock':
        return <Square size={32} className="transform rotate-45" />;
      case 'paper':
        return <Hand size={32} />;
      case 'scissors':
        return <Scissors size={32} />;
    }
  };

  const determineWinner = (player: Move, computer: Move): GameResult => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handleMove = (move: Move) => {
    const computerChoice = moves[Math.floor(Math.random() * moves.length)];
    setPlayerMove(move);
    setComputerMove(computerChoice);
    const gameResult = determineWinner(move, computerChoice);
    setResult(gameResult);
    
    if (gameResult === 'win') {
      triggerWinConfetti();
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
    } else if (gameResult === 'lose') {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      setStreak(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
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
            <h3 className="text-arcade-cyan mb-2">Player</h3>
            <p className="text-2xl">{score.player}</p>
            <p className="text-sm mt-2 text-arcade-text/60">
              Current Streak: {streak}
            </p>
            <p className="text-sm mt-1 text-arcade-text/60">
              Best Streak: {bestStreak}
            </p>
          </div>
          <div>
            <h3 className="text-arcade-purple mb-2">Computer</h3>
            <p className="text-2xl">{score.computer}</p>
          </div>
        </div>
      </div>

      {result && (
        <div className={`text-2xl text-center mb-8 ${
          result === 'win' ? 'text-arcade-cyan victory-text' :
          result === 'lose' ? 'text-arcade-purple' :
          'text-arcade-yellow'
        }`}>
          {result.toUpperCase()}!
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
        {moves.map(move => (
          <button
            key={move}
            onClick={() => handleMove(move)}
            className="rps-choice flex flex-col items-center gap-2"
          >
            <div className="game-icon">
              {getIcon(move)}
            </div>
            <span className="capitalize">{move}</span>
          </button>
        ))}
      </div>

      {playerMove && computerMove && (
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-arcade-cyan mb-2">Your Move</div>
            <div className="p-4 bg-arcade-bg rounded-lg border-2 border-arcade-cyan/30">
              {getIcon(playerMove)}
            </div>
          </div>
          <div className="text-4xl">VS</div>
          <div className="text-center">
            <div className="text-arcade-purple mb-2">Computer's Move</div>
            <div className="p-4 bg-arcade-bg rounded-lg border-2 border-arcade-purple/30">
              {getIcon(computerMove)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}