import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "navigationItem" }),

    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Text shown in the navigation bar.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "page",
      title: "Page",
      type: "string",
      description: "Which page this links to.",
      options: {
        list: [
          { title: "Portfolio", value: "portfolio" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      description: "Hide this item without deleting it.",
      initialValue: true,
    }),
  ],

  preview: {
    select: { title: "label", page: "page", visible: "visible" },
    prepare({ title, page, visible }) {
      return {
        title: `${visible === false ? "🚫 " : ""}${title}`,
        subtitle: `→ ${page}`,
      };
    },
  },
});
