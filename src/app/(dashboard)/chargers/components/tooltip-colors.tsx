"use client";

import { IoInformationCircle } from "react-icons/io5";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import t from "@/translations/chargers";
import useLangStore from "@/stores/lang-store";

export default function TooltipColors() {
  const { language } = useLangStore();

  return (
    <>
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger disabled>
            <IoInformationCircle size={"1.7rem"} className="max-md:hidden" />
          </TooltipTrigger>
          <TooltipContent className="max-w-64 relative p-0 bg-transparent shadow-custom">
            <div
              className={cn(
                "w-full h-auto backdrop-blur-sm bg-[#f5f5f5dc] shadow-custom m-0 flex font-medium text-[0.85rem] flex-col p-8 rounded-xl",
                "rounded-none text-slate-950"
              )}
            >
              <p className=" mb-3">
                {t.tooltipColorMsg[language] ||
                  "To represent the status of the chargers, the border turns a different color. Here is what they mean:"}
              </p>

              <div className="chargerExplain">
                <div className="color greenG rounded-full">.</div>
                <p className="chargerExplainText">
                  {t.states.available[language] || "Available"}
                </p>
              </div>

              <div className="chargerExplain">
                <div className="color orangeG  rounded-full">.</div>
                <p className="chargerExplainText">
                  {t.states.unavailable[language] || "Unavailable"}
                </p>
              </div>

              <div className="chargerExplain ">
                <div className="color blueG rounded-full">.</div>
                <p className="chargerExplainText">
                  {t.states.charging[language] || "Charging"}
                </p>
              </div>

              <div className="chargerExplain">
                <div className="color redG  rounded-full">.</div>
                <p className="chargerExplainText">
                  {t.states.faulted[language] || "Faulted"}
                </p>
              </div>

              <div className="chargerExplain">
                <div className="color purpleG  rounded-full">.</div>
                <p className="chargerExplainText">
                  {t.states.unauthorized[language] || "Unauthorized"}
                </p>
              </div>

              <div className="chargerExplain">
                <div className="color grayG  rounded-full">.</div>
                <p className="chargerExplainText">
                  {t.states.preparing[language] || "Preparing / Finishing"}
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Popover>
        <PopoverTrigger>
          <IoInformationCircle size={"1.7rem"} className="md:hidden" />
        </PopoverTrigger>
        <PopoverContent className="max-w-64 relative outline-none border-none p-0 bg-transparent shadow-custom">
          <div
            className={cn(
              "w-full h-auto backdrop-blur-sm overflow-hidden bg-[#f5f5f5dc] shadow-custom m-0 flex font-medium text-[0.85rem] flex-col p-8 rounded-xl",
              "rounded-lg text-slate-950"
            )}
          >
            <p className=" mb-3">
              {t.tooltipColorMsg[language] ||
                "To represent the status of the chargers, the border turns a different color. Here is what they mean:"}
            </p>

            <div className="chargerExplain">
              <div className="color greenG rounded-full">.</div>
              <p className="chargerExplainText">
                {t.states.available[language] || "Available"}
              </p>
            </div>

            <div className="chargerExplain">
              <div className="color orangeG  rounded-full">.</div>
              <p className="chargerExplainText">
                {t.states.unavailable[language] || "Unavailable"}
              </p>
            </div>

            <div className="chargerExplain ">
              <div className="color blueG rounded-full">.</div>
              <p className="chargerExplainText">
                {" "}
                {t.states.charging[language] || "Charging"}
              </p>
            </div>

            <div className="chargerExplain">
              <div className="color redG  rounded-full">.</div>
              <p className="chargerExplainText">
                {t.states.faulted[language] || "Faulted"}
              </p>
            </div>

            <div className="chargerExplain">
              <div className="color purpleG  rounded-full">.</div>
              <p className="chargerExplainText">
                {t.states.unauthorized[language] || "Unauthorized"}
              </p>
            </div>

            <div className="chargerExplain">
              <div className="color grayG  rounded-full">.</div>
              <p className="chargerExplainText">
                {t.states.preparing[language] || "Preparing / Finishing"}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
