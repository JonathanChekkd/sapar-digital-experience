import type { Metadata } from "next";
import { VisionExperience } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Technology Roadmap",
  description: "How SAPAR sequences a feasible core platform, a trusted data flywheel, assistive AI, and body-tracking research.",
};

export default function VisionPage() {
  return <VisionExperience />;
}
