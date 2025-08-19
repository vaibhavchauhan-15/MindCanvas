import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';
type AccentTheme = 'default' | 'violet-blue' | 'teal-emerald';

interface ThemeContextType {
  mode: ThemeMode;
  accentTheme: AccentTheme;
  toggleMode: () => void;
  setAccentTheme: (theme: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Load theme preferences from localStorage or use default
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'dark' || savedMode === 'light') {
      return savedMode;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [accentTheme, setAccentTheme] = useState<AccentTheme>(() => {
    const savedAccent = localStorage.getItem('accent-theme');
    if (savedAccent === 'default' || savedAccent === 'violet-blue' || savedAccent === 'teal-emerald') {
      return savedAccent;
    }
    return 'default';
  });

  // Apply theme to document when it changes
  useEffect(() => {
    // Update dark mode
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Apply accent theme
  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove('theme-violet-blue', 'theme-teal-emerald');
    
    // Apply the selected accent theme
    if (accentTheme !== 'default') {
      document.documentElement.classList.add(`theme-${accentTheme}`);
    }
    
    // Save to localStorage
    localStorage.setItem('accent-theme', accentTheme);
  }, [accentTheme]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accentTheme,
        toggleMode,
        setAccentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
