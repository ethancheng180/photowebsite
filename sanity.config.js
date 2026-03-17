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
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .icon(() => "⚙")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
            S.divider(),

            S.listItem()
              .title("Pages")
              .icon(() => "◻")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Portfolio Page")
                      .child(
                        S.document()
                          .schemaType("portfolioPage")
                          .documentId("portfolioPage")
                          .title("Portfolio Page")
                      ),
                    S.listItem()
                      .title("About Page")
                      .child(
                        S.document()
                          .schemaType("aboutPage")
                          .documentId("aboutPage")
                          .title("About Page")
                      ),
                    S.listItem()
                      .title("Contact Page")
                      .child(
                        S.document()
                          .schemaType("contactPage")
                          .documentId("contactPage")
                          .title("Contact Page")
                      ),
                  ])
              ),
            S.divider(),

            orderableDocumentListDeskItem({
              type: "navigationItem",
              title: "Navigation",
              icon: () => "☰",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "category",
              title: "Categories",
              icon: () => "▦",
              S,
              context,
            }),
            S.divider(),

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
