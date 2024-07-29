"use client";

import { Button } from "@/components/ui/button";
import { IoSettings } from "react-icons/io5";
import { cn } from "@/lib/utils";
import StartConfigHeader from "./start-config-header";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/configurations";
import { useEffect, useState } from "react";

export default function Welcome({ onContinue }: any) {
  const { language } = useLangStore();

  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div></div>;

  return (
    <div
      className={cn(
        "w-[45rem] shadow-md  overflow-hidden border-[1px] border-[#ffffff0c] flex-col max-md:w-full max-md:h-full",
        "shadow-none border-none overflow-auto"
      )}
    >
      <StartConfigHeader
        key="welcome"
        tutorialUrl={`/videos/config/welcome/${language}.mp4`}
        icon={<IoSettings size={"1.25rem"} />}
        label={t.welcome.header[language] || "WELCOME TO YOUR EVA SETUP!"}
      />
      <div className="px-10 pt-10 bg-bluewhite max-md:w-full max-md:h-full max-md:pt-[7rem] overflow-hidden">
        <h1 className="text-textPrimary text-opacity-85 text-[2rem] font-medium mb-5 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
          {t.welcome.title[language] || "LET&#39;S START YOUR EVA!"}
        </h1>
        <p className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
          {t.welcome.text[language] ||
            "Welcome to EVA, the intelligent energy manager for electric vehicle chargers! This application will guide you in optimizing the energy supply at your charging stations. With some initial settings, EVA will learn about your infrastructure and effectively control the energy flow. Although all configurations can be modified later, it is important to ensure everything is correct from the start."}
        </p>
        <div className="w-full flex justify-end gap-3 pb-5 bg-bluewhite animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
          <Button
            className="bg-slate-950  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-20"
            onClick={onContinue}
          >
            {t.button.start[language] || "START"}
          </Button>
        </div>
      </div>
    </div>
  );
}
