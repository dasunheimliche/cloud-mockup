"use client";

import Select from "@mui/material/Select";
import { MdAttachMoney, MdOutlineAttachMoney } from "react-icons/md";

import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@/components/form-label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
import ConfigInput from "@/components/confing-input";
import t from "@/translations/configurations";
import useLangStore from "@/stores/lang-store";

export default function EnergyPricing({
  onContinue,
  onReturn,
  onSetPrices,
  prices,
}: any) {
  const [kWhAcPrice, setKwhAcPrice] = useState<any>(prices.kWhAcPrice);
  const [kWhDcPrice, setKwhDcPrice] = useState<any>(prices.kWhDcPrice);

  const [currency, setCurrency] = useState<string>(prices.currency);
  const { language } = useLangStore();

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetPrices({
      kWhAcPrice,
      kWhDcPrice,
      currency,
    });
    onContinue();
  }

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
        key="general"
        icon={<MdOutlineAttachMoney size={"1.25rem"} />}
        label={t.princing.header[language] || "ENERGY PRICING"}
        tutorialUrl="/videos/config/config_1.mp4"
      />

      <div className="px-10 pt-10 bg-bluewhite    max-md:h-full">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <div className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            <p className="mb-3">
              {t.princing.text[language] ||
                "Let's start with the basic configuration of EVA! Here we will adjust some preferences and important information about your infrastructure."}
            </p>
          </div>
          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="w-full flex gap-8">
              <div className="flex flex-col justify-between pt-0 w-1/2 gap-3">
                <FormLabel
                  label={t.princing.currency[language] || "Currency"}
                  className="text-sm font-semibold opacity-90"
                />
                <Select
                  required
                  labelId="currency-phase"
                  id="type-phase"
                  value={currency}
                  size="small"
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                >
                  <MenuItem value={"eur"}>
                    {t.princing.currencyOptions[language][0] || "Euro"}
                  </MenuItem>
                  <MenuItem value={"gbp"}>
                    {t.princing.currencyOptions[language][1] || "Pund Sterling"}
                  </MenuItem>
                  <MenuItem value={"chf"}>
                    {t.princing.currencyOptions[language][2] || "Swiss Franc"}
                  </MenuItem>
                  <MenuItem value={"usd"}>
                    {t.princing.currencyOptions[language][3] || "US Dollar"}
                  </MenuItem>
                  <MenuItem value={"mxn"}>
                    {t.princing.currencyOptions[language][4] || "Mexican Peso"}
                  </MenuItem>
                  <MenuItem value={"cop"}>
                    {t.princing.currencyOptions[language][5] ||
                      "Colombian Peso"}
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
                      label={t.princing.acPrice[language] || "Kwh AC Price"}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-6">
                  <ConfigInput
                    required
                    icon={<MdAttachMoney />}
                    type="number"
                    min={0}
                    value={kWhAcPrice}
                    step={0.01}
                    onChange={(e) => {
                      setKwhAcPrice(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="w-1/2 flex flex-col gap-5">
                <div className="w-full flex gap-3">
                  <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                    <FormLabel
                      className="text-sm font-semibold opacity-90"
                      label={t.princing.dcPrice[language] || "Kwh DC Price"}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-6">
                  <ConfigInput
                    required
                    icon={<MdAttachMoney />}
                    type="number"
                    min={0}
                    step={0.01}
                    value={kWhDcPrice}
                    onChange={(e) => {
                      setKwhDcPrice(e.target.value);
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
