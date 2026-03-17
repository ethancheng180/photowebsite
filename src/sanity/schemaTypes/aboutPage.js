import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "bio", title: "Biography" },
    { name: "details", title: "Details" },
    { name: "philosophy", title: "Philosophy" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      initialValue: "Ethan Cheng",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      group: "hero",
      initialValue: "Fashion & Editorial Photographer — Los Angeles",
    }),

    defineField({
      name: "bioLead",
      title: "Lead Paragraph",
      type: "text",
      group: "bio",
      rows: 4,
      description: "The prominent introductory paragraph on the left.",
      initialValue:
        "Ethan Cheng is a fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan. His work sits at the intersection of editorial precision and personal observation — images that feel both composed and candid, controlled and alive.",
    }),
    defineField({
      name: "bioBody",
      title: "Body Paragraphs",
      type: "array",
      group: "bio",
      description: "The detailed biography paragraphs on the right.",
      of: [{ type: "text", rows: 4 }],
    }),

    defineField({
      name: "infoBlocks",
      title: "Info Blocks",
      type: "array",
      group: "details",
      description:
        "Structured info sections (Based, Working Cities, Specialties, etc.).",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),

    defineField({
      name: "showClients",
      title: "Show Clients Section",
      type: "boolean",
      group: "details",
      initialValue: true,
    }),
    defineField({
      name: "clientsLabel",
      title: "Clients Section Label",
      type: "string",
      group: "details",
      initialValue: "Selected Clients & Publications",
    }),
    defineField({
      name: "clients",
      title: "Clients List",
      type: "array",
      group: "details",
      description: "Override the client list from Site Settings for this page.",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "showPhilosophy",
      title: "Show Philosophy Section",
      type: "boolean",
      group: "philosophy",
      initialValue: true,
    }),
    defineField({
      name: "philosophyLabel",
      title: "Section Label",
      type: "string",
      group: "philosophy",
      initialValue: "Philosophy",
    }),
    defineField({
      name: "philosophyQuote",
      title: "Quote",
      type: "text",
      group: "philosophy",
      rows: 4,
      initialValue:
        "The best fashion images don't sell clothes. They sell a feeling — of being seen, of belonging, of wanting to be inside that frame. My job is to create that frame and then get out of its way.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
