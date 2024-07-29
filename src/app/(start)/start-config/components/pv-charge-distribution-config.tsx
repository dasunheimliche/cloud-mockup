"use client";

import { FaSolarPanel } from "react-icons/fa";
import FormLabel from "@/components/form-label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ConfigInput from "@/components/confing-input";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/configurations";

export default function PvChargeDistributionConfig({
  pvChargeDistribution,
  onContinue,
  onReturn,
  onSetPvChargeDistribution,
  phaseType,
}: any) {
  const [PVInstalledA, setPVInstalledA] = useState<any>(
    pvChargeDistribution.PVInstalledA
  );
  const [PVInstalledB, setPVInstalledB] = useState<any>(
    pvChargeDistribution.PVInstalledB
  );
  const [PVInstalledC, setPVInstalledC] = useState<any>(
    pvChargeDistribution.PVInstalledC
  );

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetPvChargeDistribution({
      PVInstalledA,
      PVInstalledB,
      PVInstalledC,
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
        "w-[45rem] shadow-md  overflow-hidden border-[1px] border-[#ffffff0c] flex-col max-md:w-full max-md:h-full",
        "shadow-none border-none"
      )}
      onSubmit={handleSave}
    >
      <StartConfigHeader
        icon={<FaSolarPanel size={"1.25rem"} />}
        label={t.pvDistribution.header[language] || "PV DISTRIBUTION LIMITS"}
        tutorialUrl={`/videos/config/pvdistribution/${language}.mp4`}
      />

      <div className="px-10 pt-10 bg-bluewhite       max-md:h-full ">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <p className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            {t.pvDistribution.text[language] ||
              "The installed solar power is the nominal power in amperes of the installed inverter. If you activate the “Only PV” checkbox (configuration that you can change later, by default deactivated), the system will operate only with photovoltaic energy, always prioritizing the self-consumption of the installation and adjusting the load according to the available power."}
          </p>

          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.pvDistribution.installed[language] ||
                      "Solar Power Installed"
                    }
                  />
                </div>
              </div>
              <div className="flex w-full gap-6 items-center  max-sm:gap-3">
                <ConfigInput
                  required
                  icon={<div>kw</div>}
                  type="number"
                  value={PVInstalledA}
                  onChange={(e) => {
                    setPVInstalledA(e.target.value);
                  }}
                />
                {phaseType === "three-phase" && (
                  <ConfigInput
                    required
                    icon={<div>kw</div>}
                    type="number"
                    value={PVInstalledB}
                    onChange={(e) => {
                      setPVInstalledB(e.target.value);
                    }}
                  />
                )}
                {phaseType === "three-phase" && (
                  <ConfigInput
                    required
                    icon={<div>kw</div>}
                    type="number"
                    value={PVInstalledC}
                    onChange={(e) => {
                      setPVInstalledC(e.target.value);
                    }}
                  />
                )}
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
            NEXT
          </Button> */}
        </div>
      </div>
    </form>
  );
}
