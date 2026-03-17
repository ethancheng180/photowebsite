"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schema } from "./src/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c9b1dgww";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "ethan-cheng-portfolio",
  title: "Ethan Cheng — Portfolio CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Portfolio")
          .items([
            // ─── Singleton: Site Settings ──────────────
            S.listItem()
              .title("Site Settings")
              .icon(() => "⚙")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),

            // ─── Singleton: Portfolio Page ─────────────
            S.listItem()
              .title("Portfolio Page")
              .icon(() => "◻")
              .child(
                S.document()
                  .schemaType("portfolioPage")
                  .documentId("portfolioPage")
                  .title("Portfolio Page Settings")
              ),

            S.divider(),

            // ─── Orderable: Navigation ─────────────────
            orderableDocumentListDeskItem({
              type: "navigationItem",
              title: "Navigation",
              icon: () => "☰",
              S,
              context,
            }),

            // ─── Orderable: Categories ─────────────────
            orderableDocumentListDeskItem({
              type: "category",
              title: "Categories",
              icon: () => "▦",
              S,
              context,
            }),

            S.divider(),

            // ─── Orderable: Projects ───────────────────
            orderableDocumentListDeskItem({
              type: "project",
              title: "Projects",
              icon: () => "◼",
              S,
              context,
            }),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema,
});
