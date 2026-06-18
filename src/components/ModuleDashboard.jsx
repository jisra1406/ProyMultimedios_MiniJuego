import React, { useEffect } from 'react';
import { playSound } from '../utils/audio';

function ModuleDashboard({ unlockedModules = ['html'], completedLevels = { html: [], css: [], js: [], react: [] }, onSelectModule, onUnlockModule, onBack }) {
  const moduleOrder = ['html', 'css', 'js', 'react'];
  const modules = [
    {
      id: 'html',
      name: 'HTML5 Estructural',
      desc: 'Semántica, etiquetas y estructuración del DOM.',
      color: '#e34f26',
      icon: 'images/logo-html.png'
    },
    {
      id: 'css',
      name: 'CSS Avanzado & Layouts',
      desc: 'Bases, Flexbox, Grid y animaciones modernas.',
      color: '#1572b6',
      icon: 'images/logo-css3.png'
    },
    {
      id: 'js',
      name: 'JavaScript & DOM Moderno',
      desc: 'Eventos, asincronía, ESM y WebComponents.',
      color: '#f7df1e',
      icon: 'images/logo-js.png'
    },
    {
      id: 'react',
      name: 'React Framework',
      desc: 'Componentes, estado reactivo, hooks y ciclo de vida.',
      color: '#61dafb',
      icon: 'images/logo-react.png'
    }
  ];

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
        backgroundImage: `url(images/fondo-dashboard.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        opacity: 0.5
      }} />

      <div className="glass-panel animated-fade" style={{ 
        maxWidth: '650px',
        background: 'rgba(15, 23, 42, 0.85)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)'
      }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #f3f4f6 30%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Módulos de Aprendizaje
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Completa el módulo actual para desbloquear la siguiente área de estudio.
      </p>

      {/* Grid de Módulos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        {modules.map((mod) => {
          const isUnlocked = unlockedModules.includes(mod.id);
          const modIdx = moduleOrder.indexOf(mod.id);
          const prevModId = modIdx > 0 ? moduleOrder[modIdx - 1] : null;
          const isUnlockable = !isUnlocked && prevModId && completedLevels[prevModId].includes(3);

          return (
            <div
              key={mod.id}
              style={{
                background: isUnlocked ? 'rgba(255, 255, 255, 0.03)' : (isUnlockable ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.01)'),
                border: `1px solid ${isUnlocked ? 'rgba(99, 102, 241, 0.2)' : (isUnlockable ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.03)')}`,
                borderRadius: '16px',
                padding: '1.2rem',
                opacity: isUnlocked || isUnlockable ? 1 : 0.55,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                cursor: isUnlocked ? 'default' : 'not-allowed',
                boxShadow: isUnlocked ? '0 4px 12px rgba(99, 102, 241, 0.02)' : 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center' }}>
                    <img src={mod.icon} alt={`${mod.name} logo`} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  </span>
                  {!isUnlocked && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>🔒 Bloqueado</span>
                  )}
                  {isUnlocked && (
                    <span style={{
                      fontSize: '0.7rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--color-success)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}>
                      Disponible
                    </span>
                  )}
                </div>
                
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: isUnlocked ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                  {mod.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1.2rem', lineHeight: '1.4' }}>
                  {mod.desc}
                </p>
              </div>

              {isUnlocked ? (
                <button
                  className="btn btn-primary"
                  onClick={() => { playSound('click'); onSelectModule(mod.id); }}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    width: '100%',
                    background: `linear-gradient(135deg, ${mod.color}dd 0%, ${mod.color}ff 100%)`,
                    boxShadow: 'none'
                  }}
                >
                  Entrar al Módulo
                </button>
              ) : (isUnlockable ? (
                <button
                  className="btn btn-primary"
                  onClick={() => { playSound('desbloqueoNivel'); onUnlockModule(mod.id); }}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  🔓 Desbloquear Módulo
                </button>
              ) : (
                <div style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  width: '100%',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-button)',
                  color: 'var(--color-text-muted)'
                }}>
                  🔒 Reclama Aprobación
                </div>
              ))}
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
        ← Volver a la Bienvenida
      </button>
      </div>
    </>
  );
}

export default ModuleDashboard;
