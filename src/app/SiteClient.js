"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CATEGORIES, CLIENTS } from "@/data/projects";

// ─── UTILITY: Intersection Observer Hook ────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, className = "", style = {} }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`} style={style}>
      {children}
    </div>
  );
}

// ─── IMAGE SYSTEM ───────────────────────────────────────────
function EditorialPlaceholder({ label = "Image Coming Soon" }) {
  return (
    <div className="editorial-placeholder">
      <span className="editorial-placeholder-label">{label}</span>
    </div>
  );
}

function RevealImage({ src, alt, fill, sizes, style, priority, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => setLoaded(true), []);

  if (!src) return <EditorialPlaceholder />;

  return (
    <Image
      src={src}
      alt={alt || ""}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={`image-reveal ${loaded ? "loaded" : ""} ${className}`}
      style={style}
      onLoad={onLoad}
    />
  );
}

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
        blocks.push({ type: "pair", images: [gallery[i], gallery[i + 1]], start: i });
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

// ─── NAVIGATION ─────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" onClick={() => go("home")} role="button" tabIndex={0} aria-label="Go to homepage">
          Ethan Cheng
        </a>
        <ul className="nav-links">
          {[
            ["Portfolio", "portfolio"],
            ["About", "about"],
            ["Contact", "contact"],
          ].map(([l, p]) => (
            <li key={p}>
              <a onClick={() => go(p)}>{l}</a>
            </li>
          ))}
        </ul>
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ×
        </button>
        {[
          ["Portfolio", "portfolio"],
          ["About", "about"],
          ["Contact", "contact"],
        ].map(([l, p]) => (
          <a key={p} onClick={() => go(p)}>
            {l}
          </a>
        ))}
      </div>
    </>
  );
}

// ─── DEFAULTS ───────────────────────────────────────────────
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

function useSetting(settings, key) {
  return settings?.[key] ?? DEFAULTS[key];
}

