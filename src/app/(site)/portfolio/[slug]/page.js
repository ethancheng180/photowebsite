import { getProject, getProjects } from "@/lib/sanity";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import ProjectPage from "@/components/ProjectPage";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  let slugs = [];
  try {
    const projects = await getProjects();
    slugs = projects.map((p) => ({ slug: p.id }));
  } catch {}
  const staticSlugs = STATIC_PROJECTS.map((p) => ({ slug: p.id }));
  const map = new Map();
  [...staticSlugs, ...slugs].forEach((s) => map.set(s.slug, s));
  return [...map.values()];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let project = await getProject(slug);
  if (!project) project = STATIC_PROJECTS.find((p) => p.id === slug);
  if (!project) return { title: "Project — Ethan Cheng" };
  return {
    title: `${project.title} — Ethan Cheng`,
    description: project.description || `${project.title} by Ethan Cheng.`,
    openGraph: {
      title: `${project.title} — Ethan Cheng`,
      description: project.description || `${project.title} by Ethan Cheng.`,
      type: "article",
    },
  };
}

export default async function ProjectRoute({ params }) {
  const { slug } = await params;
  let project = await getProject(slug);
  if (!project) project = STATIC_PROJECTS.find((p) => p.id === slug) || null;
  if (!project) notFound();

  return <ProjectPage project={project} />;
}
