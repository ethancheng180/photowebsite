import "../globals.css";
import { getNavigation, getSiteSettings } from "@/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function SiteLayout({ children }) {
  const [navigation, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
  ]);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header navigation={navigation} settings={settings} />
      <main>{children}</main>
      <Footer navigation={navigation} settings={settings} />
    </>
  );
}
