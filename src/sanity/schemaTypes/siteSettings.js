import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "quote", title: "Quote" },
    { name: "clients", title: "Clients" },
    { name: "feature", title: "Featured Article" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // ─── IDENTITY ─────────────────────────────────────
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "identity",
      description: "Shown in the navigation bar and footer.",
      initialValue: "Ethan Cheng",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "identity",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
            }),
            defineField({
              name: "label",
              title: "Display Label",
              type: "string",
              description: "Text shown on the site. Defaults to platform name.",
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "footerLocations",
      title: "Footer Locations",
      type: "string",
      group: "identity",
      initialValue: "Los Angeles · New York · Paris · Milan",
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer Copyright",
      type: "string",
      group: "identity",
      description: "Use {year} for the current year.",
      initialValue: "© {year} Ethan Cheng. All rights reserved.",
    }),

    // ─── HERO ────────────────────────────────────────
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      group: "hero",
      initialValue: "Fashion · Editorial · Campaign",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "text",
      group: "hero",
      rows: 2,
      initialValue: "The image is the\nfirst conversation.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      group: "hero",
      rows: 2,
      initialValue:
        "Fashion photography rooted in editorial intelligence, visual discipline, and a deep respect for the craft of image-making.",
    }),

    // ─── QUOTE ───────────────────────────────────────
    defineField({
      name: "showQuote",
      title: "Show Quote Section",
      type: "boolean",
      group: "quote",
      initialValue: true,
    }),
    defineField({
      name: "quoteText",
      title: "Quote",
      type: "text",
      group: "quote",
      rows: 3,
      initialValue:
        "I photograph the space between the performance and the person. That's where fashion becomes interesting.",
    }),
    defineField({
      name: "quoteAttribution",
      title: "Attribution",
      type: "string",
      group: "quote",
      initialValue: "Ethan Cheng",
    }),

    // ─── CLIENTS ─────────────────────────────────────
    defineField({
      name: "showClients",
      title: "Show Clients Strip",
      type: "boolean",
      group: "clients",
      initialValue: true,
    }),
    defineField({
      name: "clients",
      title: "Clients & Publications",
      type: "array",
      group: "clients",
      of: [{ type: "string" }],
    }),

    // ─── FEATURED ARTICLE ────────────────────────────
    defineField({
      name: "showFeature",
      title: "Show Featured Article",
      type: "boolean",
      group: "feature",
      initialValue: true,
    }),
    defineField({
      name: "featureLabel",
      title: "Section Label",
      type: "string",
      group: "feature",
      initialValue: "Featured In",
    }),
    defineField({
      name: "featureTitle",
      title: "Publication Name",
      type: "string",
      group: "feature",
      initialValue: "Flaunt Magazine",
    }),
    defineField({
      name: "featureIssue",
      title: "Issue / Subtitle",
      type: "string",
      group: "feature",
      initialValue: "Issue 198 · Can't Let Go",
    }),
    defineField({
      name: "featureHeadline",
      title: "Article Headline",
      type: "string",
      group: "feature",
      initialValue: "Lukas Gage — Nothing So Sweet As Humility",
    }),
    defineField({
      name: "featureDescription",
      title: "Description",
      type: "text",
      group: "feature",
      rows: 3,
      initialValue:
        "Published in Flaunt Magazine. Photographed by Ollie Ali, styled by Christopher Campbell. Ethan Cheng — 2nd Assistant Photographer.",
    }),
    defineField({
      name: "featureCredits",
      title: "Credits",
      type: "array",
      group: "feature",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
          ],
          preview: { select: { title: "role", subtitle: "name" } },
        },
      ],
    }),
    defineField({
      name: "featureUrl",
      title: "Link URL",
      type: "url",
      group: "feature",
      initialValue: "https://www.flaunt.com/post/lukas-gage-cant-let-go-issue",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "featureLinkText",
      title: "Link Label",
      type: "string",
      group: "feature",
      initialValue: "Read on Flaunt →",
    }),

    // ─── CTA ─────────────────────────────────────────
    defineField({
      name: "showCta",
      title: "Show CTA Section",
      type: "boolean",
      group: "cta",
      initialValue: true,
    }),
    defineField({
      name: "ctaLabel",
      title: "Section Label",
      type: "string",
      group: "cta",
      initialValue: "Inquiries",
    }),
    defineField({
      name: "ctaTitle",
      title: "Headline",
      type: "text",
      group: "cta",
      rows: 2,
      initialValue: "Let's create something\nworth remembering.",
    }),
    defineField({
      name: "ctaBody",
      title: "Body Text",
      type: "text",
      group: "cta",
      rows: 3,
      initialValue:
        "Available for editorial commissions, campaign work, beauty stories, and select brand collaborations worldwide.",
    }),
    defineField({
      name: "ctaButtonText",
      title: "Button Text",
      type: "string",
      group: "cta",
      initialValue: "Get in Touch",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
