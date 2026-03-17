"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DEFAULT_NAV = [
  { label: "Portfolio", page: "portfolio" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Header({ navigation, settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const items = navigation && navigation.length > 0 ? navigation : DEFAULT_NAV;
  const siteName = settings?.siteName || "Ethan Cheng";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const hrefFor = (page) => {
    if (page === "home") return "/";
    return `/${page}`;
  };

  const isActive = (page) => {
    if (page === "portfolio") return pathname.startsWith("/portfolio");
    return pathname === `/${page}`;
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="nav-logo" aria-label="Go to homepage">
          {siteName}
        </Link>
        <ul className="nav-links">
          {items.map((item) => (
            <li key={item.page}>
              <Link
                href={hrefFor(item.page)}
                className={isActive(item.page) ? "active" : ""}
              >
                {item.label}
              </Link>
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

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        {items.map((item) => (
          <Link key={item.page} href={hrefFor(item.page)}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
