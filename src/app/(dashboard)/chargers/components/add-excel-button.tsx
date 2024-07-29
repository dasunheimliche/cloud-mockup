"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import t from "@/translations/chargers";
import useLangStore from "@/stores/lang-store";

export default function AddExcelButton({ onClick }: { onClick: any }) {
  const excelInput: any = useRef(null);
  const { language } = useLangStore();

  return (
    <Button
      onClick={excelInput ? () => excelInput.current.click() : undefined}
      className="font-bold flex justify-center items-center hover:bg-[#d8e0d7] h-10 px-[1rem] text-[0.7rem] cursor-pointer          text-slate-50 bg-[#0b2019] hover:bg-[#ffffff1c] transition-all border-solid bg-opacity-10 border border-white border-opacity-10 rounded-[2rem] backdrop-blur-sm"
    >
      <RiFileExcel2Line className="text-slate-50 text-[1.2rem]" />
      <p className="ml-[0.5rem]">
        {t.addFromExcel[language] || "ADD FROM EXCEL"}
      </p>

      <Input
        ref={excelInput}
        type="file"
        name="addFromExcel"
        id="addFromExcel"
        onChange={(e) => onClick(e)}
        accept=".xlsx"
        style={{ display: "none" }}
      />
    </Button>
  );
}
