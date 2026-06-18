import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { playSound, stopBackgroundAudio } from '../utils/audio';

function GameScreen({ moduleId, levelId, questionData, questionIndex, totalQuestions, onNextQuestion, onAnswerSubmit, onCancelGame }) {
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Reiniciar estado cada vez que la pregunta cambia
  useEffect(() => {
    setTypedAnswer('');
    setShowExplanation(false);
    setHasAnswered(false);
    setIsAnswerCorrect(null);
    setSelectedIdx(null);
    setTimeLeft(questionData?.type === 'choice' ? 15 : 30);
    
    // Play module sound only on the first question
    if (questionIndex === 0 && questionData) {
      playSound(`modulo${moduleId}`);
    }
  }, [questionData, questionIndex, moduleId]);

  // Temporizador dinámico
  useEffect(() => {
    if (!questionData || hasAnswered || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [questionData, hasAnswered, timeLeft]);

  const handleTimeUp = () => {
    setHasAnswered(true);
    setIsAnswerCorrect(false);
    setShowExplanation(true);
    if (onAnswerSubmit) onAnswerSubmit(false, 0);
  };

  const handleOptionClick = (idx) => {
    if (hasAnswered) return;
    setSelectedIdx(idx);
    const correct = idx === questionData.answer;
    setHasAnswered(true);
    setIsAnswerCorrect(correct);
    setShowExplanation(true);
    playSound(correct ? 'acierto' : 'respuestaIncorrecta');
    if (onAnswerSubmit) onAnswerSubmit(correct, timeLeft);
  };

  const handleFillSubmit = () => {
    if (hasAnswered) return;
    const correct = typedAnswer.trim().toLowerCase() === String(questionData.answer).toLowerCase();
    setHasAnswered(true);
    setIsAnswerCorrect(correct);
    setShowExplanation(true);
    playSound(correct ? 'acierto' : 'respuestaIncorrecta');
    if (onAnswerSubmit) onAnswerSubmit(correct, timeLeft);
  };

  const moduleNames = {
    html: 'HTML5 Estructural',
    css: 'CSS Avanzado & Layouts',
    js: 'JavaScript & DOM Moderno',
    react: 'React Framework'
  };

  if (!questionData) {
    return (
      <div className="glass-panel">
        <p>No hay preguntas disponibles para esta sección.</p>
      </div>
    );
  }

  const isChoiceQuestion = questionData.type === 'choice';
  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(/images/fondo-${moduleId === 'css' ? 'ccs' : moduleId}.jfif)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        opacity: 0.5
      }} />

      <div className="glass-panel animated-fade" style={{ 
        maxWidth: '600px', 
        textAlign: 'left',
        background: 'rgba(15, 23, 42, 0.5)', 
        backdropFilter: 'blur(6px)', 
        WebkitBackdropFilter: 'blur(6px)'
      }}>
      
      {/* Cabecera de Juego */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)'
      }}>
        <span>Módulo: <strong>{moduleNames[moduleId]}</strong></span>
        <span style={{
          background: 'rgba(99, 102, 241, 0.15)',
          color: 'var(--color-primary)',
          padding: '0.2rem 0.6rem',
          borderRadius: '20px',
          fontWeight: '600',
          fontSize: '0.75rem',
          textTransform: 'uppercase'
        }}>
          {questionData.category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>Pregunta: <strong style={{ color: 'var(--color-accent)' }}>{questionIndex + 1} de {totalQuestions}</strong></span>
          <button 
            onClick={() => { playSound('click'); stopBackgroundAudio(); onCancelGame(); }} 
            title="Cancelar partida y salir"
            style={{ 
              background: 'rgba(239, 68, 68, 0.15)', 
              color: 'var(--color-error)', 
              border: 'none', 
              borderRadius: '8px', 
              padding: '0.3rem 0.6rem', 
              cursor: 'pointer', 
              fontSize: '0.75rem', 
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.25)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.15)'}
          >
            ✖ Salir
          </button>
        </div>
      </div>

      {/* Barra de progreso */}
      <ProgressBar value={questionIndex + (showExplanation ? 1 : 0)} max={totalQuestions} />

      {/* Temporizador dinámico */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Tiempo disponible</span>
          <span style={{ fontWeight: 'bold', color: timeLeft <= 5 ? 'var(--color-error)' : 'var(--color-success)' }}>{timeLeft} seg</span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderRadius: '3px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            width: `${(timeLeft / (isChoiceQuestion ? 15 : 30)) * 100}%`,
            height: '100%',
            backgroundColor: timeLeft <= 5 ? 'var(--color-error)' : 'var(--color-success)',
            transition: 'width 1s linear, background-color 0.3s ease'
          }} />
        </div>
      </div>

      {/* Enunciado */}
      <h2 style={{
        fontSize: '1.2rem',
        lineHeight: '1.5',
        marginBottom: '1.5rem',
        color: 'var(--color-text-main)',
        fontWeight: '600'
      }}>
        {questionData.question}
      </h2>

      {/* Pregunta condicional */}
      {isChoiceQuestion ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {questionData.options.map((option, idx) => (
            <button
              key={idx}
              className="option-btn"
              onClick={() => handleOptionClick(idx)}
              disabled={hasAnswered}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                textAlign: 'left',
                padding: '0.9rem 1.2rem',
                border: hasAnswered && idx === questionData.answer ? '1px solid var(--color-success)' : 
                        hasAnswered && idx === selectedIdx && !isAnswerCorrect ? '1px solid var(--color-error)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                background: hasAnswered && idx === questionData.answer ? 'rgba(16, 185, 129, 0.1)' :
                            hasAnswered && idx === selectedIdx && !isAnswerCorrect ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                width: '100%'
              }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--color-text-muted)',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span style={{ flex: 1 }}>{option}</span>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ marginBottom: '1.5rem' }}>
          <pre style={{
            background: '#0a0914',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '1.2rem',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            color: '#c0caf5',
            marginBottom: '1rem',
            lineHeight: '1.5',
            overflowX: 'auto'
          }}>
            <code>{questionData.code}</code>
          </pre>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Escribe tu código de respuesta..."
              style={{
                flex: 1,
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button
              className="btn btn-primary"
              onClick={handleFillSubmit}
              disabled={hasAnswered}
              style={{ padding: '0 1.5rem', fontSize: '0.9rem' }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Explicación */}
      {showExplanation && (
        <div className="animated-fade" style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '16px',
          padding: '1.2rem',
          marginTop: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '0.95rem',
            color: isAnswerCorrect ? 'var(--color-success)' : 'var(--color-error)',
            marginBottom: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            {isAnswerCorrect ? '✨ ¡Correcto!' : '❌ Incorrecto / Tiempo agotado'}
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            marginBottom: '1.2rem',
            lineHeight: '1.5'
          }}>
            {questionData.explanation}
          </p>

          <button 
            className="btn btn-primary" 
            onClick={() => { playSound('click'); onNextQuestion(); }}
            style={{ width: '100%', fontSize: '0.95rem' }}
          >
            {isLastQuestion ? 'Terminar Lección 🏁' : 'Siguiente Pregunta ➡️'}
          </button>
        </div>
      )}
      </div>
    </>
  );
}

export default GameScreen;
