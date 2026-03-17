import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display" },
  ],
  fields: [
    // ─── CONTENT ──────────────────────────────────────
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      group: "content",
      rows: 2,
      description: "Subtitle shown in the portfolio page header.",
      initialValue:
        "Selected editorial, campaign, and personal work — 2024–2026",
    }),

    defineField({
      name: "showHero",
      title: "Show Hero Section",
      type: "boolean",
      group: "content",
      description: "Toggle the dark header section on or off.",
      initialValue: true,
    }),

    // ─── DISPLAY ──────────────────────────────────────
    defineField({
      name: "showCategoryTabs",
      title: "Show Category Tabs",
      type: "boolean",
      group: "display",
      description: "Toggle the filter tabs on or off.",
      initialValue: true,
    }),

    defineField({
      name: "defaultCategory",
      title: "Default Category",
      type: "string",
      group: "display",
      description:
        'Category selected by default when the page loads. Must match a category title exactly, or leave empty for "All".',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true;
          if (val === "All") return true;
          return typeof val === "string" ? true : "Must be a category name.";
        }),
    }),

    defineField({
      name: "sortMode",
      title: "Sort Mode",
      type: "string",
      group: "display",
      options: {
        list: [
          { title: "Manual Order (drag in Projects)", value: "manual" },
          { title: "Newest First", value: "newest" },
          { title: "Oldest First", value: "oldest" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    }),

    defineField({
      name: "gridMode",
      title: "Grid Mode",
      type: "string",
      group: "display",
      options: {
        list: [
          { title: "Editorial (varied sizes)", value: "editorial" },
          { title: "Uniform Grid", value: "uniform" },
          { title: "Minimal (single column)", value: "minimal" },
        ],
        layout: "radio",
      },
      initialValue: "editorial",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Portfolio Page Settings" };
    },
  },
});
