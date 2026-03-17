export default function PortfolioFilters({
  categories,
  activeFilter,
  onFilter,
  visible = true,
}) {
  if (!visible) return null;
  if (!categories || categories.length === 0) return null;

  return (
    <div className="portfolio-filters">
      <button
        className={`portfolio-filter${activeFilter === "All" ? " active" : ""}`}
        onClick={() => onFilter("All")}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug || cat.title}
          className={`portfolio-filter${activeFilter === cat.title ? " active" : ""}`}
          onClick={() => onFilter(cat.title)}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
