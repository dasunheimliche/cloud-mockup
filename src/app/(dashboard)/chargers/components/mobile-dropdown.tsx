"use client";

import AddchartIcon from "@mui/icons-material/Addchart";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import t from "@/translations/chargers";
import useLangStore from "@/stores/lang-store";

export function MobileDropdownMenu({
  onAddFromExcel,
  onAddCharge,
  onToggleFilter,
  onlyOnline,
}: {
  onAddFromExcel: (e: any) => void;
  onAddCharge: () => void;
  onToggleFilter: any;
  onlyOnline: boolean;
}) {
  const excelInput: any = useRef(null);
  const { language } = useLangStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <div className="w-10 h-10 rounded-full hover:bg-[#ffffff17] flex justify-center items-center cursor-pointer">
          <MoreVertIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl backdrop-blur-sm bg-[#f5f5f5dc]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer h-9"
            onClick={() => onToggleFilter((prev: boolean) => !prev)}
          >
            {t.onlyAvaliable[language] || "Only Avaliable"}
            <DropdownMenuShortcut className="flex justify-center items-center mr-[0.3rem]">
              {onlyOnline && (
                <div
                  className={cn(
                    "bg-[#236e2d] w-3 h-3 opacity-100 rounded-full"
                  )}
                />
              )}
              {!onlyOnline && (
                <div
                  className={cn(
                    "bg-[#7e7e7e85] w-3 h-3 opacity-100 rounded-full"
                  )}
                />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer h-9"
            onClick={excelInput ? () => excelInput.current.click() : undefined}
          >
            {t.addFromExcel[language] || "Add From Excel"}
            <DropdownMenuShortcut>
              <AddchartIcon
                sx={{
                  color: "#535353",
                }}
              />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onAddCharge}
            className="cursor-pointer h-9"
          >
            {t.addCharger[language] || "Add Charger"}
            <DropdownMenuShortcut>
              <AddIcon
                sx={{
                  color: "#535353",
                }}
              />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <Input
        ref={excelInput}
        type="file"
        name="addFromExcel"
        id="addFromExcel"
        onChange={(e) => onAddFromExcel(e.target.value)}
        accept=".xlsx"
        style={{ display: "none" }}
      />
    </DropdownMenu>
  );
}
