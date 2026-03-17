import { getProjects, getCategories, getPortfolioSettings } from "@/lib/sanity";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import PortfolioPage from "@/components/PortfolioPage";

export const revalidate = 60;

export const metadata = {
  title: "Portfolio — Ethan Cheng",
  description:
    "Selected editorial, campaign, beauty, and personal work by Ethan Cheng.",
};

export default async function PortfolioRoute() {
  let projects, categories, portfolioSettings;
  try {
    [projects, categories, portfolioSettings] = await Promise.all([
      getProjects(),
      getCategories(),
      getPortfolioSettings(),
    ]);
    if (!projects || projects.length === 0) projects = STATIC_PROJECTS;
  } catch {
    projects = STATIC_PROJECTS;
    categories = [];
    portfolioSettings = null;
  }

  return (
    <PortfolioPage
      projects={projects}
      categories={categories || []}
      portfolioSettings={portfolioSettings}
    />
  );
}
