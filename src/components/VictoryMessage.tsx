import React from 'react';

interface VictoryMessageProps {
  message: string;
  show: boolean;
}

export function VictoryMessage({ message, show }: VictoryMessageProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="animate-bounce-fade-in bg-arcade-bg/90 px-8 py-4 rounded-lg border-2 border-arcade-cyan
                    shadow-lg backdrop-blur-sm">
        <p className="text-xl md:text-2xl font-bold text-center victory-text">
          {message}
        </p>
      </div>
    </div>
  );
}