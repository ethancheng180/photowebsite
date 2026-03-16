import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  groups: [
    { name: "essential", title: "Essential", default: true },
    { name: "editorial", title: "Editorial Copy" },
    { name: "images", title: "Images" },
    { name: "credits", title: "Credits" },
    { name: "display", title: "Display Settings" },
  ],
  fields: [
    orderRankField({ type: "project" }),

    // ─── ESSENTIAL ───────────────────────────────────
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      group: "essential",
      description: "The name of the shoot or project. Appears as the main headline.",
      validation: (Rule) => Rule.required().error("Every project needs a title."),
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "essential",
      description: "Auto-generated from title. Used internally — you rarely need to change this.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error('Click "Generate" to create the slug.'),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "essential",
      description: "Determines which filter tab this project appears under in the Portfolio page.",
      options: {
        list: [
          { title: "Editorial", value: "Editorial" },
          { title: "Campaign", value: "Campaign" },
          { title: "Beauty", value: "Beauty" },
          { title: "Portraits", value: "Portraits" },
          { title: "Celebrity", value: "Celebrity" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required().error("Pick a category so the project appears in the right filter."),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "essential",
      description: 'e.g. "2026" — shown next to the category label on cards and project pages.',
    }),

    defineField({
      name: "publication",
      title: "Publication / Client",
      type: "string",
      group: "essential",
      description: 'e.g. "Vogue France" or "Self-Published" — appears beneath the project title.',
    }),

    defineField({
      name: "featured",
      title: "Feature on Homepage",
      type: "boolean",
      group: "essential",
      description: 'Turn this on to show this project in the "Selected Work" grid on the homepage. The first featured project also sets the hero background image.',
      initialValue: false,
    }),

    // ─── EDITORIAL COPY ──────────────────────────────
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "editorial",
      rows: 3,
      description: "A short editorial summary (1–3 sentences). Displayed as the lead text on the project page, left column.",
    }),

    defineField({
      name: "concept",
      title: "Concept Note",
      type: "text",
      group: "editorial",
      rows: 3,
      description: "The creative concept or artistic intent. Displayed in the right column next to the description.",
    }),

    // ─── IMAGES ──────────────────────────────────────
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      group: "images",
      description: "The hero image for this project. Used on the project page header, homepage featured grid, and portfolio grid cards. Upload high-resolution (at least 2000px wide).",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().warning("Projects without a cover image will show a placeholder."),
    }),

    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      group: "images",
      description: "The editorial image sequence. Drag to reorder — the layout alternates automatically: full-width → side-by-side pair → centered portrait. Upload high-resolution images.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      options: {
        layout: "grid",
      },
    }),

    // ─── CREDITS ─────────────────────────────────────
    defineField({
      name: "credits",
      title: "Credits",
      type: "object",
      group: "credits",
      description: "The team behind this project. Leave any role blank to hide it from the site — only filled credits are displayed.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "photographer",
          title: "Photographer",
          type: "string",
          description: "Usually your name.",
        }),
        defineField({
          name: "model",
          title: "Model(s)",
          type: "string",
          description: 'e.g. "Léa Montclair" or "Various — New Faces"',
        }),
        defineField({
          name: "stylist",
          title: "Stylist",
          type: "string",
        }),
        defineField({
          name: "hair",
          title: "Hair",
          type: "string",
        }),
        defineField({
          name: "makeup",
          title: "Makeup",
          type: "string",
        }),
        defineField({
          name: "creative",
          title: "Creative Direction",
          type: "string",
        }),
        defineField({
          name: "casting",
          title: "Casting",
          type: "string",
        }),
      ],
    }),

    // ─── DISPLAY SETTINGS ────────────────────────────
    defineField({
      name: "gradient",
      title: "Fallback Gradient",
      type: "string",
      group: "display",
      description: "CSS gradient shown when no cover image is set. e.g. linear-gradient(165deg, #1a1a2e 0%, #0f3460 100%). You can usually leave this blank.",
    }),

    defineField({
      name: "accent",
      title: "Accent Color",
      type: "string",
      group: "display",
      description: "Hex color for placeholder accents, e.g. #c4b5a0. Optional.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      publication: "publication",
      category: "category",
      year: "year",
      featured: "featured",
      media: "cover",
    },
    prepare({ title, publication, category, year, featured, media }) {
      const parts = [category, year].filter(Boolean).join(" · ");
      const subtitle = [publication, parts].filter(Boolean).join(" — ");
      return {
        title: `${featured ? "★ " : ""}${title}`,
        subtitle,
        media,
      };
    },
  },
});
