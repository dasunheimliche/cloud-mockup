"use client";

import Select from "@mui/material/Select";
import { Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { IoOptions } from "react-icons/io5";
import FormLabel from "@/components/form-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
import ConfigInput from "@/components/confing-input";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/configurations";

export default function GeneralSettings({
  onContinue,
  onReturn,
  onSetGeneral,
  general,
}: any) {
  const [maximumAllEVSEA, setMaximumAllEVSEA] = useState<any>(
    general.maximumAllEVSEA
  );
  const [MinimumAllEVSE, setMinimumAllEVSE] = useState<any>(
    general.MinimumAllEVSE
  );
  const [viewInKw, setViewInKw] = useState<any>(general.viewInKw);
  const [factorPower, setFactorPower] = useState<any>(general.factorPower);
  const [hasPV, setHasPV] = useState<boolean>(general.hasPV);
  const [phaseType, setPhaseType] = useState<string>(general.phaseType);
  const [userManagement, setUserManagement] = useState<boolean>(
    general.userManagement
  );

  const { language } = useLangStore();

  const [error, setError] = useState<string>("");

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetGeneral({
      maximumAllEVSEA,
      MinimumAllEVSE,
      viewInKw,
      factorPower,
      hasPV,
      phaseType,
      userManagement,
    });
    onContinue();
  }

  return (
    <form
      className={cn(
        "w-[45rem] shadow-md  overflow-hidden border-[1px] border-[#ffffff0c] flex-col max-md:w-full max-md:h-full",
        "shadow-none border-none"
      )}
      onSubmit={handleSave}
    >
      <StartConfigHeader
        key="general"
        icon={<IoOptions size={"1.25rem"} />}
        label={t.general.header[language] || "GENERAL"}
        tutorialUrl="/videos/config/config_1.mp4"
      />

      <div className="px-10 pt-10 bg-bluewhite    max-md:h-full">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <div className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            <p className="mb-3">
              {t.general.text[language][0] ||
                "Let's start with the basic configuration of EVA! Here we will adjust some preferences and important information about your infrastructure."}
            </p>
            <p>
              {t.general.text[language][1] ||
                "If you need more details about any field, please consult our"}{" "}
              <a
                className="underline text-green-700"
                href="https://evasoft.app/eva/manual"
              >
                {t.general.text[language][2] || "online manual"}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="w-full flex gap-8">
              <div className="flex flex-col justify-between pt-0 w-1/3 gap-3">
                <FormLabel
                  label={t.general.pvInstalled[language] || "PV Installed"}
                  className="text-sm font-semibold opacity-90"
                  tooltip={
                    t.general.pvInstalledTool[language] ||
                    "Please indicate if your facility has photovoltaic generation. If you enable this option, you will need to configure the URL of your energy meter, and our algorithm will start taking it into account."
                  }
                />
                <Switch
                  onChange={(e) => setHasPV(!hasPV)}
                  name="switchsimulate"
                  checked={hasPV}
                />
              </div>

              <div className="flex flex-col justify-between pt-0 w-1/3 gap-3">
                <FormLabel
                  label={
                    t.general.userManagement[language] ||
                    "User management to OCPP"
                  }
                  className="text-sm font-semibold opacity-90"
                />
                <Switch
                  onChange={(e) => setUserManagement(!userManagement)}
                  name="switchsimulate"
                  checked={userManagement}
                />
              </div>

              <div className="flex flex-col justify-between pt-0 w-1/3 gap-3">
                <FormLabel
                  label={t.general.factor[language] || "Factor Power"}
                  className="text-sm font-semibold opacity-90"
                />
                <Input
                  required
                  type="text"
                  className="w-full"
                  value={factorPower}
                  onChange={(e) => {
                    console.log(parseFloat(e.target.value) > 100);
                    if (parseFloat(e.target.value) > 100) {
                      setFactorPower(100);
                    } else if (parseFloat(e.target.value) < 0) {
                      setFactorPower(0);
                    } else {
                      setFactorPower(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="w-full flex gap-8">
              <div className="flex flex-col justify-between pt-0  w-1/2 gap-3">
                <FormLabel
                  className="text-sm font-semibold opacity-90"
                  label={
                    t.general.preferredUnit[language] ||
                    "Preferred Unit of Measure"
                  }
                  tooltip="What unit of measurement will be used to display the power in the energy interaction graph."
                />
                <Select
                  required
                  labelId="unit-favorite"
                  id="unit-favorite"
                  value={viewInKw ? "True" : "False"}
                  size="small"
                  onChange={(e: any) => {
                    setViewInKw(e.target.value === "True" ? true : false);
                  }}
                >
                  <MenuItem value={"True"}>
                    {t.general.preferredUnitOptions[language][0] || "Kilowatts"}
                  </MenuItem>
                  <MenuItem value={"False"}>
                    {t.general.preferredUnitOptions[language][1] || "Ampers"}
                  </MenuItem>
                </Select>
              </div>

              <div className="flex flex-col justify-between pt-0 w-1/2 gap-3">
                <FormLabel
                  label={
                    t.general.installationType[language] || "Installation Type"
                  }
                  className="text-sm font-semibold opacity-90"
                  tooltip={
                    t.general.installationTypeTool[language] ||
                    "Please indicate if your facility is single-phase or three-phase, as this will affect the fields you see in the phase configurations. If you plan to install both single-phase and three-phase chargers, select the three-phase option."
                  }
                />
                <Select
                  required
                  labelId="type-phase"
                  id="type-phase"
                  value={phaseType}
                  size="small"
                  onChange={(e) => {
                    setPhaseType(e.target.value);
                  }}
                >
                  <MenuItem value={"single-phase"}>
                    {t.general.installationTypeOptions[language][0] ||
                      "Single Phase"}
                  </MenuItem>
                  <MenuItem value={"three-phase"}>
                    {t.general.installationTypeOptions[language][1] ||
                      "Three Phase"}
                  </MenuItem>
                </Select>
              </div>
            </div>
            <div className="w-full flex gap-8">
              <div className="w-1/2 flex flex-col gap-5">
                <div className="w-full flex gap-3">
                  <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                    <FormLabel
                      className="text-sm font-semibold opacity-90"
                      label={
                        t.general.max[language] || "Máx. Power for all EVSE"
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full gap-6">
                  <ConfigInput
                    required
                    icon={<div>A</div>}
                    type="number"
                    min={0}
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
                      label={t.general.min[language] || "Min. for all EVSE"}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-6">
                  <ConfigInput
                    required
                    icon={<div>A</div>}
                    type="number"
                    min={0}
                    value={MinimumAllEVSE}
                    onChange={(e) => {
                      setMinimumAllEVSE(e.target.value);
                    }}
                  />
                </div>
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
            className="bg-[#010618]  transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10 "
            onClick={onReturn}
          >
            {t.button.back[language] || "GO BACK"}
          </Button>
          <NextButton />
        </div>
      </div>
    </form>
  );
}
