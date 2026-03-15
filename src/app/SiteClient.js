"use client";

import { useState, useEffect, useRef } from "react";
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
      { threshold: 0.15 }
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

// ─── IMAGE PLACEHOLDER ──────────────────────────────────────
function PlaceholderImage({ gradient, accent }) {
  return (
    <div
      style={{
        background: gradient,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.15 }}>
        <circle cx="16" cy="16" r="14" stroke={accent || "#fff"} strokeWidth="0.5" />
        <circle cx="16" cy="16" r="4" stroke={accent || "#fff"} strokeWidth="0.5" />
        <line x1="16" y1="2" x2="16" y2="12" stroke={accent || "#fff"} strokeWidth="0.3" />
        <line x1="16" y1="20" x2="16" y2="30" stroke={accent || "#fff"} strokeWidth="0.3" />
      </svg>
    </div>
  );
}

function bgStyle(project) {
  return project.cover
    ? { background: `url(${project.cover}) center/cover no-repeat` }
    : { background: project.gradient };
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
        <a className="nav-logo" onClick={() => go("home")}>
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
        <div className="nav-hamburger" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
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

// ─── HOME PAGE ──────────────────────────────────────────────
function HomePage({ projects, setPage, setProject }) {
  const featured = projects.filter((p) => p.featured);
  const openProject = (p) => {
    setProject(p);
    setPage("project");
    window.scrollTo({ top: 0 });
  };

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
          <div className="hero-tagline">Fashion · Editorial · Campaign</div>
          <h1 className="hero-title">
            The image is the
            <br />
            first conversation.
          </h1>
          <p className="hero-subtitle">
            Fashion photography rooted in editorial intelligence, visual discipline, and a deep
            respect for the craft of image-making.
          </p>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      <section style={{ padding: "160px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.5vw, 42px)",
              fontWeight: 300,
              lineHeight: 1.5,
              color: "var(--c-fg)",
              fontStyle: "italic",
            }}
          >
            "I photograph the space between the performance and the person. That's where fashion
            becomes interesting."
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--c-fg-tertiary)",
              marginTop: 32,
            }}
          >
            Ethan Cheng
          </p>
        </FadeIn>
      </section>

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
              <div className="featured-item-bg" style={bgStyle(p)} />
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

      {/* EDITORIAL STRIP */}
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
            {CLIENTS.slice(0, 7).map((c) => (
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

      {/* FEATURED IN */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <FadeIn>
          <div className="section-label">Featured In</div>
          <h2 className="section-title">Flaunt Magazine</h2>
          <div className="section-divider" />
          <a
            href="https://www.flaunt.com/post/lukas-gage-cant-let-go-issue"
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
                Issue 198 · Can't Let Go
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
                Lukas Gage — Nothing So Sweet As Humility
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
                Published in Flaunt Magazine. Photographed by Ollie Ali, styled by Christopher
                Campbell. Ethan Cheng — 2nd Assistant Photographer.
              </div>
              <div style={{ display: "flex", gap: 32, marginTop: 8, flexWrap: "wrap" }}>
                {[
                  ["Photographer", "Ollie Ali"],
                  ["Stylist", "Christopher Campbell"],
                  ["Grooming", "Nathaniel Dezan"],
                  ["2nd Assistant", "Ethan Cheng"],
                ].map(([role, name]) => (
                  <div key={role}>
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
                      {role}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "rgba(250,249,247,0.7)",
                      }}
                    >
                      {name}
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
                Read on Flaunt →
              </div>
            </div>
          </a>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <FadeIn>
          <div className="section-label">Inquiries</div>
          <h2 className="section-title">
            Let's create something
            <br />
            worth remembering.
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
            Available for editorial commissions, campaign work, beauty stories, and select brand
            collaborations worldwide.
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
            Get in Touch
          </a>
        </FadeIn>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── PORTFOLIO PAGE ─────────────────────────────────────────
function PortfolioPage({ projects, setPage, setProject }) {
  const [filter, setFilter] = useState("All");
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
          height: "40vh",
          minHeight: 300,
          display: "flex",
          alignItems: "flex-end",
          background: "var(--c-fg)",
          padding: "0 40px 48px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 300,
              color: "var(--c-bg)",
            }}
          >
            Portfolio
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(250,249,247,0.4)",
              marginTop: 12,
            }}
          >
            Selected editorial, campaign, and personal work — 2024–2026
          </p>
        </div>
      </div>
      <div className="section">
        <div className="portfolio-filters">
          {CATEGORIES.map((c) => (
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
              <div className="portfolio-card-bg" style={bgStyle(p)} />
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
  const c = project.credits;
  const creditEntries = [
    ["Photography", c.photographer],
    ["Model", c.model],
    ["Styling", c.stylist],
    ["Hair", c.hair],
    ["Makeup", c.makeup],
    ["Creative Direction", c.creative],
    ["Casting", c.casting],
  ];

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
        <div style={{ position: "absolute", inset: 0, ...bgStyle(project), backgroundSize: "cover", backgroundPosition: "center" }} />
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 80 }}>
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
          <div style={{ width: "100%", aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
            {project.cover ? (
              <img src={project.cover} alt={project.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <PlaceholderImage gradient={project.gradient} accent={project.accent} />
            )}
          </div>
        </FadeIn>

        <FadeIn>
          <div className="project-images-grid" style={{ marginTop: 2 }}>
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.slice(0, 2).map((src, i) => (
                <div key={i} style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                  <Image
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
              ))
            ) : (
              <>
                <div style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: project.gradient }} />
                </div>
                <div style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: (project.gradient || "").replace("165deg", "130deg") }} />
                </div>
              </>
            )}
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ maxWidth: 600, margin: "2px auto 0", width: "100%" }}>
            <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
              {project.cover ? (
                <img src={project.cover} alt={project.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)" }} />
              ) : (
                <PlaceholderImage gradient={project.gradient} accent={project.accent} />
              )}
            </div>
          </div>
        </FadeIn>

        <div style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid var(--c-border)" }}>
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
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 300,
              color: "var(--c-bg)",
              lineHeight: 1.1,
            }}
          >
            Ethan Cheng
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(250,249,247,0.4)",
              marginTop: 16,
            }}
          >
            Fashion & Editorial Photographer — Los Angeles
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 40px" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
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
          padding: "0 40px 48px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 300,
              color: "var(--c-bg)",
            }}
          >
            Inquiries
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
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
export default function SiteClient({ projects }) {
  const [page, setPage] = useState("home");
  const [project, setProject] = useState(null);

  return (
    <>
      <div className="noise-overlay" />
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage projects={projects} setPage={setPage} setProject={setProject} />}
      {page === "portfolio" && <PortfolioPage projects={projects} setPage={setPage} setProject={setProject} />}
      {page === "project" && <ProjectPage project={project} setPage={setPage} />}
      {page === "about" && <AboutPage setPage={setPage} />}
      {page === "contact" && <ContactPage setPage={setPage} />}
    </>
  );
}