// ─── HOME PAGE ──────────────────────────────────────────────
function HomePage({ projects, settings, setPage, setProject }) {
  const featured = projects.filter((p) => p.featured);
  const openProject = (p) => {
    setProject(p);
    setPage("project");
    window.scrollTo({ top: 0 });
  };

  const s = (key) => useSetting(settings, key);
  const heroTitleLines = (s("heroTitle") || "").split("\n");

  return (
    <div className="page-transition">
      <section className="hero">
        <div className="hero-bg">
          {projects[0].cover ? (
            <Image
              src={projects[0].cover}
              alt={projects[0].title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 25%" }}
            />
          ) : (
            <div style={{ background: projects[0].gradient, position: "absolute", inset: 0 }} />
          )}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-tagline">{s("heroTagline")}</div>
          <h1 className="hero-title">
            {heroTitleLines.map((line, i) => (
              <span key={i}>{line}{i < heroTitleLines.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="hero-subtitle">{s("heroSubtitle")}</p>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {s("showQuote") && (
        <section style={{ padding: "180px 40px", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 300,
                lineHeight: 1.45,
                color: "var(--c-fg)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              "{s("quoteText")}"
            </p>
            <div style={{
              width: 24,
              height: 1,
              background: "var(--c-border)",
              margin: "36px auto 0",
            }} />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--c-fg-tertiary)",
                marginTop: 20,
              }}
            >
              {s("quoteAttribution")}
            </p>
          </FadeIn>
        </section>
      )}

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
              onClick={() => openProject(p)}
            >
              <div className="featured-item-bg">
                {p.cover ? (
                  <RevealImage
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    style={{ objectFit: "cover" }}
                  />
                ) : p.gradient ? (
                  <div style={{ position: "absolute", inset: 0, background: p.gradient }} />
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

      {s("showClients") && (
        <div style={{ padding: "0 40px", maxWidth: 1400, margin: "0 auto 120px" }}>
          <FadeIn>
            <div
              style={{
                borderTop: "1px solid var(--c-border)",
                borderBottom: "1px solid var(--c-border)",
                padding: "40px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {(settings?.clients || CLIENTS).slice(0, 7).map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    fontWeight: 400,
                    color: "var(--c-fg-tertiary)",
                    fontStyle: "italic",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      )}

      {s("showFeature") && (
        <section className="section" style={{ paddingBottom: 40 }}>
          <FadeIn>
            <div className="section-label">{s("featureLabel")}</div>
            <h2 className="section-title">{s("featureTitle")}</h2>
            <div className="section-divider" />
            <a
              href={s("featureUrl")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                overflow: "hidden",
                marginTop: 40,
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: "var(--c-fg)",
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(250,249,247,0.4)",
                  }}
                >
                  {s("featureIssue")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 300,
                    color: "var(--c-bg)",
                    lineHeight: 1.3,
                  }}
                >
                  {s("featureHeadline")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(250,249,247,0.5)",
                    lineHeight: 1.7,
                    maxWidth: 560,
                  }}
                >
                  {s("featureDescription")}
                </div>
                <div style={{ display: "flex", gap: 32, marginTop: 8, flexWrap: "wrap" }}>
                  {(settings?.featureCredits || DEFAULTS.featureCredits).map((c) => (
                    <div key={c.role}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 8,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(250,249,247,0.3)",
                          marginBottom: 4,
                        }}
                      >
                        {c.role}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 12,
                          color: "rgba(250,249,247,0.7)",
                        }}
                      >
                        {c.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--c-bg)",
                    marginTop: 12,
                    paddingBottom: 2,
                    borderBottom: "1px solid rgba(250,249,247,0.3)",
                    alignSelf: "flex-start",
                  }}
                >
                  {s("featureLinkText")}
                </div>
              </div>
            </a>
          </FadeIn>
        </section>
      )}

      {s("showCta") && (
        <section className="section" style={{ paddingTop: 0 }}>
          <FadeIn>
            <div className="section-label">{s("ctaLabel")}</div>
            <h2 className="section-title">
              {(s("ctaTitle") || "").split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <div className="section-divider" />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--c-fg-secondary)",
                maxWidth: 480,
                lineHeight: 1.8,
              }}
            >
              {s("ctaBody")}
            </p>
            <a
              onClick={() => {
                setPage("contact");
                window.scrollTo({ top: 0 });
              }}
              style={{
                display: "inline-block",
                marginTop: 32,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-fg)",
                borderBottom: "1px solid var(--c-fg)",
                paddingBottom: 4,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              {s("ctaButtonText")}
            </a>
          </FadeIn>
        </section>
      )}

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── PORTFOLIO PAGE ─────────────────────────────────────────
function PortfolioPage({ projects, settings, setPage, setProject }) {
  const [filter, setFilter] = useState("All");
  const cmsFilters = settings?.portfolioFilters;
  const categories = cmsFilters && cmsFilters.length > 0
    ? ["All", ...cmsFilters]
    : CATEGORIES;
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const openProject = (p) => {
    setProject(p);
    setPage("project");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page-transition">
      <div
        style={{
          height: "45vh",
          minHeight: 340,
          display: "flex",
          alignItems: "flex-end",
          background: "var(--c-fg)",
          padding: "0 40px 56px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 300,
              color: "var(--c-bg)",
              letterSpacing: "-0.015em",
            }}
          >
            Portfolio
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(250,249,247,0.35)",
              marginTop: 16,
            }}
          >
            Selected editorial, campaign, and personal work — 2024–2026
          </p>
        </div>
      </div>
      <div className="section">
        <div className="portfolio-filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`portfolio-filter${filter === c ? " active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="portfolio-grid">
          {filtered.map((p) => (
            <div key={p.id} className="portfolio-card" onClick={() => openProject(p)}>
              <div className="portfolio-card-bg">
                {p.cover ? (
                  <RevealImage
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : p.gradient ? (
                  <div style={{ position: "absolute", inset: 0, background: p.gradient }} />
                ) : (
                  <EditorialPlaceholder />
                )}
              </div>
              <div className="portfolio-card-info">
                <div className="portfolio-card-title">{p.title}</div>
                <div className="portfolio-card-meta">
                  {p.category} · {p.publication}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── PROJECT PAGE ───────────────────────────────────────────
function ProjectPage({ project, setPage }) {
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

  return (
    <div className="page-transition">
      <section
        style={{
          height: "70vh",
          minHeight: 500,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {project.cover ? (
            <RevealImage
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          ) : project.gradient ? (
            <div style={{ position: "absolute", inset: 0, background: project.gradient }} />
          ) : (
            <EditorialPlaceholder label="Editorial In Progress" />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,8,6,0.7) 0%, rgba(10,8,6,0.1) 40%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 40px 64px",
            maxWidth: 1400,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 16,
            }}
          >
            {project.category} · {project.year}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.5)",
              marginTop: 16,
            }}
          >
            {project.publication}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 40px" }}>
        <FadeIn>
          <div className="project-text-grid" style={{ marginBottom: 80 }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "var(--c-fg)",
              }}
            >
              {project.description}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.8,
                color: "var(--c-fg-secondary)",
              }}
            >
              {project.concept}
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              borderTop: "1px solid var(--c-border)",
              paddingTop: 40,
              marginBottom: 80,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 24,
            }}
          >
            {creditEntries.map(([label, value]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--c-fg-tertiary)",
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--c-fg)" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Editorial image layout */}
        <FadeIn>
          <div className="image-container" style={{ width: "100%", aspectRatio: "3/2" }}>
            {project.cover ? (
              <RevealImage
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

        {project.gallery && project.gallery.length > 0 ? (
          <div className="gallery-sequence">
            {buildGalleryBlocks(project.gallery).map((block, bi) => {
              if (block.type === "full") {
                return (
                  <FadeIn key={bi}>
                    <div className="image-container" style={{ width: "100%", aspectRatio: "3/2" }}>
                      <RevealImage
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
                  <FadeIn key={bi}>
                    <div className="project-images-grid">
                      {block.images.map((src, i) => (
                        <div key={i} className="image-container" style={{ aspectRatio: "4/5" }}>
                          <RevealImage
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
                <FadeIn key={bi}>
                  <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
                    <div className="image-container" style={{ aspectRatio: "2/3" }}>
                      <RevealImage
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
            })}
          </div>
        ) : (
          <FadeIn>
            <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
              <div className="image-container" style={{ aspectRatio: "2/3" }}>
                <EditorialPlaceholder label="Gallery In Progress" />
              </div>
            </div>
          </FadeIn>
        )}

        <FadeIn>
          <div style={{ textAlign: "center", padding: "80px 0 40px" }}>
            <div style={{
              width: 32,
              height: 1,
              background: "var(--c-border)",
              margin: "0 auto 20px",
            }} />
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--c-warm)",
            }}>
              {project.title} · {project.year}
            </div>
          </div>
        </FadeIn>

        <div style={{ paddingTop: 40, borderTop: "1px solid var(--c-border)" }}>
          <a
            onClick={() => {
              setPage("portfolio");
              window.scrollTo({ top: 0 });
            }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--c-fg-tertiary)",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div className="page-transition">
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "flex-end",
          background: "var(--c-fg)",
          padding: "0 40px 64px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6.5vw, 88px)",
              fontWeight: 300,
              color: "var(--c-bg)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            Ethan Cheng
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(250,249,247,0.35)",
              marginTop: 20,
            }}
          >
            Fashion & Editorial Photographer — Los Angeles
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 40px" }}>
        <FadeIn>
          <div className="about-text-grid">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--c-fg)",
              }}
            >
              Ethan Cheng is a fashion and editorial photographer based in Los Angeles, working across
              New York, Paris, and Milan. His work sits at the intersection of editorial precision and
              personal observation — images that feel both composed and candid, controlled and alive.
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.9,
                color: "var(--c-fg-secondary)",
              }}
            >
              <p>
                Cheng's approach to fashion photography is rooted in restraint. He treats each project
                as a short film told through still frames — prioritizing atmosphere, gesture, and the
                quality of light over excessive styling or post-production intervention.
              </p>
              <p style={{ marginTop: 20 }}>
                Before focusing exclusively on fashion, he spent several years working across
                documentary and fine art photography, which continues to inform his editorial work with
                a sense of honesty and narrative depth that distinguishes his images from conventional
                fashion output.
              </p>
              <p style={{ marginTop: 20 }}>
                His recent work includes editorial commissions for European and American fashion
                publications, campaign imagery for luxury maisons, beauty stories with a natural-light
                philosophy, and an ongoing personal project documenting new faces during fashion weeks
                in Milan and Paris.
              </p>
              <p style={{ marginTop: 20 }}>
                He is drawn to the moments between the moments — the space after the show, the silence
                before a sitting, the thirty seconds when a model stops performing and something real
                appears. That territory, where fashion meets vulnerability, is where his strongest
                images live.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              marginTop: 80,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 48,
              borderTop: "1px solid var(--c-border)",
              paddingTop: 48,
            }}
          >
            {[
              { label: "Based", items: ["Los Angeles"] },
              { label: "Working Cities", items: ["New York", "Paris", "Milan", "Los Angeles"] },
              {
                label: "Specialties",
                items: ["Editorial Fashion", "Campaign & Lookbook", "Beauty & Portraiture", "Celebrity & Portraiture"],
              },
              {
                label: "Representation",
                items: ["General inquiries welcome", "Seeking agency representation"],
              },
            ].map((d) => (
              <div key={d.label}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--c-fg-tertiary)",
                    marginBottom: 16,
                  }}
                >
                  {d.label}
                </div>
                <ul style={{ listStyle: "none" }}>
                  {d.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "var(--c-fg-secondary)",
                        lineHeight: 2,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ marginTop: 80, borderTop: "1px solid var(--c-border)", paddingTop: 48 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-fg-tertiary)",
                marginBottom: 24,
              }}
            >
              Selected Clients & Publications
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {CLIENTS.map((c, i) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontStyle: "italic",
                    color: "var(--c-fg-tertiary)",
                    padding: "8px 24px 8px 0",
                  }}
                >
                  {c}
                  {i < CLIENTS.length - 1 && (
                    <span style={{ marginLeft: 24, color: "var(--c-border)" }}>·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ marginTop: 80, borderTop: "1px solid var(--c-border)", paddingTop: 48 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-fg-tertiary)",
              }}
            >
              Philosophy
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--c-fg)",
                maxWidth: 640,
                marginTop: 16,
                fontStyle: "italic",
              }}
            >
              "The best fashion images don't sell clothes. They sell a feeling — of being seen, of
              belonging, of wanting to be inside that frame. My job is to create that frame and then
              get out of its way."
            </p>
          </div>
        </FadeIn>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── CONTACT PAGE ───────────────────────────────────────────
