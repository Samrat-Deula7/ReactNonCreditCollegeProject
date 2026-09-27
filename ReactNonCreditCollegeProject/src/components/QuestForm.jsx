import { useState } from 'react';

function QuestForm({ categories, onAddQuest }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAddQuest(trimmed, category, dueDate);
    setTitle('');
    setCategory(categories[0]);
    setDueDate('');
  };

  return (
    <form className="quest-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name your quest…"
        aria-label="Quest title"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Quest type"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date (optional)"
      />
      <button type="submit">+ Add Quest</button>
    </form>
  );
}

export default QuestForm;
