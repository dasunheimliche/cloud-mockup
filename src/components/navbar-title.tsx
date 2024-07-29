"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/metrics": "Metrics",
  "/interactions": "En. Interaction",
  "/history": "Request history",
};

export default function NavbarTitle() {
  const path: string = usePathname();

  return <p className="navSelectedText">{titles[path]}</p>;
}
