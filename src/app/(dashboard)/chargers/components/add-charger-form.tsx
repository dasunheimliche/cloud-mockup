"use client";

import Modal from "@/components/ui/modal";
import ModalAccept from "@/components/ui/modal-accept";
import ModalClose from "@/components/ui/modal-close";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import t from "@/translations/forms";

import { FaChargingStation } from "react-icons/fa";
import { useChargerSchema } from "@/stores/zod-store";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  priorities,
  ocppVersions,
  singlePhase,
  DEFAULT_CHARGER,
} from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import FormLabel from "@/components/form-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/config";
import ErrorBanner from "@/components/error-banner";
import useStore from "@/stores/main-store";
import useLangStore from "@/stores/lang-store";

const chargerIdErrorMessagePresset =
  "A charger with the same Charger Id already exists.";

const AddChargerForm = memo(function AddChargerForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { increment } = useStore();

  const [charger, setCharger] = useState({
    chargerName: "",
    chargerId: "",
    chargerVendor: "",
    chargerModel: "",
    chargerSerialNumber: "",
    chargerType: "single-phase",
    chargerSupportOCPP: ocppVersions[0].value,
    chargerPhase: singlePhase[0].value,
    chargerPriority: priorities[0].value,
    chargerStatus: "unavailable",
    chargerKwPower: 3.7,
    chargerConnectorType: "DC",
    chargerEfficiency: 80,
    multiConector: "false",
    connectorId: 0,
  });

  const { toast } = useToast();
  const { language } = useLangStore();

  const chargerIdErrorMessagePresset =
    t.toast.chargerExists[language] ||
    "A charger with the same Charger Id already exists.";

  async function addChargerRequest() {
    setError("");
    setLoading(true);
    var requests = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "uwu",
      },
    });

    var existChargerId = false;

    await requests
      .get(
        `/charger/get?chargerId=${charger.chargerId}&connectorId=${charger.connectorId}`
      )
      .then((r) => {
        existChargerId = true;
      })
      .catch((e) => {
        existChargerId = false;
      });

    if (existChargerId) {
      if (charger.chargerId.length > 0) {
        setError(chargerIdErrorMessagePresset);
      }

      setLoading(false);
      return;
    }

    if (existChargerId == false) {
      var c = await requests
        .post("/chargers/add", {
          chargerName: charger.chargerName,
          chargerId: charger.chargerId,
          chargerVendor: charger.chargerVendor,
          chargerModel: charger.chargerModel,
          chargerSerialNumber: charger.chargerSerialNumber,
          chargerSupportOCPP: charger.chargerSupportOCPP,
          chargerPhase: charger.chargerPhase,
          chargerPriority: charger.chargerPriority,
          chargerStatus: "unavailable",
          chargerKwPower: charger.chargerKwPower,
          multiConector: charger.multiConector,
          connectorId: charger.connectorId,
          chargerType: charger.chargerType,
          chargerConnectorType:
            charger.chargerConnectorType === "DC"
              ? "DC"
              : charger.chargerConnectorType,
          chargerEfficiency:
            charger.chargerConnectorType === "DC"
              ? charger.chargerEfficiency / 100
              : "1",
        })
        .then((result) => {
          setError("");
          handleCloseClick();
          setCharger(DEFAULT_CHARGER);
          toast({
            variant: "success",
            title:
              t.toast.successAddCharger[language] ||
              "Charger added successfully.",
          });
          increment();
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
          toast({
            variant: "destructive",
            title:
              t.toast.failedAddCharger[language] ||
              "Something went wrong adding your charger.",
          });
          setLoading(false);
        });
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevents space from being typed
    }
  };

  const chargerSchemas: any = useChargerSchema();

  useEffect(() => {
    if (!chargerSchemas) return;

    if (Object.values(charger).some((value) => value !== "")) {
      const validateCharger = async () => {
        try {
          await chargerSchemas.parseAsync(charger);
          setError("");
        } catch (error: any) {
          const firstError = error.issues[0];
          setError(firstError.message);
        }
      };

      validateCharger();
    }
  }, [charger, chargerSchemas]);

  useEffect(() => {
    setError("");
  }, [charger.chargerId]);

  const closeRef = useRef<any>(null);

  const handleCloseClick = () => {
    if (closeRef.current) {
      setLoading(false);
      closeRef.current.click();
    }
  };

  return (
    <Modal>
      <form
        id="edit-form"
        action=""
        className="bg-white rounded overflow-hidden"
      >
        <div className=" flex gap-2 items-center text-sm font-bold px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
          <FaChargingStation size={"1.25rem"} />{" "}
          {t.addCharger[language] || "ADD CHARGER"}
        </div>
        {<ErrorBanner error={error} />}
        <div className="w-full p-5 text-[#01110b]">
          <Label className="font-semibold relative pl-2 text-green-950">
            <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
            {t.identificationData[language] || "IDENTIFICATION DATA"}
          </Label>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-2 mt-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <FormLabel
                  label={t.name[language] || "Name"}
                  tooltip={
                    t.nameTooltip[language] ||
                    "A name that can be given to the charger, it can be any. It can be repeated in several chargers as it is not unique."
                  }
                />
                <Input
                  className="w-full"
                  required
                  value={charger.chargerName}
                  placeholder={t.namePlaceholder[language] || "Ej: Parking Nº1"}
                  onChange={(e) =>
                    setCharger({ ...charger, chargerName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <FormLabel
                  label="ID"
                  tooltip={
                    t.idTooltip[language] || "Unique charger identification."
                  }
                />
                <Input
                  value={charger.chargerId}
                  placeholder={t.idPlaceholder[language] || "Ej: P01"}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setCharger({ ...charger, chargerId: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel label={t.vendor[language] || "Vendor"} />
                <Input
                  value={charger.chargerVendor}
                  placeholder={t.vendorPlaceholder[language] || "Ej: Tesla"}
                  onChange={(e) =>
                    setCharger({ ...charger, chargerVendor: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <FormLabel label={t.model[language] || "Model"} />
                <Input
                  value={charger.chargerModel}
                  placeholder={t.modelPlaceholder[language] || "Ej: T0123"}
                  onChange={(e) =>
                    setCharger({ ...charger, chargerModel: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel label={t.serial[language] || "Serial"} />
                <Input
                  value={charger.chargerSerialNumber}
                  placeholder={t.serialPlaceholder[language] || "Ej: T12486512"}
                  onChange={(e) =>
                    setCharger({
                      ...charger,
                      chargerSerialNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Separator className="my-3 bg-transparent" />
          <Label className="font-semibold relative pl-2 text-green-950">
            <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
            {t.specifications[language] || "SPECIFICATIONS"}
          </Label>
          <div className="flex flex-col gap-5 mt-2">
            <div className="flex gap-2 mt-2">
              <div className="w-1/2 flex flex-col gap-2">
                <FormLabel label={t.voltage[language] || "Voltage"} />
                <Select
                  defaultValue="DC"
                  onValueChange={(e) =>
                    setCharger({
                      ...charger,
                      chargerConnectorType: e,
                      chargerType: "single-phase",
                      chargerPhase: "L1",
                      chargerKwPower: 3.7,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.select[language] || "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t.voltage[language] || "Voltage"}
                      </SelectLabel>
                      <SelectItem value="DC">DC</SelectItem>
                      <SelectItem value="AC">AC</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {charger.chargerConnectorType === "DC" && (
                <div className="w-1/2 flex flex-col gap-2">
                  <FormLabel
                    label={t.effiency[language] || "Effiency"}
                    tooltip={
                      t.effiencyTooltip[language] ||
                      'DC chargers have a related efficiency. It provides the efficiency value in real values, not in decimals. If your efficiency is "0.8", put "80".'
                    }
                  />
                  <Input
                    value={charger.chargerEfficiency}
                    type="number"
                    max={100}
                    min={1}
                    onChange={(e) =>
                      setCharger({
                        ...charger,
                        chargerEfficiency: +e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {charger.chargerConnectorType === "AC" && (
                <div className="w-1/2 flex flex-col gap-2">
                  <FormLabel
                    label={t.chargerType[language] || "Charger Type"}
                  />
                  <Select
                    defaultValue={charger.chargerType}
                    onValueChange={(e) =>
                      setCharger({
                        ...charger,
                        chargerType: e,
                        chargerKwPower: 0,
                        chargerPhase: "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.select[language] || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t.chargerType[language] || "Charger Type"}
                        </SelectLabel>
                        <SelectItem value="single-phase">
                          {t.singlePhase[language] || "Single-Phase"}
                        </SelectItem>
                        <SelectItem value="three-phase">
                          {t.threePhase[language] || "Three-Phase"}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {charger.chargerConnectorType === "DC" && (
                <div className="flex flex-col w-1/2 gap-2">
                  <FormLabel
                    label={t.chargerPower[language] || "Charger Power"}
                  />
                  <Input
                    type="number"
                    value={charger.chargerKwPower}
                    onChange={(e) =>
                      setCharger({
                        ...charger,
                        chargerKwPower: +e.target.value,
                      })
                    }
                    min={0}
                  />
                </div>
              )}

              {charger.chargerConnectorType === "AC" && (
                <div className="w-1/2 flex flex-col gap-2">
                  <FormLabel
                    label={t.chargerPower[language] || "Charger Power"}
                  />
                  <Select
                    defaultValue={charger.chargerKwPower.toString()}
                    onValueChange={(e) =>
                      setCharger({ ...charger, chargerKwPower: +e })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.select[language] || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t.chargerPower[language] || "Charger Power"}
                        </SelectLabel>
                        {charger.chargerConnectorType === "AC" &&
                          charger.chargerType === "single-phase" && (
                            <>
                              <SelectItem value="3.7">3.7 KW</SelectItem>
                              <SelectItem value="7.4">7.4 KW</SelectItem>
                            </>
                          )}
                        {charger.chargerConnectorType === "AC" &&
                          charger.chargerType === "three-phase" && (
                            <>
                              <SelectItem value="11">11 KW</SelectItem>
                              <SelectItem value="12">12 KW</SelectItem>
                            </>
                          )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="w-1/2 flex flex-col gap-2">
                <FormLabel label={t.ocppVersion[language] || "OCPP Version"} />
                <Select
                  defaultValue={charger.chargerSupportOCPP}
                  onValueChange={(e) =>
                    setCharger({ ...charger, chargerSupportOCPP: e })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t.ocppVersion[language] || "OCPP Version"}
                      </SelectLabel>
                      <SelectItem value="1.6">1.6</SelectItem>
                      <SelectItem value="2.0">2.0</SelectItem>
                      <SelectItem value="2.0.1">2.0.1</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <FormLabel
                  label={
                    charger.chargerType === "single-phase"
                      ? `${t.singlePhase[language]} config.` ||
                        "Single-phase config."
                      : `${t.threePhase[language]} config.` ||
                        "Three-phase config."
                  }
                />
                <Select
                  defaultValue={charger.chargerPhase}
                  onValueChange={(e) =>
                    setCharger({ ...charger, chargerPhase: e })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.select[language] || "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t.configuration[language] || "Configuration"}
                      </SelectLabel>

                      {(charger.chargerConnectorType === "DC" ||
                        (charger.chargerConnectorType === "AC" &&
                          charger.chargerType === "single-phase")) && (
                        <>
                          <SelectItem value="L1">L1</SelectItem>
                          <SelectItem value="L2">L2</SelectItem>
                          <SelectItem value="L3">L3</SelectItem>
                        </>
                      )}

                      {charger.chargerConnectorType === "AC" &&
                        charger.chargerType === "three-phase" && (
                          <>
                            <SelectItem value="L1-L2-L3">
                              L1 - L2 - L3
                            </SelectItem>
                            <SelectItem value="L2-L3-L1">
                              L2 - L3 - L1
                            </SelectItem>
                            <SelectItem value="L3-L1-L2">
                              L3 - L1 - L2
                            </SelectItem>
                          </>
                        )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <FormLabel label={t.priority[language] || "Priority"} />
                <Select
                  defaultValue={charger.chargerPriority}
                  onValueChange={(e) =>
                    setCharger({ ...charger, chargerPriority: e })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.select[language] || "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t.priority[language] || "Priority"}
                      </SelectLabel>
                      <SelectItem value="1">
                        {t.high[language] || "High"}
                      </SelectItem>
                      <SelectItem value="2">
                        {t.medium[language] || "Medium"}
                      </SelectItem>
                      <SelectItem value="3">
                        {t.low[language] || "Low"}
                      </SelectItem>
                      <SelectItem value="4">
                        {t.veryLow[language] || "Very Low"}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <FormLabel
                  label={t.multiconector[language] || "Multiconector"}
                />
                <RadioGroup
                  // defaultValue="false"
                  value={charger.connectorId === 0 ? "false" : "true"}
                  className="flex gap-3"
                  onValueChange={(e) =>
                    setCharger({
                      ...charger,
                      multiConector: e,
                      connectorId: e === "false" ? 0 : 1,
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="option-one" />
                    <Label htmlFor="option-one">
                      {t.yes[language] || "Yes"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="option-two" />
                    <Label htmlFor="option-two">{t.no[language] || "No"}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div
                className={cn(
                  "flex flex-col w-1/2 gap-2",
                  charger.multiConector === "true" ? "" : "opacity-25"
                )}
              >
                <FormLabel label={t.connectorId[language] || "Connector ID"} />
                <Input
                  type="number"
                  value={charger.connectorId}
                  onChange={(e) => {
                    setCharger({ ...charger, connectorId: +e.target.value });
                  }}
                  max={10}
                  min={0}
                  // disabled={charger.multiConector !== "true"}
                  disabled={charger.connectorId === 0 ? true : false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-1 gap-2 pr-5 pb-3">
          <ModalClose onClick={() => setCharger(DEFAULT_CHARGER)} />

          {/* <GlowingButton
            glowing={true}
            type="button"
            disabled={!!error}
            className={cn(
              "flex justify-center text-sm items-center font-semibold h-4 w-24 py-5 text-zinc-50",
              !!error
                ? "opacity-35 cursor-not-allowed  hover:text-slate-50"
                : ""
            )}
            onClick={addChargerRequest}
          >
            {!loading && "Add"}
            {loading && <div className="loader"></div>}
          </GlowingButton> */}

          <button
            type="button"
            disabled={!!error}
            className={cn(
              "flex justify-center rounded-full text-sm items-center font-semibold shadow-none h-4 w-24 py-5 bg-slate-950 text-zinc-50 hover:bg-slate-900 hover:text-zinc-50",
              !!error
                ? "opacity-35 cursor-not-allowed hover:bg-slate-950 hover:text-slate-50"
                : ""
            )}
            onClick={addChargerRequest}
          >
            {!loading && (t.add[language] || "Add")}
            {loading && <div className="loader"></div>}
          </button>

          <ModalAccept
            ref={closeRef}
            onClick={() => {}}
            label="Add"
            className="absolute opacity-0 -translate-x-[10000px] "
          />
        </div>
      </form>
    </Modal>
  );
});

export default AddChargerForm;
