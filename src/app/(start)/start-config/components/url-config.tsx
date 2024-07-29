"use client";

import Image from "next/image";

import { IoGitNetworkSharp } from "react-icons/io5";
import { MdVideoSettings } from "react-icons/md";

import ConfigIcon from "@/components/config-icon";
import FormLabel from "@/components/form-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/configurations";

export default function UrlConfig({
  onContinue,
  onReturn,
  onSetUrls,
  urls,
  hasPV,
}: any) {
  const [apiUrl, setApiUrl] = useState<any>(urls.apiUrl);
  const [installationUrl, setInstallationUrl] = useState<any>(
    urls.installationUrl
  );
  const [pvUrl, setPVUrl] = useState<any>(urls.pvUrl);
  const [thirdPartyBackendUrl, setThirdPartyBackendUrl] = useState<any>(
    urls.thirdPartyBackendUrl
  );

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetUrls({ apiUrl, installationUrl, pvUrl, thirdPartyBackendUrl });
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
        key="endpoints"
        icon={<IoGitNetworkSharp size={"1.25rem"} />}
        label={t.endpoints.header[language] || "ENDPOINTS"}
        tutorialUrl={`/videos/config/endpoints/${language}.mp4`}
      />

      <div className="px-10 pt-10 bg-bluewhite    max-md:h-full">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <div className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            <p className="mb-3">
              {t.endpoints.text[language][0] ||
                "Configure the necessary URLs to connect with the energy meters and any third-party backend that authenticates your chargers, if applicable. If you do not have or do not wish to configure this, you can use our default backend."}
            </p>
            <p>
              {t.endpoints.text[language][1] ||
                "If you do not know the address of your energy meters, please do not proceed with the configuration until you have it."}
            </p>
          </div>
          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="w-full flex justify-between gap-12 relative max-lg:flex-col max-lg:gap-6">
              <div className="w-1/2 flex gap-3 max-lg:w-full">
                <ConfigIcon>
                  <Image src={"/icons/grid1.png"} alt="grid icon" fill />
                </ConfigIcon>

                <div className="flex flex-col justify-between pt-1  w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.endpoints.powerMeter[language] || "Building Power Meter"
                    }
                    tooltip={
                      t.endpoints.powerMeterTooltip[language] ||
                      "URL of access to the power meter of the installation."
                    }
                  />
                  <Input
                    required
                    minLength={5}
                    type="text"
                    value={installationUrl}
                    onChange={(e) => setInstallationUrl(e.target.value)}
                  />
                </div>
              </div>
              {hasPV && (
                <div className="w-1/2 flex gap-3 max-lg:w-full">
                  <ConfigIcon>
                    <Image src={"/icons/solar2.png"} alt="grid icon" fill />
                  </ConfigIcon>

                  <div className="flex flex-col justify-between pt-1 w-full">
                    <FormLabel
                      className="text-sm font-semibold opacity-90"
                      label={
                        t.endpoints.pvPowerMeter[language] || "PV Power Meter"
                      }
                      tooltip={
                        t.endpoints.pvPowerMeterTooltip[language] ||
                        "URL of access to the power meter of the Photovoltaic."
                      }
                    />
                    <Input
                      required
                      minLength={5}
                      type="text"
                      className="w-full"
                      value={pvUrl}
                      onChange={(e) => setPVUrl(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="w-full flex justify-between gap-12 relative max-lg:flex-col max-lg:gap-6">
              <div className="w-1/2 flex gap-3 max-lg:w-full">
                <ConfigIcon>
                  <Image src={"/icons/cloud1.png"} alt="grid icon" fill />
                </ConfigIcon>

                <div className="flex flex-col justify-between pt-1  w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.endpoints.thirdParty[language] || "Third Party URL"
                    }
                  />
                  <Input
                    required
                    minLength={5}
                    type="text"
                    value={thirdPartyBackendUrl}
                    onChange={(e) => setThirdPartyBackendUrl(e.target.value)}
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
