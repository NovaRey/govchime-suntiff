import React from 'react';

interface GrokLoadingBarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'orange';
}

export const GrokLoadingBar: React.FC<GrokLoadingBarProps> = ({ 
  className = '', 
  size = 'md',
  color = 'blue'
}) => {
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const colorStyles = {
    blue: {
      text: '#3b82f6', // blue-500
      glow: 'rgba(59, 130, 246, 0.35)'
    },
    orange: {
      text: '#f97316', // orange-500
      glow: 'rgba(249, 115, 22, 0.35)'
    }
  };

  const currentColor = colorStyles[color];

  return (
    <div className={`inline-block font-mono ${sizeStyles[size]} ${className}`}>
      <style>{`
        @keyframes grokBar {
          0% { content: '[ ░░░░░░░░░ ]'; }
          12.5% { content: '[ ▓▒░░░░░░░ ]'; }
          25% { content: '[ █▓▒░░░░░░ ]'; }
          37.5% { content: '[ █▓▒░░░░░░ ]'; }
          50% { content: '[ █▓▒░░▒▓░░ ]'; }
          62.5% { content: '[ █▓▒░░▒▓█░ ]'; }
          75% { content: '[ █▓▒░░▒▓█ ]'; }
          87.5% { content: '[ █▓▒░░▒▓█ ]'; }
          100% { content: '[ █▓▒░░▒▓█ ]'; }
        }
        .grok-loading-bar::before {
          content: '[ ░░░░░░░░░ ]';
          animation: grokBar 2s linear infinite;
          color: ${currentColor.text};
          text-shadow: 0 0 6px ${currentColor.glow};
        }
      `}</style>
      <span className="grok-loading-bar"></span>
    </div>
  );
};

export default GrokLoadingBar;
