import { MdSecurity } from "react-icons/md";

import FormLabel from "@/components/form-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaSolarPanel } from "react-icons/fa";

export default function SafePowerConfig({
  safePower,
  onContinue,
  onReturn,
  onSetSafePower,
}: any) {
  const [maximumAllEVSEA, setMaximumAllEVSEA] = useState<any>(
    safePower.maximumAllEVSEA
  );
  const [MinimumAllEVSE, setMinimumAllEVSE] = useState<any>(
    safePower.MinimumAllEVSE
  );

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetSafePower({
      maximumAllEVSEA,
      MinimumAllEVSE,
    });

    onContinue();
  }

  return (
    <form
      className="w-[45rem] shadow-md  overflow-hidden border-[1px] border-[#ffffff0c] flex-col        max-md:w-full max-md:h-full"
      onSubmit={handleSave}
    >
      <div className=" flex gap-2 items-center text-sm font-bold text-[1.12rem] px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-20">
        <MdSecurity size={"1.25rem"} /> SAFE POWER SETTINGS FOR EVSE
      </div>

      <div className="px-10 pt-10 bg-bluewhite         max-md:h-full">
        <p className="text-left font-medium text-[1.1rem] text-slate-900 text-opacity-85 mb-10 h-[7rem]      max-md:h-[10rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <div className="flex flex-col gap-6 h-[20rem]            max-md:h-[23rem]">
          <div className="w-full flex gap-8">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label="Máximum for all EVSE"
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <Input
                  required
                  type="number"
                  value={maximumAllEVSEA}
                  onChange={(e) => {
                    setMaximumAllEVSEA(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label="Minimum for all EVSE"
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <Input
                  required
                  type="number"
                  value={MinimumAllEVSE}
                  onChange={(e) => {
                    setMinimumAllEVSE(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3 pb-5 bg-bluewhite">
          <Button
            type="button"
            className="bg-[#010618]  transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10"
            onClick={onReturn}
          >
            GO BACK
          </Button>
          <Button
            type="submit"
            className="bg-[#010618] transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10"
          >
            NEXT
          </Button>
        </div>
      </div>
    </form>
  );
}
