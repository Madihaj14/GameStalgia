import React from 'react';
import type { GameCardProps } from '../types';

export function GameCard({ title, description, icon, onClick }: GameCardProps) {
  return (
    <button 
      onClick={onClick}
      className="game-card w-full text-left"
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl mb-2 game-title">{title}</h3>
      <p className="text-sm game-description">{description}</p>
    </button>
  );
}