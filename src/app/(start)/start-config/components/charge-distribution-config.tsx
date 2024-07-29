import Image from "next/image";
import { BsBorderWidth } from "react-icons/bs";

import ConfigIcon from "@/components/config-icon";
import FormLabel from "@/components/form-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import ConfigInput from "@/components/confing-input";
import { PiLineVerticalLight } from "react-icons/pi";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
import useLangStore from "@/stores/lang-store";

import t from "@/translations/configurations";

export default function ChargeDistributionConfig({
  chargeDistribution,
  onContinue,
  onReturn,
  onSetChargeDistribution,
  phaseType,
}: any) {
  const [mainDistributionLimitA, setMainDistributionLimitA] = useState<any>(
    chargeDistribution.mainDistributionLimitA
  );
  const [mainDistributionLimitB, setMainDistributionLimitB] = useState<any>(
    chargeDistribution.mainDistributionLimitB
  );
  const [mainDistributionLimitC, setMainDistributionLimitC] = useState<any>(
    chargeDistribution.mainDistributionLimitC
  );

  const [subDistributionLimitA, setSubDistributionLimitA] = useState<any>(
    chargeDistribution.subDistributionLimitA
  );
  const [subDistributionLimitB, setSubDistributionLimitB] = useState<any>(
    chargeDistribution.subDistributionLimitB
  );
  const [subDistributionLimitC, setSubDistributionLimitC] = useState<any>(
    chargeDistribution.subDistributionLimitC
  );

  const [operatorSubDistributionLimitA, setOperatorSubDistributionLimitA] =
    useState<any>(chargeDistribution.operatorSubDistributionLimitA);
  const [operatorSubDistributionLimitB, setOperatorSubDistributionLimitB] =
    useState<any>(chargeDistribution.operatorSubDistributionLimitB);
  const [operatorSubDistributionLimitC, setOperatorSubDistributionLimitC] =
    useState<any>(chargeDistribution.operatorSubDistributionLimitC);

  const [ExternalLoadFallBackA, setExternalLoadFallBackA] = useState<any>(
    chargeDistribution.ExternalLoadFallBackA
  );
  const [ExternalLoadFallBackB, setExternalLoadFallBackB] = useState<any>(
    chargeDistribution.ExternalLoadFallBackB
  );
  const [ExternalLoadFallBackC, setExternalLoadFallBackC] = useState<any>(
    chargeDistribution.ExternalLoadFallBackC
  );

  useEffect(() => {
    setExternalLoadFallBackA(
      mainDistributionLimitA - operatorSubDistributionLimitA
    );
    setExternalLoadFallBackB(
      mainDistributionLimitB - operatorSubDistributionLimitB
    );
    setExternalLoadFallBackC(
      mainDistributionLimitC - operatorSubDistributionLimitC
    );
  }, [
    mainDistributionLimitA,
    mainDistributionLimitB,
    mainDistributionLimitC,
    operatorSubDistributionLimitA,
    operatorSubDistributionLimitB,
    operatorSubDistributionLimitC,
  ]);

  useDebounce(
    mainDistributionLimitA,
    subDistributionLimitA,
    setSubDistributionLimitA,
    700
  );
  useDebounce(
    mainDistributionLimitB,
    subDistributionLimitB,
    setSubDistributionLimitB,
    700
  );
  useDebounce(
    mainDistributionLimitC,
    subDistributionLimitC,
    setSubDistributionLimitC,
    700
  );
  useDebounce(
    subDistributionLimitA,
    operatorSubDistributionLimitA,
    setOperatorSubDistributionLimitA,
    700
  );
  useDebounce(
    subDistributionLimitB,
    operatorSubDistributionLimitB,
    setOperatorSubDistributionLimitB,
    700
  );
  useDebounce(
    subDistributionLimitC,
    operatorSubDistributionLimitC,
    setOperatorSubDistributionLimitC,
    700
  );

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetChargeDistribution({
      mainDistributionLimitA,
      mainDistributionLimitB,
      mainDistributionLimitC,
      subDistributionLimitA,
      subDistributionLimitB,
      subDistributionLimitC,
      operatorSubDistributionLimitA,
      operatorSubDistributionLimitB,
      operatorSubDistributionLimitC,
      ExternalLoadFallBackA,
      ExternalLoadFallBackB,
      ExternalLoadFallBackC,
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
        icon={<BsBorderWidth size={"1.25rem"} />}
        label={t.distribution.header[language] || "DISTRIBUTION LMITS"}
        tutorialUrl={`/videos/config/distribution/${language}.mp4`}
      />

      <div className="px-10 pt-10 bg-bluewhite max-md:h-full     relative">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <p className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            {t.distribution.text[language] ||
              "Configuring the limits is one of the most important parts of our application, as it defines how our algorithm optimizes energy. We recommend taking a moment to thoroughly understand each field below, as this is one of the key configurations for the operation of our system."}
          </p>

          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="flex gap-3 h-16 max-h-16">
              <ConfigIcon>
                <Image src={"/icons/upper.png"} alt="grid icon" fill />
              </ConfigIcon>

              <div className="w-full flex flex-col justify-between max-h-16 relative">
                <div
                  className="w-full absolute top-0 h-[1px] rounded-2xl flex items-center"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(28,233,95,1) 0%, rgba(224,229,9,1) 31%, rgba(255,240,87,1) 59%, rgba(255,230,87,1) 64%, rgba(255,220,87,1) 69%, rgba(255,87,87,1) 100%)",
                  }}
                >
                  <PiLineVerticalLight className="absolute left-0 top-0 -translate-y-2 -translate-x-2 text-[#1ce95f]" />
                  <PiLineVerticalLight className="absolute right-0 top-0 -translate-y-2 translate-x-2 text-[#ff5757]" />
                </div>
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.distribution.main[language] || "Main distribution limit"
                    }
                    tooltip={
                      t.distribution.main[language] ||
                      "Es la potencia máxima de la instalación. El algoritmo tendrá este valor como referencia para no superarlo."
                    }
                  />
                </div>

                <div className="flex w-full gap-6 items-center max-sm:gap-3">
                  <ConfigInput
                    required
                    icon={<div>A</div>}
                    type="number"
                    min={0}
                    value={mainDistributionLimitA}
                    onChange={(e) => {
                      setMainDistributionLimitA(parseInt(e.target.value));
                    }}
                  />
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      required
                      icon={<div>A</div>}
                      type="number"
                      min={0}
                      value={mainDistributionLimitB}
                      onChange={(e) => {
                        setMainDistributionLimitB(parseInt(e.target.value));
                      }}
                    />
                  )}
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      required
                      icon={<div>A</div>}
                      type="number"
                      min={0}
                      value={mainDistributionLimitC}
                      onChange={(e) => {
                        setMainDistributionLimitC(parseInt(e.target.value));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <ConfigIcon>
                <Image src={"/icons/middle.png"} alt="grid icon" fill />
              </ConfigIcon>

              <div className="w-full flex flex-col justify-between relative">
                <div
                  className="w-2/3 absolute top-0 h-[1px] rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(28,233,95,1) 0%, rgba(224,229,9,1) 69%, rgba(255,240,87,1) 100%)",
                  }}
                >
                  <PiLineVerticalLight className="absolute left-0 top-0 -translate-y-2 -translate-x-2 text-[#1ce95f]" />
                  <PiLineVerticalLight className="absolute right-0 top-0 -translate-y-2 translate-x-2 text-[#ffdc57]" />
                </div>
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.distribution.sub[language] ||
                      "EVSE Sub-Distribution Limit"
                    }
                    tooltip={
                      t.distribution.subTooltip[language] ||
                      "Máximo de corriente prevista para los cargadores. Este valor debe establecerse SIEMPRE por debajo del Main Distribution Limit."
                    }
                  />
                </div>
                <div className="flex w-full gap-6 items-center  max-sm:gap-3">
                  <ConfigInput
                    required
                    icon={<div>A</div>}
                    type="number"
                    max={mainDistributionLimitA}
                    min={0}
                    value={subDistributionLimitA}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let final_value = value;
                      if (value > mainDistributionLimitA) {
                        final_value = mainDistributionLimitA;
                      }

                      setSubDistributionLimitA(final_value);
                    }}
                  />
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      required
                      icon={<div>A</div>}
                      type="number"
                      max={mainDistributionLimitB}
                      min={0}
                      value={subDistributionLimitB}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        let final_value = value;
                        if (value > mainDistributionLimitB) {
                          final_value = mainDistributionLimitB;
                        }
                        setSubDistributionLimitB(final_value);
                      }}
                    />
                  )}
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      required
                      icon={<div>A</div>}
                      type="number"
                      max={mainDistributionLimitC}
                      min={0}
                      value={subDistributionLimitC}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        let final_value = value;
                        if (value > mainDistributionLimitC) {
                          final_value = mainDistributionLimitC;
                        }
                        setSubDistributionLimitC(final_value);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <ConfigIcon>
                <Image src={"/icons/bottom.png"} alt="grid icon" fill />
              </ConfigIcon>

              <div className="w-full flex flex-col justify-between relative">
                <div
                  className="w-1/3 absolute top-0 h-[1px] rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(28,233,95,1) 0%, rgba(152,246,0,1) 100%)",
                  }}
                >
                  <PiLineVerticalLight className="absolute left-0 top-0 -translate-y-2 -translate-x-2 text-[#1ce95f]" />
                  <PiLineVerticalLight className="absolute right-0 top-0 -translate-y-2 translate-x-2 text-[#1ce95f]" />
                </div>
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.distribution.operator[language] ||
                      "Operator EVSE Sub-Distribution Limit"
                    }
                    tooltip={
                      t.distribution.operatorTooltip[language] ||
                      "Si necesita dejar un límite dentro del propio Sub-Distribution Limit, establezca esto por debajo del valor del Sub Distribution. Establezca este valor igual al Sub Distribution si quiere generar otro sub limite. Este valor no puede ser mayor al superior."
                    }
                  />
                </div>
                <div className="flex w-full gap-6 items-center  max-sm:gap-3">
                  <ConfigInput
                    required
                    icon={<div>A</div>}
                    type="number"
                    max={subDistributionLimitA}
                    min={0}
                    value={operatorSubDistributionLimitA}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let final_value = value;
                      if (value > subDistributionLimitA) {
                        final_value = subDistributionLimitA;
                      }

                      setOperatorSubDistributionLimitA(final_value);
                    }}
                  />
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      required
                      icon={<div>A</div>}
                      type="number"
                      max={subDistributionLimitB}
                      min={0}
                      value={operatorSubDistributionLimitB}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        let final_value = value;
                        if (value > subDistributionLimitB) {
                          final_value = subDistributionLimitB;
                        }

                        setOperatorSubDistributionLimitB(final_value);
                      }}
                    />
                  )}
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      required
                      icon={<div>A</div>}
                      type="number"
                      max={subDistributionLimitC}
                      min={0}
                      value={operatorSubDistributionLimitC}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        let final_value = value;
                        if (value > subDistributionLimitC) {
                          final_value = subDistributionLimitC;
                        }
                        setOperatorSubDistributionLimitC(final_value);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full  flex-col gap-5 opacity-0">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label="External Load Fallback."
                  />
                </div>
              </div>
              <div className="flex w-full gap-6 items-center  max-sm:gap-3">
                <Input
                  type="number"
                  value={ExternalLoadFallBackA}
                  readOnly
                  className="!cursor-default"
                  disabled
                />
                {phaseType === "three-phase" && (
                  <Input type="number" value={ExternalLoadFallBackB} readOnly />
                )}
                {phaseType === "three-phase" && (
                  <Input type="number" value={ExternalLoadFallBackC} readOnly />
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
