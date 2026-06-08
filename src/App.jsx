import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModuleDashboard from './components/ModuleDashboard';
import LevelSelector from './components/LevelSelector';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'dashboard', 'levels', 'playing', 'result'
  const [currentModule, setCurrentModule] = useState(null); // 'html', 'css', 'js', 'react'
  const [currentLevel, setCurrentLevel] = useState(1); // 1, 2, 3
  const [unlockedModules, setUnlockedModules] = useState(['html']); // Módulos desbloqueados
  
  // Niveles desbloqueados por módulo
  const [unlockedLevels, setUnlockedLevels] = useState({
    html: [1],
    css: [1],
    js: [1],
    react: [1]
  });
  
  const [score, setScore] = useState(0);

  // Iniciar el juego: ir al Dashboard de módulos
  const handleStartGame = () => {
    setGameState('dashboard');
  };

  // Seleccionar un módulo: abre el selector de sub-niveles
  const handleSelectModule = (moduleId) => {
    setCurrentModule(moduleId);
    setGameState('levels');
  };

  // Seleccionar un nivel específico: inicia el juego
  const handleSelectLevel = (levelId) => {
    setCurrentLevel(levelId);
    setGameState('playing');
  };

  // Simular la finalización de un nivel e incrementar desbloqueos
  const handleEndGame = () => {
    const activeModuleLevels = unlockedLevels[currentModule];
    
    if (currentLevel === 1 && !activeModuleLevels.includes(2)) {
      // Desbloquear Nivel 2
      setUnlockedLevels({
        ...unlockedLevels,
        [currentModule]: [...activeModuleLevels, 2]
      });
    } else if (currentLevel === 2 && !activeModuleLevels.includes(3)) {
      // Desbloquear Nivel 3
      setUnlockedLevels({
        ...unlockedLevels,
        [currentModule]: [...activeModuleLevels, 3]
      });
    } else if (currentLevel === 3) {
      // Al completar el Nivel 3, desbloquear el siguiente módulo principal
      if (currentModule === 'html' && !unlockedModules.includes('css')) {
        setUnlockedModules([...unlockedModules, 'css']);
      } else if (currentModule === 'css' && !unlockedModules.includes('js')) {
        setUnlockedModules([...unlockedModules, 'js']);
      } else if (currentModule === 'js' && !unlockedModules.includes('react')) {
        setUnlockedModules([...unlockedModules, 'react']);
      }
    }
    
    setScore(currentLevel * 300 + 150); // Puntuación de ejemplo proporcional al nivel
    setGameState('result');
  };

  // Regresar al selector de niveles desde la pantalla de resultados
  const handleRestart = () => {
    setGameState('levels');
  };

  // Regresar al dashboard desde el selector de niveles
  const handleBackToDashboard = () => {
    setGameState('dashboard');
  };

  // Regresar a la pantalla de bienvenida desde el dashboard
  const handleBackToWelcome = () => {
    setGameState('start');
  };

  return (
    <div className="app-container">
      {gameState === 'start' && (
        <StartScreen onStart={handleStartGame} />
      )}

      {gameState === 'dashboard' && (
        <ModuleDashboard 
          unlockedModules={unlockedModules} 
          onSelectModule={handleSelectModule}
          onBack={handleBackToWelcome}
        />
      )}

      {gameState === 'levels' && (
        <LevelSelector
          moduleId={currentModule}
          unlockedLevels={unlockedLevels[currentModule]}
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToDashboard}
        />
      )}

      {gameState === 'playing' && (
        <GameScreen 
          moduleId={currentModule} 
          levelId={currentLevel}
          onEnd={handleEndGame} 
        />
      )}

      {gameState === 'result' && (
        <ResultScreen 
          score={score} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;
