import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [score, setScore] = useState(0);

  // Función básica para pasar de la pantalla de inicio a la de juego
  const handleStartGame = () => {
    setScore(0);
    setGameState('playing');
  };

  // Función básica para terminar el juego (mockup)
  const handleEndGame = () => {
    setGameState('result');
  };

  // Función básica para volver al inicio
  const handleRestart = () => {
    setGameState('start');
  };

  return (
    <div className="app-container">
      {gameState === 'start' && (
        <StartScreen onStart={handleStartGame} />
      )}

      {gameState === 'playing' && (
        <GameScreen onEnd={handleEndGame} />
      )}

      {gameState === 'result' && (
        <ResultScreen score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
