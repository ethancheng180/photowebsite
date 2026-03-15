export const metadata = {
  title: "Ethan Cheng — Fashion & Editorial Photography",
  description:
    "Fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan.",
  metadataBase: new URL("https://photowebsite-ntlp.vercel.app"),
  openGraph: {
    title: "Ethan Cheng — Fashion & Editorial Photography",
    description:
      "Fashion and editorial photographer based in Los Angeles, working across New York, Paris, and Milan.",
    type: "website",
    locale: "en_US",
    siteName: "Ethan Cheng Photography",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Cheng — Fashion & Editorial Photography",
    description:
      "Fashion and editorial photographer based in Los Angeles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141210",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
