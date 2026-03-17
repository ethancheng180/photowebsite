const DEFAULT_NAV = [
  { label: "Portfolio", page: "portfolio" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Footer({ setPage, navigation }) {
  const items = navigation && navigation.length > 0 ? navigation : DEFAULT_NAV;

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">Ethan Cheng</div>
        <div className="footer-links">
          {items.map((item) => (
            <a key={item.page} onClick={() => go(item.page)} className="footer-link">
              {item.label}
            </a>
          ))}
          <a
            href="https://instagram.com/Ethan__cheng__"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="footer-legal">
        © 2026 Ethan Cheng. All rights reserved. Los Angeles · New York · Paris
        · Milan
      </div>
    </footer>
  );
}
