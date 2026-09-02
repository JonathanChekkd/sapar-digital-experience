import type { Metadata } from "next";
import { DemoExperience } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Investor Product Tour",
  description: "A guided walkthrough of the SAPAR product concept and proof-gated technology roadmap.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoExperience />;
}
