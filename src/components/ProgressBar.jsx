function ProgressBar({ value, max }) {
  const percentage = (value / max) * 100;

  return (
    <div style={{
      width: '100%',
      height: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '3px',
      marginBottom: '1.8rem',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.02)'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />
    </div>
  );
}

export default ProgressBar;
