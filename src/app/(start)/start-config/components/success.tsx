"use client";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";
import { saveAs } from "file-saver";
import { API_URL } from "@/lib/config";
import { useToast } from "@/components/ui/use-toast";
import useLangStore from "@/stores/lang-store";
import { useEffect, useState } from "react";
import t from "@/translations/configurations";

export default function Success({ configuration }: any) {
  const { toast } = useToast();

  const requests = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "uwu",
    },
  });

  const handleDownloadPDF = () => {
    requests
      .post("/configs/print", configuration, {
        responseType: "blob",
      })
      .then((response) => {
        saveAs(response.data, "configuration.pdf");
      })
      .catch((error) => {
        console.error("Error al descargar el PDF:", error);
        toast({
          variant: "destructive",
          title:
            t.toast.failedDownloadConfig[language] ||
            "Something went wrong downloading your configuration",
        });
      });
  };

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
        "shadow-none border-none"
      )}
    >
      <div
        className={cn(
          " flex gap-2 items-center text-sm font-bold text-[1.12rem] px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-20",
          "fixed inset-0 px-10 z-30"
        )}
      >
        <DoneAllIcon className={"text-[1.2rem]"} />{" "}
        {t.success.header[language] || "SUCCESS!"}
      </div>

      <div className="px-10 pt-10 bg-bluewhite      max-md:h-full">
        {/* <p className="text-left font-medium text-[1.1rem] text-slate-900 text-opacity-85 mb-10 h-[7rem]"></p> */}

        <div className="flex flex-col gap-12 h-[29.5rem] justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-green-950 text-[3rem] font-medium animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
              {" "}
              {t.success.title[language] || "SUCCESS!!"}
            </h2>
            <p className="text-center font-medium animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
              {t.success.text[language] ||
                "You have successfully configured your installation! You can now start adding your chargers to our system. Alternatively, if you prefer, you can print the established configurations as a record before proceeding."}
            </p>
          </div>

          <div className="flex gap-3    max-md:flex-col animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <Button
              type="button"
              onClick={handleDownloadPDF}
              className="bg-[#010618]  transition-all  w-[14rem] h-[2.8rem] text-green-50 rounded-[2rem]"
            >
              {t.success.print[language] || "PRINT YOUR SETTINGS"}
            </Button>
            <Link href={"/interactions"}>
              <Button
                type="button"
                className="bg-[#010618]  transition-all  w-[14rem] h-[2.8rem] text-green-50 rounded-[2rem]"
              >
                {t.success.dashboard[language] || "GO TO DASHBOARD"}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3 pb-5 bg-bluewhite">
          <Button
            disabled
            type="button"
            className="bg-[#010618] disabled:opacity-0  opacity-0 transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10"
          >
            GO BACK
          </Button>
          <Button
            disabled
            type="submit"
            className="bg-[#010618] disabled:opacity-0  opacity-0 transition-all  w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10"
          >
            FINISH
          </Button>
        </div>
      </div>
    </div>
  );
}
