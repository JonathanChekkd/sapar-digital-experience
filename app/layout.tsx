import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/900.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./sapar-app.css";
import "./sapar-gamification.css";
import "./sapar-fighter-world.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saparsport.com"),
  title: {
    default: "SAPAR — Train. Connect. Compete.",
    template: "%s · SAPAR",
  },
  description:
    "SAPAR is a mobile-first platform connecting Jiu-Jitsu practitioners, gyms, sessions, events, and progress in one community.",
  icons: {
    icon: "/brand/sapar-mark.svg",
    apple: "/brand/sapar-mark.svg",
  },
  openGraph: {
    title: "SAPAR — Train. Connect. Compete.",
    description:
      "One connected Jiu-Jitsu platform for fighters, gyms, events, and progress.",
    siteName: "SAPAR",
    type: "website",
    images: [
      {
        url: "/generated/sapar-event-key-art.png",
        width: 1672,
        height: 941,
        alt: "SAPAR Jiu-Jitsu event concept",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAPAR — Train. Connect. Compete.",
    description:
      "One connected Jiu-Jitsu platform for fighters, gyms, events, and progress.",
    images: ["/generated/sapar-event-key-art.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <template
          data-impeccable-direction="9c3a3594"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- IMPECCABLE_DIRECTION seed=9c3a3594; Matchday Fighter World; approved cartoon-first Passport benchmark; original anime-inspired adult fighters; cobalt arena materials with coral, gold, emerald, cyan, and violet route energy; semantic fighter metadata; separate Gi and No-Gi lanes; tactile mobile-first social navigation; authored one-shot motion; no copied game trade dress, casino cues, random rewards, government seals, or belt-rating conflation. -->",
          }}
        />
        {children}
      </body>
    </html>
  );
}
