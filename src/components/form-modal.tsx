import Modal from "./ui/modal";
import ErrorBanner from "./error-banner";
import React from "react";
import FormButtons from "./form-buttons";

interface FormModalProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  error: string;
  loading: boolean;
  onSubmit: () => Promise<void>;
  onCancel?: () => void;
}

export default function FormModal({
  children,
  title,
  icon,
  error,
  loading,
  onSubmit,
  onCancel,
}: FormModalProps) {
  return (
    <Modal>
      <form action="" className="bg-white rounded overflow-hidden">
        <div className=" flex gap-2 items-center text-sm font-bold px-5 text-[#ffffffcb] bg-gradient-to-l  from-[rgb(7,57,64)] to-[rgb(0,0,0)] w-full h-14">
          {icon} {title}
        </div>
        {<ErrorBanner error={error} />}
        <div className="w-full p-5 text-[#01110b] relative flex flex-col gap-5">
          {children}
        </div>
        <FormButtons
          onSubmit={onSubmit}
          onCancel={onCancel}
          loading={loading}
          disabled={!!error}
        />
      </form>
    </Modal>
  );
}
