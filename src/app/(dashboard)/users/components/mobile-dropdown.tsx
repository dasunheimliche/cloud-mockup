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

import { FiPlus } from "react-icons/fi";
import { MdDelete, MdEditDocument } from "react-icons/md";

import t from "@/translations/users";
import useLangStore from "@/stores/lang-store";

export function MobileDropdownMenu({
  onAddUser,
  onEditUser,
  onDeleteUser,
}: {
  onAddUser: (e: any) => void;
  onEditUser: (e: any) => void;
  onDeleteUser: (e: any) => void;
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
          <DropdownMenuItem className="cursor-pointer h-9" onClick={onAddUser}>
            {t.new[language] || "Add User"}
            <DropdownMenuShortcut>
              <FiPlus size={"1rem"} className="text-muted-foreground" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer h-9" onClick={onEditUser}>
            {t.edit[language] || "Edit User"}
            <DropdownMenuShortcut>
              <MdEditDocument size={"1rem"} className="text-muted-foreground" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDeleteUser}
            className="cursor-pointer h-9"
          >
            {t.delete[language] || "Delete User"}
            <DropdownMenuShortcut>
              <MdDelete size={"1rem"} className="text-muted-foreground" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
