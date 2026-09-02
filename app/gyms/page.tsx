import type { Metadata } from "next";
import { AudienceExperience } from "@/components/marketing";

export const metadata: Metadata = {
  title: "For Gyms",
  description: "Publish mat time, host activity, and build a connected Jiu-Jitsu community with SAPAR.",
};

export default function GymsPage() {
  return <AudienceExperience audience="gyms" />;
}
