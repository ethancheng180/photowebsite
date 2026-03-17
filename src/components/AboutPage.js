import FadeIn from "./FadeIn";
import { CLIENTS } from "@/data/projects";

const BIO_SECTIONS = [
  "Ethan Cheng is a fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan. His work sits at the intersection of editorial precision and personal observation — images that feel both composed and candid, controlled and alive.",
];

const BIO_BODY = [
  "Cheng's approach to fashion photography is rooted in restraint. He treats each project as a short film told through still frames — prioritizing atmosphere, gesture, and the quality of light over excessive styling or post-production intervention.",
  "Before focusing exclusively on fashion, he spent several years working across documentary and fine art photography, which continues to inform his editorial work with a sense of honesty and narrative depth that distinguishes his images from conventional fashion output.",
  "His recent work includes editorial commissions for European and American fashion publications, campaign imagery for luxury maisons, beauty stories with a natural-light philosophy, and an ongoing personal project documenting new faces during fashion weeks in Milan and Paris.",
  "He is drawn to the moments between the moments — the space after the show, the silence before a sitting, the thirty seconds when a model stops performing and something real appears. That territory, where fashion meets vulnerability, is where his strongest images live.",
];

const INFO_BLOCKS = [
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
];

export default function AboutPage({ setPage }) {
  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero__inner">
          <FadeIn>
            <h1 className="about-hero__title">Ethan Cheng</h1>
            <p className="about-hero__subtitle">
              Fashion & Editorial Photographer — Los Angeles
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="about-body">
        {/* Bio */}
        <FadeIn>
          <div className="about-text-grid">
            <div className="about-lead">
              {BIO_SECTIONS.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
            <div className="about-detail">
              {BIO_BODY.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Info blocks */}
        <FadeIn>
          <div className="about-info">
            {INFO_BLOCKS.map((d) => (
              <div key={d.label} className="about-info__block">
                <div className="about-info__label">{d.label}</div>
                <ul className="about-info__list">
                  {d.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Clients */}
        <FadeIn>
          <div className="about-clients">
            <div className="about-clients__label">
              Selected Clients & Publications
            </div>
            <div className="about-clients__list">
              {CLIENTS.map((c, i) => (
                <span key={c} className="about-clients__name">
                  {c}
                  {i < CLIENTS.length - 1 && (
                    <span className="about-clients__dot">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Philosophy */}
        <FadeIn>
          <div className="about-philosophy">
            <div className="about-philosophy__label">Philosophy</div>
            <p className="about-philosophy__quote">
              &ldquo;The best fashion images don&rsquo;t sell clothes. They sell a
              feeling — of being seen, of belonging, of wanting to be inside that
              frame. My job is to create that frame and then get out of its
              way.&rdquo;
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
