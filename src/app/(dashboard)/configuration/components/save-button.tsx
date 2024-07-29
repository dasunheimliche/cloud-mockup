"use client";

import { cn } from "@/lib/utils";
import { FaSave } from "react-icons/fa";
import t from "@/translations/others";
import useLangStore from "@/stores/lang-store";

export default function SaveButton({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) {
  const { language } = useLangStore();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        " font-bold flex justify-center items-center h-10 w-[7rem]  text-[0.7rem] cursor-pointer text-slate-50 bg-[#0b2019] hover:bg-[#ffffff1c] transition-all border-solid bg-opacity-10 border border-white border-opacity-10 rounded-[2rem] backdrop-blur-sm",
        isLoading
          ? "opacity-35 cursor-not-allowed hover:bg-[#ffffff1c] bg-[#ffffff1c] hover:text-zinc-950"
          : ""
      )}
    >
      {!isLoading && <FaSave size={"1rem"} />}
      {!isLoading && (
        <p className="ml-[0.5rem]">{t.save[language] || "SAVE"}</p>
      )}
      {isLoading && <div className="loader"></div>}
    </button>
  );
}
