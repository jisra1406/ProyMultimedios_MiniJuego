function ResultScreen({ score, onRestart }) {
  // Datos simulados para fines de diseño de interfaz
  const mockStats = {
    correctCount: 8,
    totalCount: 10,
    points: 920,
    feedbackTitle: "¡Excelente Trabajo! ⚡",
    feedbackDesc: "¡Tienes un gran dominio de los conceptos de desarrollo web vistos en el curso de Multimedios!"
  };

  return (
    <div className="glass-panel animated-fade">
      {/* Icono de Trofeo */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 10px rgba(99, 102, 241, 0.4))' }}>
          🏆
        </span>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
        {mockStats.feedbackTitle}
      </h1>
      <p style={{ fontSize: '0.95rem', marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
        {mockStats.feedbackDesc}
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
            {mockStats.correctCount} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>/ {mockStats.totalCount}</span>
          </span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>Puntaje Total</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
            {mockStats.points}
          </span>
        </div>
      </div>

      {/* Botón de Reinicio */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={onRestart} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', width: '100%', maxWidth: '300px' }}>
          🔄 Jugar de Nuevo
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
