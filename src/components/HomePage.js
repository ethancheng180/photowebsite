import Image from "next/image";
import FadeIn from "./FadeIn";
import ProjectImage, { EditorialPlaceholder } from "./ProjectImage";
import { CLIENTS as FALLBACK_CLIENTS } from "@/data/projects";

const DEFAULTS = {
  heroTagline: "Fashion · Editorial · Campaign",
  heroTitle: "The image is the\nfirst conversation.",
  heroSubtitle:
    "Fashion photography rooted in editorial intelligence, visual discipline, and a deep respect for the craft of image-making.",
  showQuote: true,
  quoteText:
    "I photograph the space between the performance and the person. That's where fashion becomes interesting.",
  quoteAttribution: "Ethan Cheng",
  showClients: true,
  showFeature: true,
  featureLabel: "Featured In",
  featureTitle: "Flaunt Magazine",
  featureIssue: "Issue 198 · Can't Let Go",
  featureHeadline: "Lukas Gage — Nothing So Sweet As Humility",
  featureDescription:
    "Published in Flaunt Magazine. Photographed by Ollie Ali, styled by Christopher Campbell. Ethan Cheng — 2nd Assistant Photographer.",
  featureCredits: [
    { role: "Photographer", name: "Ollie Ali" },
    { role: "Stylist", name: "Christopher Campbell" },
    { role: "Grooming", name: "Nathaniel Dezan" },
    { role: "2nd Assistant", name: "Ethan Cheng" },
  ],
  featureUrl: "https://www.flaunt.com/post/lukas-gage-cant-let-go-issue",
  featureLinkText: "Read on Flaunt →",
  showCta: true,
  ctaLabel: "Inquiries",
  ctaTitle: "Let's create something\nworth remembering.",
  ctaBody:
    "Available for editorial commissions, campaign work, beauty stories, and select brand collaborations worldwide.",
  ctaButtonText: "Get in Touch",
};

function s(settings, key) {
  return settings?.[key] ?? DEFAULTS[key];
}

function HeroSection({ project, settings }) {
  const heroTitleLines = (s(settings, "heroTitle") || "").split("\n");

  return (
    <section className="hero">
      <div className="hero-bg">
        {project?.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 25%" }}
          />
        ) : (
          <div
            style={{
              background: project?.gradient || "#141210",
              position: "absolute",
              inset: 0,
            }}
          />
        )}
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tagline">{s(settings, "heroTagline")}</div>
        <h1 className="hero-title">
          {heroTitleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < heroTitleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">{s(settings, "heroSubtitle")}</p>
      </div>
      <div className="hero-scroll">Scroll</div>
    </section>
  );
}

function QuoteSection({ settings }) {
  if (!s(settings, "showQuote")) return null;
  return (
    <section className="quote-section">
      <FadeIn>
        <p className="quote-text">&ldquo;{s(settings, "quoteText")}&rdquo;</p>
        <div className="quote-rule" />
        <p className="quote-attr">{s(settings, "quoteAttribution")}</p>
      </FadeIn>
    </section>
  );
}

function FeaturedGrid({ projects, onSelect }) {
  const featured = projects.filter((p) => p.featured);
  if (featured.length === 0) return null;

  return (
    <section className="section">
      <FadeIn>
        <div className="section-label">Selected Work</div>
        <h2 className="section-title">
          Recent stories &<br />
          campaigns
        </h2>
      </FadeIn>
      <div className="featured-grid">
        {featured.map((p, i) => (
          <div
            key={p.id}
            className={`featured-item${i === 0 ? " wide" : ""}`}
            onClick={() => onSelect(p)}
          >
            <div className="featured-item-bg">
              {p.cover ? (
                <ProjectImage
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  style={{ objectFit: "cover" }}
                />
              ) : p.gradient ? (
                <div
                  style={{ position: "absolute", inset: 0, background: p.gradient }}
                />
              ) : (
                <EditorialPlaceholder />
              )}
            </div>
            <div className="featured-item-overlay" />
            <div className="featured-item-content">
              <div className="featured-item-cat">
                {p.category} · {p.year}
              </div>
              <div className="featured-item-title">{p.title}</div>
              <div className="featured-item-pub">{p.publication}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClientsStrip({ settings }) {
  if (!s(settings, "showClients")) return null;
  const clients = settings?.clients || FALLBACK_CLIENTS;

  return (
    <div className="clients-strip">
      <FadeIn>
        <div className="clients-strip__inner">
          {clients.slice(0, 7).map((c) => (
            <span key={c} className="clients-strip__name">
              {c}
            </span>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

function FeatureSection({ settings }) {
  if (!s(settings, "showFeature")) return null;
  const credits = settings?.featureCredits || DEFAULTS.featureCredits;

  return (
    <section className="section" style={{ paddingBottom: 40 }}>
      <FadeIn>
        <div className="section-label">{s(settings, "featureLabel")}</div>
        <h2 className="section-title">{s(settings, "featureTitle")}</h2>
        <div className="section-divider" />
        <a
          href={s(settings, "featureUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="feature-card"
        >
          <div className="feature-card__issue">
            {s(settings, "featureIssue")}
          </div>
          <div className="feature-card__headline">
            {s(settings, "featureHeadline")}
          </div>
          <div className="feature-card__desc">
            {s(settings, "featureDescription")}
          </div>
          <div className="feature-card__credits">
            {credits.map((c) => (
              <div key={c.role} className="feature-card__credit">
                <div className="feature-card__credit-role">{c.role}</div>
                <div className="feature-card__credit-name">{c.name}</div>
              </div>
            ))}
          </div>
          <div className="feature-card__link">
            {s(settings, "featureLinkText")}
          </div>
        </a>
      </FadeIn>
    </section>
  );
}

function CtaSection({ settings, setPage }) {
  if (!s(settings, "showCta")) return null;

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <FadeIn>
        <div className="section-label">{s(settings, "ctaLabel")}</div>
        <h2 className="section-title">
          {(s(settings, "ctaTitle") || "").split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className="section-divider" />
        <p className="cta-body">{s(settings, "ctaBody")}</p>
        <a
          onClick={() => {
            setPage("contact");
            window.scrollTo({ top: 0 });
          }}
          className="cta-link"
        >
          {s(settings, "ctaButtonText")}
        </a>
      </FadeIn>
    </section>
  );
}

export default function HomePage({ projects, settings, setPage, setProject }) {
  const openProject = (p) => {
    setProject(p);
    setPage("project");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page-transition">
      <HeroSection project={projects[0]} settings={settings} />
      <QuoteSection settings={settings} />
      <FeaturedGrid projects={projects} onSelect={openProject} />
      <ClientsStrip settings={settings} />
      <FeatureSection settings={settings} />
      <CtaSection settings={settings} setPage={setPage} />
    </div>
  );
}
