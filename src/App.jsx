import React, { useState } from 'react';
import Home from './pages/Home';
import LoadingScreen from './components/common/LoadingScreen';
import './styles/global.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app-container">
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <Home />
    </div>
  );
}
