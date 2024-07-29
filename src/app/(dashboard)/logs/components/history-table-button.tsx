"use client";

import { cn } from "@/lib/utils";

export default function HistoryTableButton({
  onClick,
  pressed,
}: {
  onClick: any;
  pressed: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        " relative w-[7rem] gap-1 font-bold flex justify-between items-center  hover:bg-[#d8e0d7] h-10 px-[1rem] text-[0.7rem] cursor-pointer     text-slate-50 bg-[#0b2019] hover:bg-[#ffffff1c] transition-all border-solid bg-opacity-10 border border-white border-opacity-10 rounded-[2rem] backdrop-blur-sm"
      )}
    >
      <p>OCPP</p>
      {pressed && (
        <div className={cn("bg-[#236e2d] w-3 h-3 opacity-100 rounded-full")} />
      )}
      {!pressed && (
        <div
          className={cn("bg-[#7e7e7e85] w-3 h-3 opacity-100 rounded-full")}
        />
      )}
    </div>
  );
}
