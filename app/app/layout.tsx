"use client";

import type { ReactNode } from "react";
import { PrototypeProvider } from "@/components/sapar-app/state";

export default function AppLayout({ children }: { readonly children: ReactNode }): ReactNode {
  return <PrototypeProvider>{children}</PrototypeProvider>;
}
