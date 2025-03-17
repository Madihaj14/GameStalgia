export type GameType = 'rps' | 'tictactoe' | 'snake';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameScore {
  game: GameType;
  score: number;
  date: Date;
}

export interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface Player {
  name: string;
  country: string;
}

export interface LeaderboardEntry {
  name: string;
  country: string;
  score: number;
  difficulty: Difficulty;
}