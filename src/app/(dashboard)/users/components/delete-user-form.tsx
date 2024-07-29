"use client";

import { FaUserMinus } from "react-icons/fa";
import Modal from "@/components/ui/modal";
import ModalClose from "@/components/ui/modal-close";
import ModalAccept from "@/components/ui/modal-accept";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import authAxios from "@/lib/api";
import sessionStore from "@/stores/session-store";
import t from "@/translations/forms";
import useLangStore from "@/stores/lang-store";

export default function DeleteUserAlert({ selectedUser, update }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = sessionStore();

  const { toast } = useToast();

  const { language } = useLangStore();

  async function removeRequest() {
    setLoading(true);
    try {
      await authAxios.delete(`subusers/delete?id=${selectedUser.id}`, {
        headers: {
          Authorization: token,
        },
      });

      handleCloseClick();
      setLoading(false);
      toast({
        variant: "success",
        title:
          t.toast.successDeleteUser[language] || "User removed successfully",
      });
      update();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title:
          t.toast.failedDeleteUser[language] ||
          "Something went wrong removing user",
      });
    }
  }

  const closeDeleteRef = useRef<any>(null);

  const handleCloseClick = () => {
    if (closeDeleteRef.current) {
      console.log("CLOSING FORM: ", closeDeleteRef);
      closeDeleteRef.current.click();
    }
  };

  return (
    <Modal className="bg-white overflow-hidden">
      <div className="flex gap-2 items-center text-sm font-bold px-5  text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
        <FaUserMinus size={"1.25rem"} />{" "}
        {t.deleteUser[language] || "DELETE USER"}
      </div>
      <div className="p-4">
        {t.deleteUserText[language][0] || "The user with "} <b>{"id"}</b>{" "}
        <b className="text-red-600">{selectedUser.id}</b>{" "}
        {t.deleteUserText[language][1] || " and "}{" "}
        <b>{t.deleteUserText[language][2] || "name "}</b>
        <b className="text-red-600">{`${selectedUser.name} ${selectedUser.last_name}`}</b>
        {t.deleteUserText[language][3] ||
          " will be deleted, do you want to continue?"}
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
          onClick={removeRequest}
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
