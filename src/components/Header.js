"use client";

import { useState, useEffect } from "react";

const DEFAULT_NAV = [
  { label: "Portfolio", page: "portfolio" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Header({ page, setPage, navigation }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = navigation && navigation.length > 0 ? navigation : DEFAULT_NAV;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
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
        <a
          className="nav-logo"
          onClick={() => go("home")}
          role="button"
          tabIndex={0}
          aria-label="Go to homepage"
        >
          Ethan Cheng
        </a>
        <ul className="nav-links">
          {items.map((item) => (
            <li key={item.page}>
              <a onClick={() => go(item.page)}>{item.label}</a>
            </li>
          ))}
        </ul>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        {items.map((item) => (
          <a key={item.page} onClick={() => go(item.page)}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
