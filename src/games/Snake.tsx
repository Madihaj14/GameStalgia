import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { triggerWinConfetti } from '../utils/confetti';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;
const POINTS_PER_FOOD = 10;
const CONFETTI_THRESHOLD = 50; // Trigger confetti every 50 points

export function Snake({ onBack }: { onBack: () => void }) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const [foodGlow, setFoodGlow] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
    setFoodGlow(true);
    setTimeout(() => setFoodGlow(false), 500);
  }, [snake]);

  const checkCollision = (position: Position): boolean => {
    // Check wall collision
    if (
      position.x < 0 ||
      position.x >= GRID_SIZE ||
      position.y < 0 ||
      position.y >= GRID_SIZE
    ) {
      return true;
    }
    
    // Check self collision (excluding the tail which will move)
    return snake.slice(0, -1).some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  };

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision
      if (checkCollision(head)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + POINTS_PER_FOOD;
          // Trigger confetti at threshold intervals
          if (newScore % CONFETTI_THRESHOLD === 0) {
            triggerWinConfetti();
          }
          if (newScore > highScore) {
            setHighScore(newScore);
            // Also trigger confetti for new high score
            triggerWinConfetti();
          }
          return newScore;
        });
        setSpeed(prev => Math.max(prev - SPEED_INCREASE, 50));
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood, highScore, gameStarted]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, speed]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    setGameStarted(true);
    generateFood();
  };

  const resetGame = () => {
    setGameStarted(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    generateFood();
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            <h3 className="text-arcade-cyan mb-2">Current Score</h3>
            <p className="text-2xl score-bounce">{score}</p>
          </div>
          <div>
            <h3 className="text-arcade-purple mb-2">High Score</h3>
            <p className="text-2xl">{highScore}</p>
          </div>
        </div>
      </div>

      <div className="relative w-[400px] h-[400px] mx-auto bg-arcade-bg/50 rounded-lg border-2 border-arcade-purple/30">
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl mb-6 text-arcade-yellow">Ready to Play?</h2>
              <p className="text-arcade-text/80 mb-8 px-4">
                Use arrow keys to control the snake.<br />
                Collect food to grow and score points.<br />
                Don't hit the walls or yourself!
              </p>
              <button
                onClick={startGame}
                className="arcade-btn flex items-center gap-2 mx-auto"
              >
                <Play size={16} />
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Food */}
        <div
          className="absolute w-[20px] h-[20px] rounded-full bg-arcade-yellow transition-all duration-300"
          style={{
            left: `${food.x * CELL_SIZE}px`,
            top: `${food.y * CELL_SIZE}px`,
            boxShadow: foodGlow ? '0 0 10px #FFD700, 0 0 20px #FF8C42' : 'none'
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute w-[20px] h-[20px] rounded-sm ${
              index === 0 ? 'bg-arcade-cyan' : 'bg-arcade-purple'
            }`}
            style={{
              left: `${segment.x * CELL_SIZE}px`,
              top: `${segment.y * CELL_SIZE}px`,
              transform: `scale(${index === 0 ? 1 : 0.9})`,
              transition: `all ${speed}ms linear`
            }}
          />
        ))}

        {/* Game Over / Pause Overlay */}
        {(gameOver || isPaused) && gameStarted && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl mb-4 text-arcade-yellow">
                {gameOver ? 'Game Over!' : 'Paused'}
              </h2>
              <button
                onClick={gameOver ? resetGame : () => setIsPaused(false)}
                className="arcade-btn"
              >
                {gameOver ? 'Play Again' : 'Resume'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-arcade-text/60">
        <p>Use arrow keys to move</p>
        <p>Press SPACE to pause</p>
      </div>
    </div>
  );
}