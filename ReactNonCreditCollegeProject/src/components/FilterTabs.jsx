const STATUSES = ['All', 'Active', 'Completed'];

function FilterTabs({ statusFilter, onStatusChange, typeFilter, onTypeChange, categories }) {
  return (
    <div className="filter-tabs">
      <div className="pill-group">
        {STATUSES.map((status) => (
          <button
            key={status}
            className={statusFilter === status ? 'pill active' : 'pill'}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="pill-group">
        <button
          className={typeFilter === 'All' ? 'pill active' : 'pill'}
          onClick={() => onTypeChange('All')}
        >
          All Types
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={typeFilter === cat ? 'pill active' : 'pill'}
            onClick={() => onTypeChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;
