"use client";

import { cn } from "@/lib/utils";
import ModalClose from "./ui/modal-close";
import ModalAccept from "./ui/modal-accept";
import { useRef } from "react";

interface FormButtonsProps {
  onSubmit: () => Promise<void>;
  onCancel?: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function FormButtons({
  onSubmit,
  onCancel,
  disabled,
  loading,
}: FormButtonsProps) {
  const closeRef = useRef<any>(null);

  const handleCloseClick = () => {
    if (closeRef.current) {
      closeRef.current.click();
    }
  };

  const handleSubmit = async () => {
    try {
      await onSubmit();
      handleCloseClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-end mt-1 gap-2 pr-5 pb-3">
      <ModalClose onClick={onCancel} />

      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex justify-center rounded-full text-sm items-center font-semibold shadow-none h-4 w-24 py-5 bg-slate-950 text-zinc-50 hover:bg-slate-900 hover:text-zinc-50",
          !!disabled
            ? "opacity-35 cursor-not-allowed hover:bg-slate-950 hover:text-slate-50"
            : ""
        )}
        onClick={handleSubmit}
      >
        {!loading && "Submit"}
        {loading && <div className="loader"></div>}
      </button>

      <ModalAccept
        ref={closeRef}
        onClick={() => {}}
        label="Add"
        className="absolute opacity-0 -translate-x-[10000px] "
      />
    </div>
  );
}
