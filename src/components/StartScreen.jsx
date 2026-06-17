import React, { useEffect } from 'react';
import { playSound, stopBackgroundAudio } from '../utils/audio';

function StartScreen({ onStart }) {
  useEffect(() => {
    playSound('pantallaInicial');
  }, []);

  const handleStart = () => {
    playSound('click');
    onStart();
  };

  return (
    <div className="glass-panel animated-fade">
      {/* Icono Principal SVG: Representa un cerebro y tecnología */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#gradient-start)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V12L16 14" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="gradient-start" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #f3f4f6 30%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Trivia Multimedios
      </h1>
      <h2 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: '500', marginBottom: '1.5rem' }}>
        HTML, CSS, JavaScript y React
      </h2>
      
      <p style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
        Pon a prueba tus conocimientos en desarrollo web interactivo. Tendrás 15 segundos para responder cada pregunta. ¡Demuestra qué tan listo estás para el examen!
      </p>

      {/* Caja de instrucciones */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.2rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        <h3 style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--color-accent)' }}>⚡</span> Reglas del Minijuego:
        </h3>
        <ul style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li>Responde 10 preguntas interactivas de opción múltiple.</li>
          <li>Cada respuesta correcta suma 100 puntos + bonificación por velocidad.</li>
          <li>El temporizador se reinicia con cada pregunta.</li>
          <li>Efectos de sonido interactivos integrados en el navegador.</li>
        </ul>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', width: '100%', maxWidth: '300px' }}>
          ¡Comenzar Trivia!
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
