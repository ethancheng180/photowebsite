import { getProjects, getSiteSettings } from "@/lib/sanity";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import SiteClient from "../SiteClient";

export const revalidate = 60;

export default async function Home() {
  let projects;
  let settings = null;

  try {
    const [sanityProjects, sanitySettings] = await Promise.all([
      getProjects(),
      getSiteSettings(),
    ]);
    projects = sanityProjects.length > 0 ? sanityProjects : STATIC_PROJECTS;
    settings = sanitySettings;
  } catch {
    projects = STATIC_PROJECTS;
  }

  return <SiteClient projects={projects} settings={settings} />;
}
