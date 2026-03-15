export const metadata = {
  title: "CMS — Ethan Cheng Portfolio",
  description: "Content management studio",
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