function ContactPage({ setPage }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-transition">
      <div
        style={{
          minHeight: "40vh",
          display: "flex",
          alignItems: "flex-end",
          background: "var(--c-fg)",
          padding: "0 40px 56px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 300,
              color: "var(--c-bg)",
              letterSpacing: "-0.015em",
            }}
          >
            Inquiries
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 40px" }}>
        <div className="contact-grid">
          <div>
            <FadeIn>
              {[
                ["General", <a href="mailto:contact@ethanchengphotography.com" style={{ color: "var(--c-fg)", textDecoration: "none", borderBottom: "1px solid var(--c-border)" }}>contact@ethanchengphotography.com</a>],
                ["Instagram", <a href="https://instagram.com/Ethan__cheng__" target="_blank" rel="noopener noreferrer" style={{ color: "var(--c-fg)", textDecoration: "none", borderBottom: "1px solid var(--c-border)" }}>@Ethan__cheng__</a>],
                ["Based In", "Los Angeles, California"],
                ["Working In", "New York · Paris · Milan · Los Angeles"],
                ["Representation", <span style={{ color: "var(--c-fg-secondary)" }}>Currently seeking agency representation.<br />Open to conversations with talent agencies<br />and artist management groups.</span>],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: 40 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--c-fg-tertiary)",
                      marginBottom: 12,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--c-fg)", lineHeight: 1.8 }}>
                    {value}
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>
          <div>
            <FadeIn>
              {!submitted ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {[
                    { label: "Name", type: "text", placeholder: "Full name" },
                    { label: "Email", type: "email", placeholder: "Email address" },
                  ].map((f) => (
                    <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--c-fg-tertiary)",
                        }}
                      >
                        {f.label}
                      </label>
                      <input className="form-input" type={f.type} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--c-fg-tertiary)",
                      }}
                    >
                      Inquiry Type
                    </label>
                    <select className="form-select">
                      <option>Select category</option>
                      <option>Editorial Commission</option>
                      <option>Campaign / Lookbook</option>
                      <option>Beauty Story</option>
                      <option>Brand Collaboration</option>
                      <option>Model Test</option>
                      <option>Press / Media</option>
                      <option>Representation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--c-fg-tertiary)",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell me about your project, timeline, and vision."
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "16px 40px",
                      background: "var(--c-fg)",
                      color: "var(--c-bg)",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    Send Inquiry
                  </button>
                </div>
              ) : (
                <div style={{ paddingTop: 20 }}>
                  <div className="section-label">Thank You</div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "var(--c-fg)",
                      marginTop: 12,
                    }}
                  >
                    Your inquiry has been received. I'll respond within 48 hours.
                  </p>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────
