export const metadata = {
  title: "Ethan Cheng — Fashion & Editorial Photography",
  description:
    "Fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan.",
  openGraph: {
    title: "Ethan Cheng — Fashion & Editorial Photography",
    description:
      "Fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
