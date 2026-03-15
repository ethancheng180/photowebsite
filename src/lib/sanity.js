import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

const isSanityConfigured = !!projectId;

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source) {
  if (!builder) return null;
  return builder.image(source);
}

// Fetches all projects ordered by drag-and-drop rank.
// Returns data shaped to match the existing PROJECTS array contract.
// Returns empty array if Sanity is not configured.
export async function getProjects() {
  if (!client) return [];

  const query = `*[_type == "project"] | order(orderRank asc) {
    "id": slug.current,
    title,
    category,
    year,
    publication,
    description,
    concept,
    credits,
    "images": count(gallery),
    gradient,
    accent,
    featured,
    cover,
    gallery,
    orderRank
  }`;

  const raw = await client.fetch(query);

  return raw.map((p) => ({
    ...p,
    cover: p.cover ? urlFor(p.cover).width(1800).auto("format").quality(80).url() : null,
    gallery: (p.gallery || []).map((img) =>
      urlFor(img).width(1200).auto("format").quality(80).url()
    ),
  }));
}
