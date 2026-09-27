import QuestCard from './QuestCard';

function QuestBoardView({ quests, onToggleComplete, onDelete, onEdit }) {
  if (quests.length === 0) {
    return <p className="empty-state">No quests here. Add one above or adjust your filters.</p>;
  }

  return (
    <div className="quest-grid">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default QuestBoardView;
