import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "portfolio", title: "Portfolio" },
    { name: "quote", title: "Quote" },
    { name: "clients", title: "Clients" },
    { name: "feature", title: "Featured Article" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // ─── HERO ────────────────────────────────────────
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      group: "hero",
      description: "Small text above the headline. e.g. \"Fashion · Editorial · Campaign\"",
      initialValue: "Fashion · Editorial · Campaign",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "text",
      group: "hero",
      rows: 2,
      description: "The large headline on the homepage hero. Use a line break for two lines.",
      initialValue: "The image is the\nfirst conversation.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      group: "hero",
      rows: 2,
      description: "Supporting text below the headline.",
      initialValue:
        "Fashion photography rooted in editorial intelligence, visual discipline, and a deep respect for the craft of image-making.",
    }),

    // ─── PORTFOLIO FILTERS ─────────────────────────────
    defineField({
      name: "portfolioFilters",
      title: "Portfolio Filter Tabs",
      type: "array",
      group: "portfolio",
      description:
        'Drag to reorder. Each entry becomes a filter tab on the Portfolio page. "All" is always shown first automatically — do not add it here. The names must exactly match the Category values you assign to projects.',
      of: [{ type: "string" }],
      initialValue: ["Editorial", "Campaign", "Beauty", "Portraits", "Celebrity"],
    }),

    // ─── QUOTE ───────────────────────────────────────
    defineField({
      name: "showQuote",
      title: "Show Quote Section",
      type: "boolean",
      group: "quote",
      description: "Toggle the editorial quote section on or off.",
      initialValue: true,
    }),
    defineField({
      name: "quoteText",
      title: "Quote",
      type: "text",
      group: "quote",
      rows: 3,
      description: "The pull quote displayed below the hero.",
      initialValue:
        "I photograph the space between the performance and the person. That's where fashion becomes interesting.",
    }),
    defineField({
      name: "quoteAttribution",
      title: "Attribution",
      type: "string",
      group: "quote",
      description: "Who said it.",
      initialValue: "Ethan Cheng",
    }),

    // ─── CLIENTS ─────────────────────────────────────
    defineField({
      name: "showClients",
      title: "Show Clients Strip",
      type: "boolean",
      group: "clients",
      description: "Toggle the clients/publications strip on or off.",
      initialValue: true,
    }),
    defineField({
      name: "clients",
      title: "Clients & Publications",
      type: "array",
      group: "clients",
      description: "Drag to reorder. These appear as an editorial strip on the homepage.",
      of: [{ type: "string" }],
    }),

    // ─── FEATURED ARTICLE ────────────────────────────
    defineField({
      name: "showFeature",
      title: "Show Featured Article",
      type: "boolean",
      group: "feature",
      description: "Toggle the featured article section on or off.",
      initialValue: true,
    }),
    defineField({
      name: "featureLabel",
      title: "Section Label",
      type: "string",
      group: "feature",
      description: 'e.g. "Featured In"',
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
      description: 'e.g. "Issue 198 · Can\'t Let Go"',
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
      description: "Role / Name pairs shown on the card.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
          ],
          preview: {
            select: { title: "role", subtitle: "name" },
          },
        },
      ],
    }),
    defineField({
      name: "featureUrl",
      title: "Link URL",
      type: "url",
      group: "feature",
      description: "External link to the article.",
      initialValue: "https://www.flaunt.com/post/lukas-gage-cant-let-go-issue",
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
      description: "Toggle the call-to-action section on or off.",
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
