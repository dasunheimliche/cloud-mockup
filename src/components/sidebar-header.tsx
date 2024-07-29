"use client";

import { cn } from "@/lib/utils";
import useLangStore from "@/stores/lang-store";
import useStore from "@/stores/main-store";
import { IoMdClose } from "react-icons/io";
import t from "@/translations/dashboard/layout";
import Link from "next/link";
import { PiSoundcloudLogoDuotone } from "react-icons/pi";

export default function SidebarHeader() {
  const { toggleMobileSidebar } = useStore();

  const { language } = useLangStore();

  return (
    <div
      className={cn(
        "flex justify-start items-center h-24 pl-9 text-[#ffffffd7]"
      )}
    >
      <Link href="/home">
        <div className="flex justify-center mx-auto relative">
          <div className="relative w-[2.25rem] sm:h-8 flex flex-col items-center">
            <img
              className="object-cover"
              src="/imgs/eva-white.png"
              alt="Logo"
            />
            <div className="absolute bg-opacity-0 rounded-full -right-5 opacity-90 bottom-[0.1rem] text-[0.55rem] font-light text-[#ffffff]">
              <PiSoundcloudLogoDuotone className="text-[1.25rem] font-semibold" />
            </div>
          </div>
        </div>
      </Link>

      <div className={cn("ml-5", "ml-12")}>
        <h1 className={cn("text-[0.8rem] max-sm:text-[0.9rem] uppercase")}>
          {t.headerTitle[language] || "Control Manager"}
        </h1>

        <h2
          className={cn(
            "text-[0.6rem] tracking-wide max-sm:text-[0.7rem] font-extralight"
          )}
        >
          {"EVA DASHBOARD"}
        </h2>
      </div>
      <IoMdClose
        size={"2rem"}
        className="absolute right-0 top-0 mr-8 mt-8 sm:hidden cursor-pointer"
        onClick={toggleMobileSidebar}
      />
    </div>
  );
}
