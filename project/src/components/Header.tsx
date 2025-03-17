import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import type { Player } from '../types';

interface HeaderProps {
  player: Player | null;
  showRegistration: boolean;
}

export function Header({ player, showRegistration }: HeaderProps) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="text-center mb-16">
      <h1 className="text-4xl md:text-6xl neon-text mb-4">
        GameStalgia
      </h1>
      <p className="text-arcade-cyan/80 text-sm md:text-base mb-4">
        {showRegistration ? 'Register to start playing!' : 'Choose your game and start playing!'}
      </p>
      
      {player && (
        <div className="text-sm text-arcade-text/60 mb-4">
          Playing as: <span className="text-arcade-cyan">{player.name}</span>
        </div>
      )}

      <button
        onClick={() => setShowAbout(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                 bg-arcade-bg/95 border border-arcade-purple/20
                 text-arcade-text/60 hover:text-arcade-cyan
                 transition-all duration-300 hover:bg-arcade-bg/50
                 hover:border-arcade-cyan/30 backdrop-blur-sm"
      >
        <Info size={16} />
        <span className="text-sm">About GameStalgia</span>
      </button>

      {/* About Modal */}
      {showAbout && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAbout(false);
          }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md animate-fade-in" />
          
          {/* Modal Content */}
          <div className="relative z-60 max-w-lg w-full animate-modal-in">
            <div className="bg-arcade-bg/95 rounded-lg border-2 border-arcade-purple/30 
                        shadow-2xl shadow-arcade-purple/20 overflow-hidden backdrop-blur-lg">
              {/* Modal Header */}
              <div className="bg-black/50 border-b border-arcade-purple/30 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl text-arcade-yellow">A Word from the Creator</h2>
                  <button
                    onClick={() => setShowAbout(false)}
                    className="text-arcade-text/60 hover:text-arcade-cyan
                             transition-colors duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 bg-arcade-bg/40">
                <div className="prose prose-invert max-w-none">
                  <p className="text-arcade-text/90 leading-relaxed mb-8 text-lg">
                    Hey there! Welcome to GameStalgia. Like every aspiring developer, I began my coding journey with small projects—Tic-Tac-Toe, Snake, and Rock-Paper-Scissors. While building my first website, I wanted to create something that brought together everything I had learned so far. 
                    That’s when the idea of an arcade struck me—a place where these simple yet nostalgic games live on. For every 90s kid who spent hours on their first computer, this is a trip down memory lane, wrapped in code. 🚀
                  </p>
                  
                  <div className="space-y-6 text-sm text-arcade-text/80">
                    <p className="flex items-center gap-3 bg-arcade-bg/20 p-4 rounded-lg border border-arcade-cyan/20">
                      <span className="w-3 h-3 rounded-full bg-arcade-cyan shrink-0" />
                      Classic games reimagined for the modern web
                    </p>
                    <p className="flex items-center gap-3 bg-arcade-bg/20 p-4 rounded-lg border border-arcade-purple/20">
                      <span className="w-3 h-3 rounded-full bg-arcade-purple shrink-0" />
                      Built with React and modern web technologies
                    </p>
                    <p className="flex items-center gap-3 bg-arcade-bg/20 p-4 rounded-lg border border-arcade-yellow/20">
                      <span className="w-3 h-3 rounded-full bg-arcade-yellow shrink-0" />
                      Featuring smooth animations and retro aesthetics
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowAbout(false)}
                    className="arcade-btn"
                  >
                    Back to Games
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}