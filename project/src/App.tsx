import React, { useState } from 'react';
import { Github, Linkedin, Scissors, Grid3X3, Workflow as Worm } from 'lucide-react';
import { GameCard } from './components/GameCard';
import { RockPaperScissors } from './games/RockPaperScissors';
import { TicTacToe } from './games/TicTacToe';
import { Snake as SnakeGame } from './games/Snake';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Header } from './components/Header';
import type { GameType, Player } from './types';

function App() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [showRegistration, setShowRegistration] = useState(true);

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const country = formData.get('country') as string;
    
    if (name && country) {
      setPlayer({ name, country });
      setShowRegistration(false);
    }
  };

  const renderGame = () => {
    if (!player) return null;

    switch (selectedGame) {
      case 'rps':
        return <RockPaperScissors onBack={() => setSelectedGame(null)} player={player} />;
      case 'tictactoe':
        return <TicTacToe onBack={() => setSelectedGame(null)} player={player} />;
      case 'snake':
        return <SnakeGame onBack={() => setSelectedGame(null)} player={player} />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameCard
                title="Rock Paper Scissors"
                description="Challenge the computer in this classic hand game!"
                icon={<Scissors size={32} className="game-icon" />}
                onClick={() => setSelectedGame('rps')}
              />
              <GameCard
                title="Snake"
                description="Grow your snake and avoid walls in this arcade classic!"
                icon={<Worm size={32} className="game-icon" />}
                onClick={() => setSelectedGame('snake')}
              />
              <GameCard
                title="Tic Tac Toe"
                description="Three in a row to win. Can you beat the AI?"
                icon={<Grid3X3 size={32} className="game-icon" />}
                onClick={() => setSelectedGame('tictactoe')}
              />
            </div>
          </>
        );
    }
  };

  const renderContent = () => {
    if (showRegistration) {
      return (
        <div className="max-w-md mx-auto relative z-20">
          <form onSubmit={handleRegistration} className="space-y-6 bg-arcade-bg/95 p-8 rounded-lg border-2 border-arcade-purple/30 backdrop-blur-md">
            <div>
              <label htmlFor="name" className="block text-arcade-yellow mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-lg bg-arcade-bg/50 border-2 border-arcade-purple/30 
                         text-arcade-text focus:border-arcade-cyan focus:outline-none
                         transition-colors duration-300"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-arcade-yellow mb-2">
                Your Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                className="w-full px-4 py-2 rounded-lg bg-arcade-bg/50 border-2 border-arcade-purple/30 
                         text-arcade-text focus:border-arcade-cyan focus:outline-none
                         transition-colors duration-300"
                placeholder="Enter your country"
              />
            </div>
            <button type="submit" className="arcade-btn w-full">
              Start Gaming
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto relative z-20">
        {renderGame()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-arcade-bg to-black p-8 overflow-hidden">
      <BackgroundEffects />
      
      {/* Header with About Section */}
      <div className="relative z-30">
        <Header player={player} showRegistration={showRegistration} />
      </div>
      
      {/* Main Content */}
      {renderContent()}

      {/* Footer */}
      <footer className="relative z-20 mt-16 text-center">
        <div className="flex justify-center items-center gap-6 mb-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-arcade-text/60 hover:text-arcade-cyan transition-colors duration-300"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-arcade-text/60 hover:text-arcade-cyan transition-colors duration-300"
          >
            <Linkedin size={24} />
          </a>
        </div>
        <div className="text-arcade-text/40 text-sm">
          <p>© 2024 GameStalgia. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ by Madiha</p>
        </div>
      </footer>
    </div>
  );
}

export default App;