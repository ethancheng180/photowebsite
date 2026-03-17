import { getContactPage } from "@/lib/sanity";
import ContactPage from "@/components/ContactPage";

export const revalidate = 60;

export const metadata = {
  title: "Contact — Ethan Cheng",
  description:
    "Commission inquiries, collaboration requests, and representation conversations.",
};

export default async function ContactRoute() {
  let contactData;
  try {
    contactData = await getContactPage();
  } catch {
    contactData = null;
  }

  return <ContactPage contactData={contactData} />;
}
