"use client";

import Modal from "@/components/ui/modal";
import ModalClose from "@/components/ui/modal-close";
import ModalAccept from "@/components/ui/modal-accept";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import t from "@/translations/forms";
import useLangStore from "@/stores/lang-store";
import { PiStackFill } from "react-icons/pi";

export default function DeleteGroupAlert({
  selectedGroup,
  loading,
  onConfirm,
}: any) {
  const { language } = useLangStore();

  const closeDeleteRef = useRef<any>(null);

  const handleCloseClick = () => {
    if (closeDeleteRef.current) {
      closeDeleteRef.current.click();
    }
  };

  async function handleRemove() {
    try {
      await onConfirm();
      handleCloseClick();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal className="bg-white overflow-hidden">
      <div className="flex gap-2 items-center text-sm font-bold px-5  text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
        <PiStackFill size={"1.25rem"} /> {"DELETE GROUP"}
      </div>
      <div className="p-4">
        {"The group with "} <b>{"id"}</b>{" "}
        <b className="text-red-600">{selectedGroup.id}</b> {" and "}{" "}
        <b>{"name "}</b>
        <b className="text-red-600">{selectedGroup.name}</b>
        {" will be deleted, do you want to continue?"}
      </div>
      <div className="flex justify-end mt-1 gap-2 pr-5 pb-3">
        <ModalClose />
        <button
          type="button"
          disabled={loading}
          className={cn(
            "flex justify-center text-sm rounded-full items-center font-semibold shadow-none h-4 w-24 py-5 bg-red-600 text-zinc-50 hover:bg-red-800 hover:text-zinc-50",
            loading
              ? "opacity-35 cursor-not-allowed hover:bg-red-600 hover:text-zinc-950"
              : ""
          )}
          onClick={handleRemove}
        >
          {!loading && (t.delete[language] || "Delete")}
          {loading && <div className="loader"></div>}
        </button>

        <ModalAccept
          ref={closeDeleteRef}
          onClick={() => {}}
          label="Add"
          className="font-semibold hidden shadow-none rounded-lg py-5 w-24 border-[1px] border-[#181A1F] hover:text-black  hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-black  text-zinc-800  border-none"
        />
      </div>
    </Modal>
  );
}
