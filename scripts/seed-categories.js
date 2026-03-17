import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01" }).withConfig({
  dataset: "production",
});

const CATEGORIES = [
  { _id: "category-editorial", title: "Editorial", slug: "editorial", order: 1 },
  { _id: "category-campaign", title: "Campaign", slug: "campaign", order: 2 },
  { _id: "category-beauty", title: "Beauty", slug: "beauty", order: 3 },
  { _id: "category-portraits", title: "Portraits", slug: "portraits", order: 4 },
  { _id: "category-celebrity", title: "Celebrity", slug: "celebrity", order: 5 },
];

async function run() {
  console.log("Creating category documents...\n");

  const tx = client.transaction();

  for (const cat of CATEGORIES) {
    tx.createOrReplace({
      _id: cat._id,
      _type: "category",
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
      visible: true,
      orderRank: String(cat.order).padStart(6, "0"),
    });
    console.log(`  + ${cat.title} (${cat._id})`);
  }

  await tx.commit();
  console.log("\nCategories created.\n");

  console.log("Migrating project category fields from strings to references...\n");

  const categoryMap = {};
  for (const cat of CATEGORIES) {
    categoryMap[cat.title] = cat._id;
  }

  const projects = await client.fetch(
    `*[_type == "project" && defined(category) && !defined(category._ref)]{ _id, title, category }`
  );

  if (projects.length === 0) {
    console.log("  No projects need migration.\n");
  } else {
    const migrateTx = client.transaction();

    for (const proj of projects) {
      const catId = categoryMap[proj.category];
      if (catId) {
        migrateTx.patch(proj._id, (p) =>
          p
            .set({
              category: { _type: "reference", _ref: catId },
              categoryFallback: proj.category,
            })
        );
        console.log(`  ~ ${proj.title}: "${proj.category}" → ref:${catId}`);
      } else {
        console.log(`  ! ${proj.title}: "${proj.category}" — no matching category, setting fallback only`);
        migrateTx.patch(proj._id, (p) =>
          p.set({ categoryFallback: proj.category })
        );
      }
    }

    await migrateTx.commit();
    console.log("\nProject migration complete.\n");
  }

  const verify = await client.fetch(
    `*[_type == "category"] | order(orderRank asc) { _id, title, "slug": slug.current, visible }`
  );
  console.log("Verification — categories in CMS:");
  console.log(JSON.stringify(verify, null, 2));

  const verifyProjects = await client.fetch(
    `*[_type == "project"]{ _id, title, "cat": category->title, "fallback": categoryFallback }`
  );
  console.log("\nVerification — project categories:");
  console.log(JSON.stringify(verifyProjects, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
