import Link from "next/link";

const DEFAULT_NAV = [
  { label: "Portfolio", page: "portfolio" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

const DEFAULT_SOCIAL = [
  {
    platform: "Instagram",
    url: "https://instagram.com/Ethan__cheng__",
    label: "Instagram",
  },
];

export default function Footer({ navigation, settings }) {
  const items = navigation && navigation.length > 0 ? navigation : DEFAULT_NAV;
  const siteName = settings?.siteName || "Ethan Cheng";
  const social = settings?.socialLinks?.length > 0
    ? settings.socialLinks
    : DEFAULT_SOCIAL;
  const locations = settings?.footerLocations || "Los Angeles · New York · Paris · Milan";
  const copyright = (settings?.footerCopyright || "© {year} Ethan Cheng. All rights reserved.")
    .replace("{year}", new Date().getFullYear());

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">{siteName}</div>
        <div className="footer-links">
          {items.map((item) => (
            <Link
              key={item.page}
              href={item.page === "home" ? "/" : `/${item.page}`}
              className="footer-link"
            >
              {item.label}
            </Link>
          ))}
          {social.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {s.label || s.platform}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-legal">
        {copyright}
        <span className="footer-locations">{locations}</span>
      </div>
    </footer>
  );
}
