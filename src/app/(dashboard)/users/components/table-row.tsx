"use client";

import { cn } from "@/lib/utils";
import t from "@/translations/users";
import useLangStore from "@/stores/lang-store";

export default function TableRow({
  user,
  isSelected,
  onSelect,
  onOpenEditForm,
}: any) {
  const { language } = useLangStore();

  const role: "user" | "admin" | "mantainer" | "owner" = user.role;

  return (
    <tr
      className={cn(
        "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]",
        isSelected ? "bg-[#96f9c9]" : ""
      )}
      onDoubleClick={onOpenEditForm}
      onClick={onSelect}
    >
      <td className="py-3 flex justify-center items-center border-b-[1px] border-slate-200">
        {user.id}
      </td>
      <td className="border-b-[1px] border-slate-200 max-lg:hidden capitalize">
        {user.name}
      </td>
      <td className="border-b-[1px] border-slate-200 max-lg:hidden capitalize">
        {user.last_name}
      </td>
      <td className="border-b-[1px] border-slate-200 ">{user.username}</td>
      <td className="border-b-[1px] border-slate-200">{user.tag_id}</td>
      <td className="border-b-[1px] border-slate-200 uppercase">
        {t.roles[role][language] || role}
      </td>
      <td className="border-b-[1px] border-slate-200">{user.priority_user}</td>
    </tr>
  );
}
