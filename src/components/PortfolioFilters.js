const DEFAULT_CATEGORIES = [
  { title: "Editorial", slug: "editorial" },
  { title: "Campaign", slug: "campaign" },
  { title: "Beauty", slug: "beauty" },
  { title: "Portraits", slug: "portraits" },
  { title: "Celebrity", slug: "celebrity" },
];

export default function PortfolioFilters({
  categories,
  activeFilter,
  onFilter,
  visible = true,
}) {
  if (!visible) return null;

  const items = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  return (
    <div className="portfolio-filters">
      <button
        className={`portfolio-filter${activeFilter === "All" ? " active" : ""}`}
        onClick={() => onFilter("All")}
      >
        All
      </button>
      {items.map((cat) => (
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
