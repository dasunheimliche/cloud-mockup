"use client";

import useLangStore from "@/stores/lang-store";
import { AlertDialogCancel } from "./alert-dialog";
import t from "@/translations/others";

interface ModalCloseProps
  extends React.ComponentProps<typeof AlertDialogCancel> {
  onClick?: () => void;
}

export default function ModalClose({ onClick, ...props }: ModalCloseProps) {
  const { language } = useLangStore();

  return (
    <AlertDialogCancel
      onClick={onClick}
      className="font-semibold shadow-none rounded-full py-5 w-24 border-[1px] border-[#181A1F] hover:text-black  hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-black  text-zinc-800  border-none"
      {...props}
    >
      {t.cancel[language] || "Cancel"}
    </AlertDialogCancel>
  );
}
