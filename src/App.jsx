import React, { useState } from 'react';
import Home from './pages/Home';
import LoadingScreen from './components/common/LoadingScreen';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="app-container">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
        <Home />
      </div>
    </ThemeProvider>
  );
}
