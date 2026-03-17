"use client";

import { useState } from "react";
import PortfolioIntro from "./PortfolioIntro";
import PortfolioFilters from "./PortfolioFilters";
import ProjectGrid from "./ProjectGrid";
import FadeIn from "./FadeIn";

export default function PortfolioPage({
  projects,
  categories,
  portfolioSettings,
}) {
  const defaultCat = portfolioSettings?.defaultCategory || "All";
  const [filter, setFilter] = useState(defaultCat);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const sortMode = portfolioSettings?.sortMode || "manual";
  const sorted = [...filtered];
  if (sortMode === "newest")
    sorted.sort((a, b) =>
      String(b.year || "").localeCompare(String(a.year || ""))
    );
  if (sortMode === "oldest")
    sorted.sort((a, b) =>
      String(a.year || "").localeCompare(String(b.year || ""))
    );

  const gridMode = portfolioSettings?.gridMode || "editorial";

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
          <ProjectGrid projects={sorted} gridMode={gridMode} />
        </FadeIn>
      </div>
    </div>
  );
}
