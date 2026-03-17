import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import {
  NAVIGATION_QUERY,
  CATEGORIES_QUERY,
  PORTFOLIO_PAGE_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

const isSanityConfigured = !!projectId;

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source) {
  if (!builder) return null;
  return builder.image(source);
}

export async function getNavigation() {
  if (!client) return [];
  return client.fetch(NAVIGATION_QUERY);
}

export async function getCategories() {
  if (!client) return [];
  return client.fetch(CATEGORIES_QUERY);
}

export async function getPortfolioSettings() {
  if (!client) return null;
  return client.fetch(PORTFOLIO_PAGE_QUERY);
}

export async function getSiteSettings() {
  if (!client) return null;
  return client.fetch(SITE_SETTINGS_QUERY);
}

export async function getProjects() {
  if (!client) return [];
  const raw = await client.fetch(PROJECTS_QUERY);
  return raw.map((p) => ({
    ...p,
    cover: p.cover
      ? urlFor(p.cover).width(1800).auto("format").quality(80).url()
      : null,
    gallery: (p.gallery || []).map((img) =>
      urlFor(img).width(1200).auto("format").quality(80).url()
    ),
  }));
}
