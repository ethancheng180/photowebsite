import { getProjects, getSiteSettings } from "@/lib/sanity";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import HomePage from "@/components/HomePage";

export const revalidate = 60;

export const metadata = {
  title: "Ethan Cheng — Fashion & Editorial Photography",
  description:
    "Fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan.",
};

export default async function HomeRoute() {
  let projects, settings;
  try {
    [projects, settings] = await Promise.all([
      getProjects(),
      getSiteSettings(),
    ]);
    if (!projects || projects.length === 0) projects = STATIC_PROJECTS;
  } catch {
    projects = STATIC_PROJECTS;
    settings = null;
  }

  return <HomePage projects={projects} settings={settings} />;
}
