import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project" }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Editorial", value: "Editorial" },
          { title: "Campaign", value: "Campaign" },
          { title: "Beauty", value: "Beauty" },
          { title: "Portraits", value: "Portraits" },
          { title: "Celebrity", value: "Celebrity" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),

    defineField({
      name: "publication",
      title: "Publication",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "concept",
      title: "Concept",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "gallery",
      title: "Gallery Images",
      description: "Drag to reorder images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: "credits",
      title: "Credits",
      type: "object",
      fields: [
        defineField({ name: "photographer", title: "Photographer", type: "string" }),
        defineField({ name: "model", title: "Model", type: "string" }),
        defineField({ name: "stylist", title: "Stylist", type: "string" }),
        defineField({ name: "hair", title: "Hair", type: "string" }),
        defineField({ name: "makeup", title: "Makeup", type: "string" }),
        defineField({ name: "creative", title: "Creative Direction", type: "string" }),
        defineField({ name: "casting", title: "Casting", type: "string" }),
      ],
    }),

    defineField({
      name: "gradient",
      title: "Gradient (CSS)",
      description: "Fallback gradient for placeholders, e.g. linear-gradient(165deg, #1a1a2e 0%, #0f3460 100%)",
      type: "string",
    }),

    defineField({
      name: "accent",
      title: "Accent Color",
      description: "Hex color for placeholder accents, e.g. #c4b5a0",
      type: "string",
    }),

    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "publication",
      media: "cover",
    },
  },
});
