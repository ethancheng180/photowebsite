"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import PortfolioIntro from "@/components/PortfolioIntro";
import PortfolioFilters from "@/components/PortfolioFilters";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectPage from "@/components/ProjectPage";
import AboutPage from "@/components/AboutPage";
import ContactPage from "@/components/ContactPage";
import FadeIn from "@/components/FadeIn";

function PortfolioPage({
  projects,
  categories,
  portfolioSettings,
  setPage,
  setProject,
  navigation,
}) {
  const defaultCat = portfolioSettings?.defaultCategory || "All";
  const [filter, setFilter] = useState(defaultCat);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const sortMode = portfolioSettings?.sortMode || "manual";
  const sorted = [...filtered];
  if (sortMode === "newest") sorted.sort((a, b) => String(b.year || "").localeCompare(String(a.year || "")));
  if (sortMode === "oldest") sorted.sort((a, b) => String(a.year || "").localeCompare(String(b.year || "")));

  const gridMode = portfolioSettings?.gridMode || "editorial";

  const openProject = (p) => {
    setProject(p);
    setPage("project");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page-transition">
      <PortfolioIntro portfolioSettings={portfolioSettings} />
      <div className="section">
        <PortfolioFilters
          categories={categories}
          activeFilter={filter}
          onFilter={setFilter}
          visible={portfolioSettings?.showCategoryTabs !== false}
        />
        <FadeIn>
          <ProjectGrid
            projects={sorted}
            onSelect={openProject}
            gridMode={gridMode}
          />
        </FadeIn>
      </div>
      <Footer setPage={setPage} navigation={navigation} />
    </div>
  );
}

export default function SiteClient({
  projects,
  settings,
  navigation,
  categories,
  portfolioSettings,
}) {
  const [page, setPage] = useState("home");
  const [project, setProject] = useState(null);

  return (
    <>
      <div className="noise-overlay" />
      <Header page={page} setPage={setPage} navigation={navigation} />

      {page === "home" && (
        <HomePage
          projects={projects}
          settings={settings}
          setPage={setPage}
          setProject={setProject}
        />
      )}

      {page === "portfolio" && (
        <PortfolioPage
          projects={projects}
          categories={categories}
          portfolioSettings={portfolioSettings}
          setPage={setPage}
          setProject={setProject}
          navigation={navigation}
        />
      )}

      {page === "project" && (
        <ProjectPage project={project} setPage={setPage} />
      )}

      {page === "about" && <AboutPage setPage={setPage} />}

      {page === "contact" && <ContactPage setPage={setPage} />}

      {page !== "portfolio" && (
        <Footer setPage={setPage} navigation={navigation} />
      )}
    </>
  );
}
