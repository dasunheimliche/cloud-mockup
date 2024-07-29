"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function TableRow({
  data,
  isSelected,
  onSelect,
  onDoubleClick,
  columnsRef,
}: any) {
  if (!data) return null;

  return (
    <tr
      className={cn(
        "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]",
        isSelected ? "bg-[#96f9c9]" : ""
      )}
      onDoubleClick={onDoubleClick}
      onClick={() => onSelect(data)}
    >
      {Object.entries(data).map(([key, value]: any, i: any) => {
        if (typeof value === "function") {
          return (
            <td
              key={i}
              className={cn(
                "py-3 border-b-[1px] border-slate-200",
                columnsRef[i].hidden ? "hidden" : "",
                columnsRef[i].hiddenOnMobile ? "max-lg:hidden" : "",
                columnsRef[i].capitalize ? "capitalize" : ""
              )}
            >
              <Button
                className="uppercase rounded-full text-[0.65rem] py-1 px-3"
                type="button"
                onClick={value}
              >
                {String(key)}
              </Button>
            </td>
          );
        }

        return (
          <td
            key={i}
            className={cn(
              "py-3 min-w-6 border-b-[1px] border-slate-200",
              columnsRef[i].hidden ? "hidden" : "",
              columnsRef[i].hiddenOnMobile ? "max-lg:hidden" : "",
              columnsRef[i].capitalize ? "capitalize" : ""
            )}
          >
            {String(value)}
          </td>
        );
      })}
    </tr>
  );
}
