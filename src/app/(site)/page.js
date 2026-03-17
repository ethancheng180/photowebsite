import {
  getProjects,
  getSiteSettings,
  getNavigation,
  getCategories,
  getPortfolioSettings,
} from "@/lib/sanity";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import SiteClient from "../SiteClient";

export const revalidate = 60;

export default async function Home() {
  let projects;
  let settings = null;
  let navigation = [];
  let categories = [];
  let portfolioSettings = null;

  try {
    const [
      sanityProjects,
      sanitySettings,
      sanityNav,
      sanityCategories,
      sanityPortfolio,
    ] = await Promise.all([
      getProjects(),
      getSiteSettings(),
      getNavigation(),
      getCategories(),
      getPortfolioSettings(),
    ]);

    projects = sanityProjects.length > 0 ? sanityProjects : STATIC_PROJECTS;
    settings = sanitySettings;
    navigation = sanityNav || [];
    categories = sanityCategories || [];
    portfolioSettings = sanityPortfolio;
  } catch {
    projects = STATIC_PROJECTS;
  }

  return (
    <SiteClient
      projects={projects}
      settings={settings}
      navigation={navigation}
      categories={categories}
      portfolioSettings={portfolioSettings}
    />
  );
}
