import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "category" }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Editorial", "Campaign", "Beauty"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      description: "Hide this category from the portfolio filter tabs.",
      initialValue: true,
    }),
  ],

  preview: {
    select: { title: "title", visible: "visible" },
    prepare({ title, visible }) {
      return {
        title: `${visible === false ? "🚫 " : ""}${title}`,
        subtitle: visible === false ? "Hidden" : "Visible",
      };
    },
  },
});
