"use client";

import SidebarHeader from "./sidebar-header";
import SidebarButton from "./sidebar-button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import useStore from "@/stores/main-store";
import SidebarProfile from "./sidebar-profile";
import useAuth from "@/hooks/useAuth";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/dashboard/layout";
import { TopSidebarButtons, BottomSidebarButtons } from "@/lib/sidebarConfig";

export default function Sidebar() {
  const { user } = useAuth();
  const { language } = useLangStore();
  const { isMobileSidebarVisible } = useStore();

  const userRole = user?.role || "guest";

  const isButtonVisible = (roles: string[]) =>
    roles.includes("all") || roles.includes(userRole);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[rgb(7,57,64)] to-[rgb(0,0,0)] text-white min-w-72 h-full select-none flex flex-col max-sm:hidden",
        isMobileSidebarVisible &&
          "max-sm:flex max-sm:absolute max-sm:inset-0 max-sm:z-10"
      )}
      style={{
        background: "linear-gradient(rgb(7, 57, 64) 10%, rgb(0, 0, 0) 89%)",
      }}
    >
      <div className="flex flex-col h-[100svh] relative">
        <div className="grow">
          <SidebarHeader />
          <Separator className="opacity-15 relative w-[90%] left-[5%] mb-4" />
          {TopSidebarButtons.map(
            (button) =>
              isButtonVisible(button.roles) && (
                <SidebarButton
                  key={button.key}
                  href={button.href}
                  label={t[button.labelKey][language] || button.labelKey}
                  icon={button.icon}
                />
              )
          )}
        </div>
        <div className="h-auto font-extralight text-[0.6rem] text-center absolute bottom-10 w-full">
          {BottomSidebarButtons.map(
            (button) =>
              isButtonVisible(button.roles) && (
                <SidebarButton
                  key={button.key}
                  href={button.href}
                  label={t[button.labelKey][language] || button.labelKey}
                  icon={button.icon}
                />
              )
          )}
          <SidebarProfile />
        </div>
      </div>
    </div>
  );
}
