import type { Metadata } from "next";
import { AudienceExperience } from "@/components/marketing";

export const metadata: Metadata = {
  title: "For Fighters",
  description: "Find mat time, connect with practitioners, and understand your Jiu-Jitsu progress with SAPAR.",
};

export default function FightersPage() {
  return <AudienceExperience audience="fighters" />;
}
