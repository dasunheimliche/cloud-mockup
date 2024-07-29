"use client";

import useStore from "@/stores/main-store";
import { VscMenu } from "react-icons/vsc";

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleMobileSidebar } = useStore();

  return (
    <div
      className="bg-gradient-to-r  from-[rgb(7,57,64)] flex gap-3 justify-start items-center to-[rgb(0,0,0)] min-h-24 p-6 shadow-none  mt-0  text-slate-100 w-full select-none"
      style={{
        background:
          "linear-gradient(to right, rgb(7, 57, 64) 10%, rgb(0, 0, 0) 89%)",
      }}
    >
      <VscMenu
        size={"2rem"}
        className="sm:hidden -translate-y-[0.1rem] cursor-pointer"
        onClick={toggleMobileSidebar}
      />
      <div className="flex flex-row justify-between items-center w-full">
        {children}
      </div>
    </div>
  );
}
