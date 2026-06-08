import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function GameScreen({ moduleId, levelId, questionData, questionIndex, totalQuestions, onNextQuestion }) {
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  // Reiniciar estado cada vez que la pregunta cambia
  useEffect(() => {
    setTypedAnswer('');
    setShowExplanation(false);
  }, [questionData]);

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
    <div className="glass-panel animated-fade" style={{ maxWidth: '600px', textAlign: 'left' }}>
      
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
        <span>Pregunta: <strong style={{ color: 'var(--color-accent)' }}>{questionIndex + 1} de {totalQuestions}</strong></span>
      </div>

      {/* Barra de progreso */}
      <ProgressBar value={questionIndex + (showExplanation ? 1 : 0)} max={totalQuestions} />

      {/* Temporizador estático */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Tiempo disponible</span>
          <span style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>15 seg</span>
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
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color-success)'
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
              onClick={() => setShowExplanation(true)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                textAlign: 'left',
                padding: '0.9rem 1.2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
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
              onClick={() => setShowExplanation(true)}
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
            fontSize: '0.9rem',
            color: 'var(--color-success)',
            marginBottom: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            ✨ Explicación de la lección:
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
            onClick={onNextQuestion}
            style={{ width: '100%', fontSize: '0.95rem' }}
          >
            {isLastQuestion ? 'Terminar Lección 🏁' : 'Siguiente Pregunta ➡️'}
          </button>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
