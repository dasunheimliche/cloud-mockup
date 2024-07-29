"use client";

import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentProps<"button"> {
  glowingBorder?: boolean;
  glowing: boolean;
  children: React.ReactNode;
}

export default function GlowingButton({
  children,
  className,
  glowing = false,
  glowingBorder = false,
  ...props
}: CustomButtonProps) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden rounded-full p-[0px] group",
        glowingBorder ? "p-[1px]" : ""
      )}
    >
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] transition-all bg-[#ffffff15] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]",
          glowing
            ? "bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"
            : ""
        )}
      ></span>
      <button
        {...props}
        className={cn(
          "border-solid border border-white border-opacity-10 inline-flex h-full w-full cursor-pointer justify-center items-center rounded-full  px-[1rem] py-1 text-[0.7rem] text-slate-50 font-bold  backdrop-blur-sm bg-[#020A17] hover:bg-[#1d232fd3]",
          className,
          glowing ? "bg-[#1d232f91]" : ""
        )}
      >
        {children}
      </button>
    </span>
  );
}
