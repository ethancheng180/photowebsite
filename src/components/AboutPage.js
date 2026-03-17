import FadeIn from "./FadeIn";
import { CLIENTS as FALLBACK_CLIENTS } from "@/data/projects";

const DEFAULTS = {
  heroTitle: "Ethan Cheng",
  heroSubtitle: "Fashion & Editorial Photographer — Los Angeles",
  bioLead:
    "Ethan Cheng is a fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan. His work sits at the intersection of editorial precision and personal observation — images that feel both composed and candid, controlled and alive.",
  bioBody: [
    "Cheng's approach to fashion photography is rooted in restraint. He treats each project as a short film told through still frames — prioritizing atmosphere, gesture, and the quality of light over excessive styling or post-production intervention.",
    "Before focusing exclusively on fashion, he spent several years working across documentary and fine art photography, which continues to inform his editorial work with a sense of honesty and narrative depth that distinguishes his images from conventional fashion output.",
    "His recent work includes editorial commissions for European and American fashion publications, campaign imagery for luxury maisons, beauty stories with a natural-light philosophy, and an ongoing personal project documenting new faces during fashion weeks in Milan and Paris.",
    "He is drawn to the moments between the moments — the space after the show, the silence before a sitting, the thirty seconds when a model stops performing and something real appears. That territory, where fashion meets vulnerability, is where his strongest images live.",
  ],
  infoBlocks: [
    { label: "Based", items: ["Los Angeles"] },
    { label: "Working Cities", items: ["New York", "Paris", "Milan", "Los Angeles"] },
    {
      label: "Specialties",
      items: [
        "Editorial Fashion",
        "Campaign & Lookbook",
        "Beauty & Portraiture",
        "Celebrity & Portraiture",
      ],
    },
    {
      label: "Representation",
      items: ["General inquiries welcome", "Seeking agency representation"],
    },
  ],
  showClients: true,
  clientsLabel: "Selected Clients & Publications",
  showPhilosophy: true,
  philosophyLabel: "Philosophy",
  philosophyQuote:
    "The best fashion images don't sell clothes. They sell a feeling — of being seen, of belonging, of wanting to be inside that frame. My job is to create that frame and then get out of its way.",
};

function v(aboutData, key) {
  return aboutData?.[key] ?? DEFAULTS[key];
}

export default function AboutPage({ aboutData, settings }) {
  const heroTitle = v(aboutData, "heroTitle");
  const heroSubtitle = v(aboutData, "heroSubtitle");
  const bioLead = v(aboutData, "bioLead");
  const bioBody = v(aboutData, "bioBody");
  const infoBlocks = v(aboutData, "infoBlocks");
  const showClients = v(aboutData, "showClients");
  const clientsLabel = v(aboutData, "clientsLabel");
  const clients = aboutData?.clients?.length > 0
    ? aboutData.clients
    : settings?.clients?.length > 0
      ? settings.clients
      : FALLBACK_CLIENTS;
  const showPhilosophy = v(aboutData, "showPhilosophy");
  const philosophyLabel = v(aboutData, "philosophyLabel");
  const philosophyQuote = v(aboutData, "philosophyQuote");

  return (
    <div className="page-transition">
      <div className="about-hero">
        <div className="about-hero__inner">
          <FadeIn>
            <h1 className="about-hero__title">{heroTitle}</h1>
            <p className="about-hero__subtitle">{heroSubtitle}</p>
          </FadeIn>
        </div>
      </div>

      <div className="about-body">
        <FadeIn>
          <div className="about-text-grid">
            <div className="about-lead">
              <p>{bioLead}</p>
            </div>
            <div className="about-detail">
              {(bioBody || []).map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </FadeIn>

        {infoBlocks && infoBlocks.length > 0 && (
          <FadeIn>
            <div className="about-info">
              {infoBlocks.map((d) => (
                <div key={d.label} className="about-info__block">
                  <div className="about-info__label">{d.label}</div>
                  <ul className="about-info__list">
                    {(d.items || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {showClients && (
          <FadeIn>
            <div className="about-clients">
              <div className="about-clients__label">{clientsLabel}</div>
              <div className="about-clients__list">
                {clients.map((c, i) => (
                  <span key={c} className="about-clients__name">
                    {c}
                    {i < clients.length - 1 && (
                      <span className="about-clients__dot">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {showPhilosophy && (
          <FadeIn>
            <div className="about-philosophy">
              <div className="about-philosophy__label">{philosophyLabel}</div>
              <p className="about-philosophy__quote">
                &ldquo;{philosophyQuote}&rdquo;
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
