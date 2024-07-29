"use client";

import LowPriorityIcon from "@mui/icons-material/LowPriority";
import FormLabel from "@/components/form-label";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import ConfigInput from "@/components/confing-input";
import { AiOutlinePercentage } from "react-icons/ai";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
import t from "@/translations/configurations";
import useLangStore from "@/stores/lang-store";

export default function PowerPriorityConfig({
  powerPriority,
  onReturn,
  onContinue,
  onSetPowerPriority,
}: any) {
  const [minimumPriorityOne, setMinimumPriorityOne] = useState<any>(
    powerPriority.minimumPriorityOne
  );
  const [minimumPriorityTwo, setMinimumPriorityTwo] = useState<any>(
    powerPriority.minimumPriorityTwo
  );
  const [minimumPriorityThree, setMinimumPriorityThree] = useState<any>(
    powerPriority.minimumPriorityThree
  );
  const [minimumPriorityFour, setMinimumPriorityFour] = useState<any>(
    powerPriority.minimumPriorityFour
  );

  useDebounce(
    minimumPriorityOne,
    minimumPriorityTwo,
    setMinimumPriorityTwo,
    700
  );

  useDebounce(
    minimumPriorityTwo,
    minimumPriorityThree,
    setMinimumPriorityThree,
    700
  );

  useDebounce(
    minimumPriorityThree,
    minimumPriorityFour,
    setMinimumPriorityFour,
    700
  );

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetPowerPriority({
      minimumPriorityOne,
      minimumPriorityTwo,
      minimumPriorityThree,
      minimumPriorityFour,
    });
    onContinue();
  }

  const { language } = useLangStore();

  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div></div>;

  return (
    <form
      className={cn(
        "w-[45rem] shadow-md overflow-hidden border-[1px] border-[#ffffff0c] flex-col max-md:w-full max-md:h-full",
        "shadow-none border-none"
      )}
      onSubmit={handleSave}
    >
      <StartConfigHeader
        icon={<LowPriorityIcon className={"text-[1.2rem]"} />}
        label={t.priority.header[language] || "PRIORITIES"}
        tutorialUrl={`/videos/config/priority/${language}.mp4`}
      />

      <div className="px-10 pt-10 bg-bluewhite         max-md:h-full">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <div className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            <p className="mb-3">
              {t.priority.text[language][0] ||
                "Configure the percentage of power assigned to a charger based on its priority here."}
            </p>
            <p>
              {t.priority.text[language][1] ||
                "For example, if an AC charger needs 10 amps and its priority is medium, a percentage value of '90' in 'medium' will cause it to receive only 90% of those 10 amps. Charging priorities are useful for managing different power levels in similar chargers. We recommend keeping the default values."}
            </p>
          </div>

          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="w-full flex gap-8">
              <div className="flex flex-col justify-between w-1/4 gap-3">
                <FormLabel
                  label={t.priority.high[language] || "High"}
                  className="text-sm font-semibold opacity-90"
                />
                <ConfigInput
                  required
                  icon={<AiOutlinePercentage />}
                  min={0}
                  max={100}
                  type="number"
                  className="w-full"
                  value={minimumPriorityOne}
                  onChange={(e) => {
                    setMinimumPriorityOne(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col justify-between w-1/4  gap-3">
                <FormLabel
                  className="text-sm font-semibold opacity-90"
                  label={t.priority.medium[language] || "Medium"}
                />
                <ConfigInput
                  required
                  icon={<AiOutlinePercentage />}
                  min={0}
                  max={minimumPriorityOne}
                  type="number"
                  value={minimumPriorityTwo}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    let final_value = value;
                    if (value > minimumPriorityOne) {
                      final_value = minimumPriorityOne;
                    }
                    setMinimumPriorityTwo(final_value);
                  }}
                />
              </div>

              <div className="flex flex-col justify-between w-1/4  gap-3">
                <FormLabel
                  label={t.priority.low[language] || "Low"}
                  className="text-sm font-semibold opacity-90"
                />
                <ConfigInput
                  required
                  icon={<AiOutlinePercentage />}
                  min={0}
                  max={minimumPriorityTwo}
                  type="number"
                  className="w-full"
                  value={minimumPriorityThree}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    let final_value = value;
                    if (value > minimumPriorityTwo) {
                      final_value = minimumPriorityTwo;
                    }
                    setMinimumPriorityThree(final_value);
                  }}
                />
              </div>

              <div className="flex flex-col justify-between w-1/4  gap-3">
                <FormLabel
                  className="text-sm font-semibold opacity-90"
                  label={t.priority.veryLow[language] || "Very Low"}
                />

                <ConfigInput
                  required
                  icon={<AiOutlinePercentage />}
                  min={0}
                  max={minimumPriorityThree}
                  type="number"
                  value={minimumPriorityFour}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    let final_value = value;
                    if (value > minimumPriorityThree) {
                      final_value = minimumPriorityThree;
                    }
                    setMinimumPriorityFour(final_value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "w-full flex justify-end gap-3 pb-5 bg-bluewhite animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]",
            "max-md:fixed max-md:top-[100svh] max-md:right-10 max-md:-translate-y-[7rem]"
          )}
        >
          <Button
            type="button"
            className="bg-[#010618]  transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10"
            onClick={onReturn}
          >
            {t.button.back[language] || "GO BACK"}
          </Button>
          <NextButton />
          {/* <Button
            type="submit"
            className="bg-[#010618] transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10"
          >
            CONTINUE
          </Button> */}
        </div>
      </div>
    </form>
  );
}
