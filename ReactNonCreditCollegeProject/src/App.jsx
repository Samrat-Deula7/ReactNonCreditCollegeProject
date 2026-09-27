import { useState, useEffect } from "react";
import Header from "./components/Header";
import QuestForm from "./components/QuestForm";
import FilterTabs from "./components/FilterTabs";
import ProgressBar from "./components/ProgressBar";
import QuestBoardView from "./components/QuestBoardView";
import "./App.css";

const QUEST_TYPES = ["Work", "Personal", "Urgent"];

// Helper functions for reading/writing localStorage safely
function readStoredValue(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
}

function App() {
  const [quests, setQuests] = useState(() =>
    readStoredValue("questboard-quests", []),
  );
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Persist quests to localStorage whenever they change.
  useEffect(() => {
    writeStoredValue("questboard-quests", quests);
  }, [quests]);

  // Simulate an initial fetch/load so the app can demonstrate a loading state.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const addQuest = (title, category, dueDate) => {
    const newQuest = {
      id: crypto.randomUUID(),
      title,
      category,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setQuests((prev) => [newQuest, ...prev]);
  };

  const toggleComplete = (id) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q)),
    );
  };

  const deleteQuest = (id) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  };

  const editQuest = (id, newTitle) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title: newTitle } : q)),
    );
  };

  const filteredQuests = quests.filter((q) => {
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && !q.completed) ||
      (statusFilter === "Completed" && q.completed);
    const typeMatch = typeFilter === "All" || q.category === typeFilter;
    return statusMatch && typeMatch;
  });

  const openCount = quests.filter((q) => !q.completed).length;
  const completedCount = quests.filter((q) => q.completed).length;
  const level = Math.floor(completedCount / 5) + 1;

  return (
    <div className="board-shell">
      <Header level={level} />

      <main className="board-main">
        <QuestForm categories={QUEST_TYPES} onAddQuest={addQuest} />

        <FilterTabs
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          categories={QUEST_TYPES}
        />

        <ProgressBar openCount={openCount} completedCount={completedCount} />

        {isLoading ? (
          <p className="loading-text">Loading your quest log…</p>
        ) : (
          <QuestBoardView
            quests={filteredQuests}
            onToggleComplete={toggleComplete}
            onDelete={deleteQuest}
            onEdit={editQuest}
          />
        )}
      </main>
    </div>
  );
}

export default App;
