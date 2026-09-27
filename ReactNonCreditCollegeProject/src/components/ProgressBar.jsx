function ProgressBar({ openCount, completedCount }) {
  const total = openCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-stats">
        <span>{openCount} open</span>
        <span>{completedCount} completed</span>
        <span>{percent}% done</span>
      </div>
    </div>
  );
}

export default ProgressBar;
