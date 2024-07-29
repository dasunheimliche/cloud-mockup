"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

export function MobileDropdownMenu({
  table,
  onClick,
}: {
  table: "system" | "smtp";
  onClick: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <div className="w-10 h-10 rounded-full hover:bg-[#ffffff17] flex justify-center items-center cursor-pointer">
          <MoreVertIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 backdrop-blur-sm bg-[#f5f5f5dc]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => onClick("smtp")}
            className="cursor-pointer  h-9"
          >
            OCPP
            <DropdownMenuShortcut className="flex justify-center items-center mr-[0.3rem]">
              {table === "smtp" && (
                <div
                  className={cn(
                    "bg-[#236e2d] w-3 h-3 opacity-100 rounded-full"
                  )}
                />
              )}
              {!(table === "smtp") && (
                <div
                  className={cn(
                    "bg-[#7e7e7e85] w-3 h-3 opacity-100 rounded-full"
                  )}
                />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onClick("system")}
            className="cursor-pointer  h-9"
          >
            SYSTEM
            <DropdownMenuShortcut className="flex justify-center items-center mr-[0.3rem]">
              {table === "system" && (
                <div
                  className={cn(
                    "bg-[#236e2d] w-3 h-3 opacity-100 rounded-full"
                  )}
                />
              )}
              {!(table === "system") && (
                <div
                  className={cn(
                    "bg-[#7e7e7e85] w-3 h-3 opacity-100 rounded-full"
                  )}
                />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
