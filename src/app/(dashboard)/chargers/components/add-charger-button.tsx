"use client";

import { GoPlus } from "react-icons/go";
import t from "@/translations/chargers";
import useLangStore from "@/stores/lang-store";
import { Button } from "@/components/ui/button";

export default function AddChargerButton({ onClick }: { onClick: any }) {
  const { language } = useLangStore();
  return (
    <Button
      onClick={onClick}
      className="font-bold flex justify-center items-center hover:bg-[#d8e0d7] h-10 px-[1rem] text-[0.7rem] cursor-pointer text-slate-50 bg-[#0b2019] hover:bg-[#ffffff1c] transition-all bg-opacity-10 border-solid border border-white border-opacity-10 rounded-[2rem] backdrop-blur-sm"
    >
      <GoPlus className="text-slate-50 text-[1.3rem]" />
      <p className="ml-[0.5rem]">{t.addCharger[language] || "ADD A CHARGER"}</p>
    </Button>
  );
}
