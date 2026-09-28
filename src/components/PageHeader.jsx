export default function PageHeader({ code, eyebrow, title, description, actions, compact = false }) {
  return (
    <header className={`page-header ${compact ? "page-header--compact" : ""}`}>
      <div className="page-header__index">{code}</div>
      <div className="page-header__content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {actions && <div className="page-header__actions">{actions}</div>}
      </div>
      <div className="page-header__coordinates" aria-hidden="true">
        <span>22.3193 N</span>
        <span>114.1694 E</span>
      </div>
    </header>
  );
}
