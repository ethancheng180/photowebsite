import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onSelect, gridMode = "editorial" }) {
  return (
    <div className={`project-grid project-grid--${gridMode}`}>
      {projects.map((p, i) => (
        <ProjectCard
          key={p.id}
          project={p}
          index={i}
          onClick={() => onSelect(p)}
          variant={gridMode === "editorial" && i === 0 ? "featured-lead" : "default"}
        />
      ))}
    </div>
  );
}
