import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "form", title: "Form Settings" },
  ],
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      group: "content",
      initialValue: "Inquiries",
    }),
    defineField({
      name: "contactItems",
      title: "Contact Details",
      type: "array",
      group: "content",
      description: "Each item appears as a labeled row on the contact page.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "General", "Instagram", "Based In"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Display Value",
              type: "string",
              description: "Text shown to the visitor.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Plain Text", value: "text" },
                  { title: "Email Link", value: "email" },
                  { title: "External Link", value: "link" },
                ],
              },
              initialValue: "text",
            }),
            defineField({
              name: "url",
              title: "URL / Email Address",
              type: "string",
              description:
                "For email type: the email address. For link type: the full URL (https://...). Ignored for plain text.",
              validation: (Rule) =>
                Rule.custom((val, context) => {
                  const type = context?.parent?.type;
                  if (type === "email" && val && !val.includes("@"))
                    return "Enter a valid email address.";
                  if (type === "link" && val && !val.startsWith("http"))
                    return 'URL should start with "http://" or "https://".';
                  return true;
                }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),

    defineField({
      name: "inquiryTypes",
      title: "Inquiry Types",
      type: "array",
      group: "form",
      description: "Options in the inquiry type dropdown.",
      of: [{ type: "string" }],
      initialValue: [
        "Editorial Commission",
        "Campaign / Lookbook",
        "Beauty Story",
        "Brand Collaboration",
        "Model Test",
        "Press / Media",
        "Representation",
        "Other",
      ],
    }),
    defineField({
      name: "formPlaceholder",
      title: "Message Placeholder",
      type: "string",
      group: "form",
      initialValue:
        "Tell me about your project, timeline, and vision.",
    }),
    defineField({
      name: "submitText",
      title: "Submit Button Text",
      type: "string",
      group: "form",
      initialValue: "Send Inquiry",
    }),
    defineField({
      name: "confirmationTitle",
      title: "Confirmation Title",
      type: "string",
      group: "form",
      initialValue: "Thank You",
    }),
    defineField({
      name: "confirmationText",
      title: "Confirmation Text",
      type: "text",
      group: "form",
      rows: 2,
      initialValue:
        "Your inquiry has been received. I'll respond within 48 hours.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
