"use client";

import { IoIosContact } from "react-icons/io";
import FormLabel from "@/components/form-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import StartConfigHeader from "./start-config-header";
import { cn } from "@/lib/utils";
import FinishButton from "./finish-button";
import sessionStore from "@/stores/session-store";
import authAxios from "@/lib/api";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/configurations";

export default function ContactSettings({
  onContinue,
  onReturn,
  onSetContact,
  contact,
  onSaveConfig,
}: any) {
  const [operatorName, setOperatorName] = useState<any>(contact.operatorName);
  const [operatorEmail, setOperatorEmail] = useState<any>(
    contact.operatorEmail
  );
  const [configuredBy, setConfiguredBy] = useState<string>(
    contact.configuredBy
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = sessionStore();

  const { setIsConfigured } = sessionStore();

  const { toast } = useToast();

  const handleConfigCheck = async () => {
    try {
      const res = await authAxios.put(
        `/configs/edit?config_name=IsConfigured&new_value=true`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("REES: ", res);

      if (res.status === 200) {
        setIsConfigured(true);
        return true;
      } else {
        console.error("Error al configurar");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSetContact({
      operatorName,
      operatorEmail,
      configuredBy,
    });

    setIsLoading(true);

    try {
      const resSave = await onSaveConfig(operatorName, operatorEmail);

      console.log("RES SAVE: ", resSave);

      const isConfig = await handleConfigCheck();
      if (isConfig) {
        toast({
          variant: "success",
          title:
            t.toast.successStartConfig[language] ||
            "Your settings were saved succesfully",
        });
        onContinue();
      } else {
        toast({
          variant: "destructive",
          title:
            t.toast.failedStartConfig[language] ||
            "Something went wrong, please try again",
        });
        return;
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          t.toast.failedStartConfig[language] ||
          "Something went wrong, please try again",
      });
    }
    setIsLoading(false);
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
        icon={<IoIosContact size={"1.25rem"} />}
        label={t.contact.header[language] || "CONTACT"}
        tutorialUrl={`/videos/config/contact/${language}.mp4`}
      />

      <div className="px-10 pt-10 bg-bluewhite    max-md:h-full">
        <div className="h-[29rem] max-md:h-[36.5rem]">
          <p className="text-left font-medium text-[1.12rem] text-slate-900 text-opacity-85 mb-10 animate-[fade_0.5s_cubic-bezier(0.215,0.61,0.355,1)]">
            {t.contact.text[language] ||
              "We want our users to feel at ease when using our system. Therefore, we request the contact details of the person in charge of the installation to keep them informed about its status. We will send useful information about the system's status, the chargers, and the installation in general via email. These details will only be used for contact purposes."}
          </p>
          <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
            <div className="w-full flex gap-8 max-md:flex-col">
              <div className="flex flex-col justify-between pt-0 w-1/2 gap-3 max-md:w-full">
                <FormLabel
                  label={t.contact.name[language] || "Operator Name"}
                  className="text-sm font-semibold opacity-90"
                />
                <Input
                  required
                  value={operatorName}
                  type="text"
                  placeholder="Jhon Doe"
                  onChange={(e) => setOperatorName(e.target.value)}
                />
              </div>

              <div className="flex flex-col justify-between pt-0 w-1/2 gap-3 max-md:w-full">
                <FormLabel
                  label={t.contact.mail[language] || "Operator Mail"}
                  className="text-sm font-semibold opacity-90"
                />
                <Input
                  required
                  value={operatorEmail}
                  placeholder="johndoe@evasoft.com"
                  type="email"
                  onChange={(e) => setOperatorEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex gap-8 max-md:flex-col">
              <div className="flex flex-col justify-between pt-0 w-full gap-3 max-md:w-full">
                <FormLabel
                  label={t.contact.configured[language] || "Configured By"}
                  className="text-sm font-semibold opacity-90"
                />
                <Input
                  required
                  value={configuredBy}
                  type="text"
                  placeholder="Jhon Doe"
                  onChange={(e) => setConfiguredBy(e.target.value)}
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
          <FinishButton isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
}
