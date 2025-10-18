export default function ScholarSection({ onNav }) {
  return (
    <div className="scholar-section">
      <div className="scholar-left">
        <h3 className="scholar-heading">Hire a Scholar</h3>
        <div className="scholar-cards">
          <button
            className="btn see-more"
            type="button"
            onClick={() => onNav?.("people:pandit")}
            title="Browse verified pandits"
          >
            <b>View Pandits 🕉️</b>
          </button>

          <button
            className="scholar-card"
            type="button"
            onClick={() => onNav?.("people:maulana")}
            title="View Maulana profiles"
          >
            <b>View Maulana 🕋</b>
          </button>

          <button
            className="scholar-card"
            type="button"
            onClick={() => onNav?.("people:priest")}
            title="View Priest profiles"
          >
            <b>View Priest ✝️</b>
          </button>
        </div>
      </div>

      <div className="scholar-right" aria-hidden="true">
        <div className="yellow-bars">
          <span></span>
          <span></span>
          <span></span>
          <p className="scholar-text">Find qualified scholars for your events.</p>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
