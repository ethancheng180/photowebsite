import { getProjects } from "@/lib/sanity";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import SiteClient from "../SiteClient";

export const revalidate = 60;

export default async function Home() {
  let projects;

  try {
    const sanityProjects = await getProjects();
    projects = sanityProjects.length > 0 ? sanityProjects : STATIC_PROJECTS;
  } catch {
    projects = STATIC_PROJECTS;
  }

  return <SiteClient projects={projects} />;
}