function Footer({ setPage }) {
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };
  return (
    <footer
      style={{
        borderTop: "1px solid var(--c-border)",
        padding: "48px 40px",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--c-fg-tertiary)",
          }}
        >
          Ethan Cheng
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            ["Portfolio", "portfolio"],
            ["About", "about"],
            ["Contact", "contact"],
          ].map(([l, p]) => (
            <a
              key={p}
              onClick={() => go(p)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--c-fg-tertiary)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="https://instagram.com/Ethan__cheng__"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--c-fg-tertiary)",
              textDecoration: "none",
            }}
          >
            Instagram
          </a>
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "var(--c-fg-tertiary)",
          letterSpacing: "0.05em",
          marginTop: 32,
        }}
      >
        © 2026 Ethan Cheng. All rights reserved. Los Angeles · New York · Paris · Milan
      </div>
    </footer>
  );
}

// ─── APP ────────────────────────────────────────────────────
export default function SiteClient({ projects, settings }) {
  const [page, setPage] = useState("home");
  const [project, setProject] = useState(null);

  return (
    <>
      <div className="noise-overlay" />
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage projects={projects} settings={settings} setPage={setPage} setProject={setProject} />}
      {page === "portfolio" && <PortfolioPage projects={projects} settings={settings} setPage={setPage} setProject={setProject} />}
      {page === "project" && <ProjectPage project={project} setPage={setPage} />}
      {page === "about" && <AboutPage setPage={setPage} />}
      {page === "contact" && <ContactPage setPage={setPage} />}
    </>
  );
}
