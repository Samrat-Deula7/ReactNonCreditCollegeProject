import { useState } from 'react';

const TYPE_CLASS = {
  Work: 'ribbon-work',
  Personal: 'ribbon-personal',
  Urgent: 'ribbon-urgent',
};

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

function QuestCard({ quest, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(quest.title);
  const overdue = isOverdue(quest.dueDate, quest.completed);

  const handleSave = () => {
    const trimmed = draftTitle.trim();
    if (trimmed) onEdit(quest.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftTitle(quest.title);
    setIsEditing(false);
  };

  const cardClass = [
    'quest-card',
    quest.completed ? 'quest-complete' : '',
    overdue ? 'quest-overdue' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass}>
      <div className={`ribbon ${TYPE_CLASS[quest.category] || ''}`}>{quest.category}</div>

      {isEditing ? (
        <input
          className="edit-input"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
        />
      ) : (
        <h3 className="quest-title">{quest.title}</h3>
      )}

      {quest.dueDate && (
        <p className={overdue ? 'due-date overdue-tag' : 'due-date'}>
          {overdue ? '⚠ Overdue — ' : 'Due '}
          {new Date(quest.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="quest-actions">
        <button className="complete-btn" onClick={() => onToggleComplete(quest.id)}>
          {quest.completed ? '✓ Completed' : 'Mark Complete'}
        </button>

        {isEditing ? (
          <button className="icon-btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="icon-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="icon-btn danger" onClick={() => onDelete(quest.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestCard;
