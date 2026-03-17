import FadeIn from "./FadeIn";

const DEFAULT_INTRO = "Selected editorial, campaign, and personal work — 2024–2026";

export default function PortfolioIntro({ portfolioSettings }) {
  const show = portfolioSettings?.showHero !== false;
  if (!show) return null;

  const introText = portfolioSettings?.introText || DEFAULT_INTRO;

  return (
    <div className="portfolio-intro">
      <div className="portfolio-intro__inner">
        <FadeIn>
          <h1 className="portfolio-intro__title">Portfolio</h1>
          <p className="portfolio-intro__subtitle">{introText}</p>
        </FadeIn>
      </div>
    </div>
  );
}
