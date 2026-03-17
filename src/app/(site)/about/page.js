import { getAboutPage, getSiteSettings } from "@/lib/sanity";
import AboutPage from "@/components/AboutPage";

export const revalidate = 60;

export const metadata = {
  title: "About — Ethan Cheng",
  description:
    "Fashion and editorial photographer based in Los Angeles. Editorial precision meets personal observation.",
};

export default async function AboutRoute() {
  let aboutData, settings;
  try {
    [aboutData, settings] = await Promise.all([
      getAboutPage(),
      getSiteSettings(),
    ]);
  } catch {
    aboutData = null;
    settings = null;
  }

  return <AboutPage aboutData={aboutData} settings={settings} />;
}
