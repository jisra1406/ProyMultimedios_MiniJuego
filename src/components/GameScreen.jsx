import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function GameScreen({ moduleId, levelId, onEnd }) {
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  // Reiniciar estado al cambiar de nivel/módulo
  useEffect(() => {
    setTypedAnswer('');
    setShowExplanation(false);
  }, [moduleId, levelId]);

  const moduleNames = {
    html: 'HTML5 Estructural',
    css: 'CSS Avanzado & Layouts',
    js: 'JavaScript & DOM Moderno',
    react: 'React Framework'
  };

  // Generar datos maquetas académicas según la combinación de módulo y sub-nivel
  const getMockQuestion = () => {
    if (moduleId === 'html') {
      if (levelId === 1) {
        return {
          category: "HTML Básicos",
          type: "choice",
          question: "¿Cuál es la etiqueta principal que actúa como raíz de un documento HTML?",
          options: ["<head>", "<body>", "<html>", "<doctype>"],
          answerIdx: 2,
          explanation: "La etiqueta <html> es el elemento raíz que contiene todos los demás elementos del documento, excepto la declaración <!DOCTYPE>."
        };
      } else if (levelId === 2) {
        return {
          category: "Semántica HTML5",
          type: "choice",
          question: "¿Qué elemento semántico representa contenido independiente, autónomo y distribuible (como un post de blog)?",
          options: ["<section>", "<div>", "<aside>", "<article>"],
          answerIdx: 3,
          explanation: "La etiqueta <article> está diseñada para contener información autocontenida que podría extraerse y reutilizarse de forma independiente."
        };
      } else {
        return {
          category: "Multimedia y Formularios",
          type: "fill",
          question: "Completa el atributo faltante en el input para que quede correctamente asociado al label por accesibilidad:",
          code: "<label for=\"usr-email\">Email:</label>\n<input type=\"email\" id=\"___\">",
          answer: "usr-email",
          explanation: "El atributo 'id' del elemento <input> debe coincidir exactamente con el atributo 'for' del <label> para vincularlos."
        };
      }
    } else if (moduleId === 'css') {
      if (levelId === 1) {
        return {
          category: "Fundamentos CSS",
          type: "choice",
          question: "¿Cuál de los siguientes selectores tiene mayor especificidad en la cascada de CSS?",
          options: [".clase-ejemplo", "#id-ejemplo", "div", "div.clase-ejemplo"],
          answerIdx: 1,
          explanation: "Los selectores de ID (#id-ejemplo) tienen un peso de especificidad significativamente mayor que los de clase o etiqueta."
        };
      } else if (levelId === 2) {
        return {
          category: "Layouts Flex/Grid",
          type: "choice",
          question: "En Flexbox, ¿qué propiedad alinea los elementos hijos a lo largo del eje principal (horizontal por defecto)?",
          options: ["align-items", "justify-content", "flex-direction", "align-content"],
          answerIdx: 1,
          explanation: "La propiedad 'justify-content' se utiliza para alinear los flex-items a lo largo del eje principal (main axis)."
        };
      } else {
        return {
          category: "Efectos y Keyframes",
          type: "fill",
          question: "Completa la regla CSS para definir una animación que cambie la opacidad:",
          code: "@___ fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}",
          answer: "keyframes",
          explanation: "La regla '@keyframes' se utiliza en CSS para definir los pasos e intervalos de una animación."
        };
      }
    } else {
      // Marcador genérico para módulos de JS y React en esta fase
      return {
        category: "Módulo en Construcción",
        type: levelId === 3 ? "fill" : "choice",
        question: `[Maqueta ${moduleNames[moduleId]} - Nivel ${levelId}] ¿Qué método se usa por defecto?`,
        options: ["Método A", "Método B", "Método C", "Método D"],
        code: "const element = document.___('selector');",
        answer: "querySelector",
        explanation: "Pregunta temporal. En la siguiente fase se cargarán las preguntas oficiales desde el archivo JSON."
      };
    }
  };

  const mockQuestion = getMockQuestion();

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
          {mockQuestion.category}
        </span>
        <span>Nivel: <strong style={{ color: 'var(--color-accent)' }}>{levelId} / 3</strong></span>
      </div>

      {/* Barra de progreso */}
      <ProgressBar value={levelId} max={3} />

      {/* Temporizador */}
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
        {mockQuestion.question}
      </h2>

      {/* Pregunta condicional */}
      {mockQuestion.type === 'choice' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {mockQuestion.options.map((option, idx) => (
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
                gap: '0.8rem'
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
            <code>{mockQuestion.code}</code>
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
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.04)',
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
            marginBottom: '1rem',
            lineHeight: '1.5'
          }}>
            {mockQuestion.explanation}
          </p>
        </div>
      )}

      {/* Botón para finalizar */}
      <button 
        className="btn btn-primary" 
        onClick={onEnd}
        style={{
          width: '100%',
          fontSize: '0.95rem',
          marginTop: '1.5rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
          border: '1px solid rgba(255,255,255,0.05)',
          color: 'var(--color-text-main)',
          boxShadow: 'none'
        }}
      >
        Simular Completar Lección 🏁
      </button>
    </div>
  );
}

export default GameScreen;
