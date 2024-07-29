"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useStore from "@/stores/main-store";

interface SidebarButtonProps {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, icon, href }) => {
  const { toggleMobileSidebar } = useStore();

  const pathname = usePathname();

  const isCurrentPage = (): boolean => {
    const normalizedPathname = pathname.replace(/^\/|\/$/g, "");
    const normalizedHref = href.replace(/^\/|\/$/g, "");
    return normalizedPathname === normalizedHref;
  };

  return (
    <Link
      href={href}
      className={cn(
        "group h-14 text-[#ffffff] max-sm:text-[#ffffffea] max-sm:h-16 relative transition-all flex items-center justify-start text-[0.8rem] pl-8 cursor-pointer hover:bg-[rgba(14,114,127,0.25)]",
        isCurrentPage() && "bg-[rgba(14,114,127,0.25)]"
      )}
      onClick={toggleMobileSidebar}
    >
      <div
        className={cn(
          "absolute h-full w-1 inset-0",
          isCurrentPage() && "bg-[rgba(14,114,127,1)]"
        )}
      />
      {icon}
      <p
        className={cn(
          "ml-4 font-semibold uppercase opacity-90 max-sm:text-xl max-sm:font-medium"
        )}
      >
        {label}
      </p>
    </Link>
  );
};

export default React.memo(SidebarButton);
