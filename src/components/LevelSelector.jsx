import React, { useEffect } from 'react';
import { playSound } from '../utils/audio';

function LevelSelector({ moduleId, unlockedLevels = [1], completedLevels = [], onSelectLevel, onUnlockLevel, onBack }) {
  // Nombres de los módulos principales
  const moduleNames = {
    html: 'HTML5 Estructural',
    css: 'CSS Avanzado & Layouts',
    js: 'JavaScript & DOM Moderno',
    react: 'React Framework'
  };

  // Temario académico por nivel para cada módulo
  const levelsData = {
    html: [
      { id: 1, name: 'Nivel 1: Estructura Básica', desc: 'Sintaxis de etiquetas, doctype, estructura head/body y metadatos.', difficulty: 'Fácil' },
      { id: 2, name: 'Nivel 2: Semántica HTML5', desc: 'Contenedores semánticos (header, section, footer) y accesibilidad básica.', difficulty: 'Medio' },
      { id: 3, name: 'Nivel 3: Formularios & Multimedia', desc: 'Campos input modernos, validación nativa y etiquetas audio/video.', difficulty: 'Difícil' }
    ],
    css: [
      { id: 1, name: 'Nivel 1: Fundamentos & Box Model', desc: 'Especificidad de selectores, herencia y propiedades del modelo de caja.', difficulty: 'Fácil' },
      { id: 2, name: 'Nivel 2: Layouts (Flexbox & Grid)', desc: 'Alineación de elementos en ejes y rejillas bidimensionales responsivas.', difficulty: 'Medio' },
      { id: 3, name: 'Nivel 3: Efectos & Animaciones', desc: 'Transiciones, transformaciones transform, keyframes y Media Queries.', difficulty: 'Difícil' }
    ],
    js: [
      { id: 1, name: 'Nivel 1: Sintaxis & DOM Moderno', desc: 'Variables let/const, querySelector, manipulación de clases y atributos.', difficulty: 'Fácil' },
      { id: 2, name: 'Nivel 2: Gestión de Eventos', desc: 'EventListeners, objeto Event, propagación (bubbling) y preventDefault.', difficulty: 'Medio' },
      { id: 3, name: 'Nivel 3: Asincronía & Módulos', desc: 'Fetch API, Promesas, async/await y modulación con import/export (ESM).', difficulty: 'Difícil' }
    ],
    react: [
      { id: 1, name: 'Nivel 1: Componentes & JSX', desc: 'Creación de componentes funcionales, sintaxis JSX y paso de datos con Props.', difficulty: 'Fácil' },
      { id: 2, name: 'Nivel 2: Estado Reactivo', desc: 'Manejo de estados con el hook useState e inputs controlados en formularios.', difficulty: 'Medio' },
      { id: 3, name: 'Nivel 3: Efectos & Ciclo de Vida', desc: 'Peticiones con useEffect y limpieza de intervalos (cleanup functions).', difficulty: 'Difícil' }
    ]
  };

  const currentLevels = levelsData[moduleId] || [];

  useEffect(() => {
    playSound('pantallaInicial');
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(images/fondo-${moduleId}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        opacity: 0.5
      }} />

      <div className="glass-panel animated-fade" style={{ 
        maxWidth: '580px', 
        textAlign: 'left',
        background: 'rgba(15, 23, 42, 0.85)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)'
      }}>
      
      {/* Cabecera */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
          Plan de Estudios
        </span>
        <h1 style={{ fontSize: '1.8rem', margin: '0.2rem 0 0.5rem 0', background: 'linear-gradient(135deg, #f3f4f6 30%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {moduleNames[moduleId]}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          Completa las lecciones en orden para dominar este módulo.
        </p>
      </div>

      {/* Lista de Niveles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {currentLevels.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl.id);
          const isUnlockable = !isUnlocked && (lvl.id === 1 || completedLevels.includes(lvl.id - 1));

          return (
            <div
              key={lvl.id}
              onClick={() => { if (isUnlocked) { playSound('click'); onSelectLevel(lvl.id); } }}
              style={{
                background: isUnlocked ? 'rgba(255, 255, 255, 0.03)' : (isUnlockable ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.01)'),
                border: `1px solid ${isUnlocked ? 'rgba(255,255,255,0.08)' : (isUnlockable ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.03)')}`,
                borderRadius: '14px',
                padding: '1.2rem',
                cursor: isUnlocked ? 'pointer' : (isUnlockable ? 'default' : 'not-allowed'),
                opacity: isUnlocked || isUnlockable ? 1 : 0.5,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
              onMouseEnter={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'none';
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    background: lvl.difficulty === 'Fácil' ? 'rgba(16, 185, 129, 0.15)' : (lvl.difficulty === 'Medio' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(239, 68, 68, 0.15)'),
                    color: lvl.difficulty === 'Fácil' ? 'var(--color-success)' : (lvl.difficulty === 'Medio' ? 'var(--color-primary)' : 'var(--color-error)')
                  }}>
                    {lvl.difficulty}
                  </span>
                  <h3 style={{ fontSize: '0.95rem', margin: 0, color: 'var(--color-text-main)' }}>
                    {lvl.name}
                  </h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.4' }}>
                  {lvl.desc}
                </p>
              </div>

              <div style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                {isUnlocked ? '▶️' : (isUnlockable ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); playSound('desbloqueoNivel'); onUnlockLevel(lvl.id); }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    🔓 Desbloquear
                  </button>
                ) : '🔒')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón de Regresar */}
      <button
        onClick={() => { playSound('click'); onBack(); }}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-main)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
      >
        ← Volver a los Módulos
      </button>
      </div>
    </>
  );
}

export default LevelSelector;
