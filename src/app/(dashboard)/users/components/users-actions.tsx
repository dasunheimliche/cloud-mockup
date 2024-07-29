"use client";

import HeaderButton from "@/components/header-button";
import t from "@/translations/users";
import { FaUserEdit, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { MobileDropdownMenu } from "./mobile-dropdown";
import useLangStore from "@/stores/lang-store";

export default function UsersActions({
  blocked,
  onOpenAddForm,
  onOpenEditForm,
  onOpenDeleteForm,
}: any) {
  const { language } = useLangStore();

  return (
    <>
      <div className="flex gap-3 max-lg:hidden">
        <HeaderButton
          disabled={blocked}
          icon={<FaUserMinus className="text-slate-50 text-[1.2rem]" />}
          label={t.delete[language] || "DELETE USER"}
          onClick={!blocked ? onOpenDeleteForm : undefined}
        />
        <HeaderButton
          disabled={blocked}
          icon={<FaUserEdit className="text-slate-50 text-[1.2rem]" />}
          label={t.edit[language] || "EDIT USER"}
          onClick={!blocked ? onOpenEditForm : undefined}
        />
        <HeaderButton
          icon={<FaUserPlus className="text-slate-50 text-[1.2rem]" />}
          label={t.new[language] || "NEW USER"}
          onClick={onOpenAddForm}
        />
      </div>
      <MobileDropdownMenu
        onAddUser={onOpenAddForm}
        onEditUser={onOpenEditForm}
        onDeleteUser={onOpenDeleteForm}
      />
    </>
  );
}
