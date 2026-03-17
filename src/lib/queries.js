export const NAVIGATION_QUERY = `
  *[_type == "navigationItem" && visible != false] | order(orderRank asc) {
    "id": _id,
    label,
    page,
    orderRank
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category" && visible != false] | order(orderRank asc) {
    "id": _id,
    title,
    "slug": slug.current,
    orderRank
  }
`;

export const PORTFOLIO_PAGE_QUERY = `
  *[_type == "portfolioPage"][0] {
    introText,
    showHero,
    showCategoryTabs,
    defaultCategory,
    sortMode,
    gridMode
  }
`;

export const PROJECTS_QUERY = `
  *[_type == "project"] | order(orderRank asc) {
    "id": slug.current,
    title,
    "category": coalesce(category->title, categoryFallback, select(defined(category._ref) => null, category)),
    year,
    publication,
    description,
    concept,
    credits,
    "images": count(gallery),
    gradient,
    accent,
    featured,
    cover,
    gallery,
    orderRank
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    heroTagline,
    heroTitle,
    heroSubtitle,
    showQuote,
    quoteText,
    quoteAttribution,
    showClients,
    clients,
    showFeature,
    featureLabel,
    featureTitle,
    featureIssue,
    featureHeadline,
    featureDescription,
    featureCredits,
    featureUrl,
    featureLinkText,
    showCta,
    ctaLabel,
    ctaTitle,
    ctaBody,
    ctaButtonText
  }
`;
