export default function FestivalCard({ festival, onDelete }) {
  const { name, religion, date, description } = festival;
  const d = date ? new Date(date) : null;

  return (
    <article className="festival-card">
      <div className="festival-main">
        <h4 className="festival-name">{name}</h4>
        <p className="festival-meta">
          <span className="chip">{religion}</span>
          {d && (
            <time dateTime={d.toISOString()} className="muted">
              {d.toLocaleDateString()}
            </time>
          )}
        </p>
        {/* Append this: */}
        {description && (
          <p className="festival-description">{description}</p>
        )}
      </div>
      <div className="festival-actions">
        <button className="btn danger" onClick={onDelete} aria-label={`Delete ${name}`}>
          Delete
        </button>
      </div>
    </article>
  );
}
