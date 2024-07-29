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
import { IoMdCloudDownload } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import t from "@/translations/sessions";
import useLangStore from "@/stores/lang-store";

export function MobileDropdownMenu({
  onReload,
  onDownload,
}: {
  onReload: (e: any) => void;
  onDownload: () => void;
}) {
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
            className="cursor-pointer h-9 capitalize"
            onClick={onDownload}
          >
            {t.download[language] || "Download"}
            <DropdownMenuShortcut>
              <IoMdCloudDownload className="text-muted-foreground text-[1rem]" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onReload}
            className="cursor-pointer h-9 capitalize"
          >
            {t.reload[language] || "Reload"}
            <DropdownMenuShortcut>
              <TbReload className="text-muted-foreground text-[1rem]" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
