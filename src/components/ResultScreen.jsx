function ResultScreen({ stats, onRestart, onUnlockNext, isNextLocked }) {
  const isPerfect = stats.correct === stats.total && stats.total > 0;
  const isGood = stats.correct >= stats.total / 2;

  const feedbackTitle = isPerfect ? "¡Perfección Absoluta! 🌟" : (isGood ? "¡Excelente Trabajo! ⚡" : "¡Sigue Practicando! 💪");
  const feedbackDesc = isPerfect 
    ? "Has respondido todo correctamente y con un gran manejo del tiempo." 
    : (isGood ? "Tienes un buen dominio de los conceptos, pero aún puedes mejorar tu puntuación." : "Revisa el material de estudio e inténtalo de nuevo para mejorar tu resultado.");

  return (
    <div className="glass-panel animated-fade">
      {/* Icono de Trofeo */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 10px rgba(99, 102, 241, 0.4))' }}>
          🏆
        </span>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
        {feedbackTitle}
      </h1>
      <p style={{ fontSize: '0.95rem', marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
        {feedbackDesc}
      </p>

      {/* Tarjeta de Estadísticas Maqueta */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)', paddingRight: '0.5rem' }}>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>Aciertos</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
            {stats.correct} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>/ {stats.total}</span>
          </span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>Puntaje Total</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
            {stats.points}
          </span>
        </div>
      </div>

      {/* Acciones de Finalización */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        {isNextLocked && (
          stats.correct >= 4 ? (
            <button 
              className="btn btn-primary" 
              onClick={onUnlockNext} 
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', width: '100%', maxWidth: '300px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
            >
              🔓 Desbloquear Siguiente Nivel
            </button>
          ) : (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-error)', borderRadius: '12px', width: '100%', maxWidth: '300px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', margin: 0 }}>
                ⚠️ Necesitas al menos <strong>4 aciertos</strong> para desbloquear la siguiente lección.
              </p>
            </div>
          )
        )}
        
        <button 
          className="btn" 
          onClick={onRestart} 
          style={{ 
            padding: '1rem 2.5rem', 
            fontSize: '1rem', 
            width: '100%', 
            maxWidth: '300px', 
            background: isNextLocked && stats.correct >= 4 ? 'rgba(255, 255, 255, 0.05)' : 'var(--color-primary)',
            color: 'var(--color-text-main)' 
          }}
        >
          {isNextLocked && stats.correct >= 4 ? '🔙 Volver a Niveles' : '🔄 Jugar de Nuevo'}
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
