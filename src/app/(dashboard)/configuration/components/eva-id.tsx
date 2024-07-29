"use client";
import { PiCopySimpleFill } from "react-icons/pi";
import { PiCopySimple } from "react-icons/pi";
import { useState } from "react";
import t from "@/translations/configurations";
import useLangStore from "@/stores/lang-store";

export default function EvaID({ evaId }: { evaId: string }) {
  const [showCopied, setShowCopied] = useState(false);

  const { language } = useLangStore();

  async function handleCopyToClipboard() {
    if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(evaId);
    }

    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 500);
  }

  return (
    <div
      onClick={handleCopyToClipboard}
      className="group transition-all  cursor-pointer flex items-center gap-1 text-opacity-85 font-medium text-[0.8rem] text-green-950 absolute bottom-0 right-0 mr-5 mb-5"
    >
      <div className="flex items-center gap-1 hover:underline hover:underline-offset-2">
        EVA ID: {evaId}{" "}
        <PiCopySimpleFill className="bg-transparent transition-all hidden group-hover:block" />{" "}
        <PiCopySimple className="bg-transparent transition-all group-hover:hidden" />
      </div>

      {showCopied && (
        <div className="bg-green-950 transition-all rounded-lg px-2 text-green-50 text-[0.7rem]">
          {t.toast.copied[language] || "COPIED!"}
        </div>
      )}
    </div>
  );
}
