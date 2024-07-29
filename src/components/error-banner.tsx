"use client";

import { cn } from "@/lib/utils";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/others";

export default function ErrorBanner({ error }: { error: string }) {
  const { language } = useLangStore();

  return (
    <div
      className={cn(
        "bg-red-500 text-sm w-full h-6 flex items-center text-red-50 justify-center transition-all",
        !error ? "bg-green-500" : ""
      )}
    >
      {error ? error : t.allOk[language] || "It's all ok!"}
    </div>
  );
}
