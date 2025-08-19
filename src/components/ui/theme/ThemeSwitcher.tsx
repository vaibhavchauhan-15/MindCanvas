import React from 'react';
import { useTheme } from './ThemeProvider';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const { mode, accentTheme, toggleMode, setAccentTheme } = useTheme();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Mode Switcher */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-lg bg-surface border border-border shadow-sm hover:bg-card transition-colors duration-200 focus-ring"
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      >
        {mode === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        )}
      </button>

      {/* Accent Theme Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">Theme:</span>
        <div className="flex space-x-2">
          {/* Default theme */}
          <button
            onClick={() => setAccentTheme('default')}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              accentTheme === 'default' ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
            aria-label="Default theme"
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </button>

          {/* Violet-Blue theme */}
          <button
            onClick={() => setAccentTheme('violet-blue')}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              accentTheme === 'violet-blue' ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
            aria-label="Violet-Blue theme"
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600" />
          </button>

          {/* Teal-Emerald theme */}
          <button
            onClick={() => setAccentTheme('teal-emerald')}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              accentTheme === 'teal-emerald' ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
            aria-label="Teal-Emerald theme"
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
