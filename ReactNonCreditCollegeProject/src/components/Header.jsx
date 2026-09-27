function Header({ level }) {
  return (
    <header className="board-header">
      <div>
        <h1>⚔️ QuestBoard</h1>
        <p className="tagline">Turn your to-dos into quests worth completing.</p>
      </div>
      <div className="level-badge">Level {level}</div>
    </header>
  );
}

export default Header;
