import FadeIn from "./FadeIn";
import ProjectImage, { EditorialPlaceholder } from "./ProjectImage";

function buildGalleryBlocks(gallery) {
  const blocks = [];
  let i = 0;
  while (i < gallery.length) {
    const pos = blocks.length % 3;
    if (pos === 0) {
      blocks.push({ type: "full", images: [gallery[i]], start: i });
      i++;
    } else if (pos === 1) {
      if (i + 1 < gallery.length) {
        blocks.push({
          type: "pair",
          images: [gallery[i], gallery[i + 1]],
          start: i,
        });
        i += 2;
      } else {
        blocks.push({ type: "portrait", images: [gallery[i]], start: i });
        i++;
      }
    } else {
      blocks.push({ type: "portrait", images: [gallery[i]], start: i });
      i++;
    }
  }
  return blocks;
}

function GalleryBlock({ block, project, index }) {
  if (block.type === "full") {
    return (
      <FadeIn>
        <div className="image-container image-container--full">
          <ProjectImage
            src={block.images[0]}
            alt={`${project.title} — ${block.start + 1}`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </FadeIn>
    );
  }

  if (block.type === "pair") {
    return (
      <FadeIn>
        <div className="project-images-grid">
          {block.images.map((src, i) => (
            <div key={i} className="image-container image-container--pair">
              <ProjectImage
                src={src}
                alt={`${project.title} — ${block.start + i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="gallery-portrait-wrap">
        <div className="image-container image-container--portrait">
          <ProjectImage
            src={block.images[0]}
            alt={`${project.title} — ${block.start + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </FadeIn>
  );
}

export default function ProjectPage({ project, setPage }) {
  if (!project) return null;

  const c = project.credits || {};
  const creditEntries = [
    ["Photography", c.photographer],
    ["Model", c.model],
    ["Styling", c.stylist],
    ["Hair", c.hair],
    ["Makeup", c.makeup],
    ["Creative Direction", c.creative],
    ["Casting", c.casting],
  ].filter(([, value]) => value && value !== "—");

  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="project-hero">
        <div className="project-hero__bg">
          {project.cover ? (
            <ProjectImage
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          ) : project.gradient ? (
            <div
              style={{ position: "absolute", inset: 0, background: project.gradient }}
            />
          ) : (
            <EditorialPlaceholder label="Editorial In Progress" />
          )}
        </div>
        <div className="project-hero__gradient" />
        <div className="project-hero__content">
          <div className="project-hero__meta">
            {project.category} · {project.year}
          </div>
          <h1 className="project-hero__title">{project.title}</h1>
          <div className="project-hero__pub">{project.publication}</div>
        </div>
      </section>

      {/* Body */}
      <div className="project-body">
        {/* Description + Concept */}
        <FadeIn>
          <div className="project-text-grid">
            <p className="project-description">{project.description}</p>
            <p className="project-concept">{project.concept}</p>
          </div>
        </FadeIn>

        {/* Credits */}
        {creditEntries.length > 0 && (
          <FadeIn>
            <div className="project-credits">
              {creditEntries.map(([label, value]) => (
                <div key={label} className="project-credit">
                  <div className="project-credit__label">{label}</div>
                  <div className="project-credit__value">{value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Lead image */}
        <FadeIn>
          <div className="image-container image-container--lead">
            {project.cover ? (
              <ProjectImage
                src={project.cover}
                alt={project.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <EditorialPlaceholder label="Lead Image" />
            )}
          </div>
        </FadeIn>

        {/* Gallery */}
        {hasGallery ? (
          <div className="gallery-sequence">
            {buildGalleryBlocks(project.gallery).map((block, bi) => (
              <GalleryBlock key={bi} block={block} project={project} index={bi} />
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="gallery-portrait-wrap">
              <div className="image-container image-container--portrait">
                <EditorialPlaceholder label="Gallery In Progress" />
              </div>
            </div>
          </FadeIn>
        )}

        {/* Colophon */}
        <FadeIn>
          <div className="project-colophon">
            <div className="project-colophon__rule" />
            <div className="project-colophon__label">
              {project.title} · {project.year}
            </div>
          </div>
        </FadeIn>

        {/* Back link */}
        <div className="project-back">
          <a
            onClick={() => {
              setPage("portfolio");
              window.scrollTo({ top: 0 });
            }}
            className="project-back__link"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
