import ProjectImage, { EditorialPlaceholder } from "./ProjectImage";

export default function ProjectCard({ project, index, onClick, variant = "default" }) {
  const isWide = variant === "featured-lead";

  return (
    <div
      className={`project-card ${variant === "featured-lead" ? "project-card--lead" : ""}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="project-card__image">
        {project.cover ? (
          <ProjectImage
            src={project.cover}
            alt={project.title}
            fill
            sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            style={{ objectFit: "cover" }}
          />
        ) : project.gradient ? (
          <div
            style={{ position: "absolute", inset: 0, background: project.gradient }}
          />
        ) : (
          <EditorialPlaceholder />
        )}
      </div>
      <div className="project-card__overlay" />
      <div className="project-card__content">
        <div className="project-card__meta">
          {project.category} · {project.year}
        </div>
        <div className="project-card__title">{project.title}</div>
        <div className="project-card__pub">{project.publication}</div>
      </div>
    </div>
  );
}
