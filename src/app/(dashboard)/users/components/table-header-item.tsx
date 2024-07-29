"use client";

import { cn } from "@/lib/utils";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/users";

type LanguageKey = keyof (typeof t)[keyof typeof t];

export default function TableHeaderItem({
  label,
  isHiddenOnMobile,
  isLast,
}: {
  label: keyof typeof t;
  isHiddenOnMobile: boolean;
  isLast: boolean;
}) {
  const { language } = useLangStore();

  return (
    <th
      className={cn(
        "py-3 border-b-[1px] border-r-[1px] border-slate-200",
        isHiddenOnMobile ? "max-lg:hidden" : "",
        isLast ? "border-r-[0px]" : ""
      )}
    >
      {t[label][language as LanguageKey]}
    </th>
  );
}
