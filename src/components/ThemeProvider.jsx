import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}