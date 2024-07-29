"use client";
import { AiOutlinePercentage } from "react-icons/ai";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Select from "@mui/material/Select";
// import { API_URL, DEFAULT_URL } from "@/lib/config";
import PageHeader from "@/components/page-header";
import SaveButton from "./components/save-button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import FormLabel from "@/components/form-label";
import { Separator } from "@/components/ui/separator";
import useDebounce from "@/hooks/useDebounce";
import ConfigIcon from "@/components/config-icon";
import ConfigTitle from "./components/config-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import EvaID from "./components/eva-id";
import UpdateApiButton from "./components/update-api-button";
import UpdateAlgorithmButton from "./components/update-algorithm-buttom";
import ConfigInput from "@/components/confing-input";
import ConfigSection from "./components/config-section";
import { PiLineVerticalLight } from "react-icons/pi";
import PingIndicator from "./components/ping-indicator";
import authAxios from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { MdAttachMoney } from "react-icons/md";
import PingLost from "@/components/ping-lost";
import usePingChecker from "@/hooks/usePingChecker";
import { AUTH_URL } from "@/lib/config";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/configurations";
import LanguageSelector from "@/components/language-selector";

export default function ConfigurationContentPage(props: any) {
  const [loadingRequest, setLoadingRequest] = useState<any>(false);
  const { token } = sessionStore();

  const { toast } = useToast();

  const { language } = useLangStore();

  //! ESTADOS DE LOS INPUTS

  const [configs, setConfigs] = useState<any>(null);

  const isConnected = usePingChecker(AUTH_URL!);

  const [hasPV, setHasPV] = useState<boolean>(false);
  const [phaseType, setPhaseType] = useState<string>("single-phase");
  const [operatorName, setOperatorName] = useState<string>("");
  const [operatorEmail, setOperatorEmail] = useState<string>("");

  //! Variables estado para los inputs.
  const [mainDistributionLimitA, setMainDistributionLimitA] =
    useState<any>(null);
  const [mainDistributionLimitB, setMainDistributionLimitB] =
    useState<any>(null);
  const [mainDistributionLimitC, setMainDistributionLimitC] =
    useState<any>(null);

  const [subDistributionLimitA, setSubDistributionLimitA] = useState<any>(null);
  const [subDistributionLimitB, setSubDistributionLimitB] = useState<any>(null);
  const [subDistributionLimitC, setSubDistributionLimitC] = useState<any>(null);

  const [operatorSubDistributionLimitA, setOperatorSubDistributionLimitA] =
    useState<any>(null);
  const [operatorSubDistributionLimitB, setOperatorSubDistributionLimitB] =
    useState<any>(null);
  const [operatorSubDistributionLimitC, setOperatorSubDistributionLimitC] =
    useState<any>(null);

  const [ExternalLoadFallBackA, setExternalLoadFallBackA] = useState<any>(null);
  const [ExternalLoadFallBackB, setExternalLoadFallBackB] = useState<any>(null);
  const [ExternalLoadFallBackC, setExternalLoadFallBackC] = useState<any>(null);

  const [PVInstalledA, setPVInstalledA] = useState<any>(null);
  const [PVInstalledB, setPVInstalledB] = useState<any>(null);
  const [PVInstalledC, setPVInstalledC] = useState<any>(null);

  const [maximumAllEVSEA, setMaximumAllEVSEA] = useState<any>(null);

  const [minimumPriorityOne, setMinimumPriorityOne] = useState<any>(null);
  const [minimumPriorityTwo, setMinimumPriorityTwo] = useState<any>(null);
  const [minimumPriorityThree, setMinimumPriorityThree] = useState<any>(null);
  const [minimumPriorityFour, setMinimumPriorityFour] = useState<any>(null);

  const [MinimumAllEVSE, setMinimumAllEVSE] = useState<any>(null);

  const [onlyPV, setOnlyPV] = useState<any>(null);
  const [viewInKw, setViewInKw] = useState<any>(null);

  const [installationUrl, setInstallationUrl] = useState<any>(null);
  const [pvUrl, setPVUrl] = useState<any>(null);
  const [thirdPartyBackendUrl, setThirdPartyBackendUrl] = useState<any>(null);
  const [factorPower, setFactorPower] = useState<any>(null);

  const [userManagement, setUserManagement] = useState<any>(null);
  const [currency, setCurrency] = useState<any>(null);
  const [kWhAcPrice, setKwhAcPrice] = useState<any>(null);
  const [kWhDcPrice, setKwhDcPrice] = useState<any>(null);

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

  useDebounce(
    minimumPriorityOne,
    minimumPriorityTwo,
    setMinimumPriorityTwo,
    700
  );

  useDebounce(
    minimumPriorityTwo,
    minimumPriorityThree,
    setMinimumPriorityThree,
    700
  );

  useDebounce(
    minimumPriorityThree,
    minimumPriorityFour,
    setMinimumPriorityFour,
    700
  );

  function calculateExternalLoadFallback() {
    setExternalLoadFallBackA(
      mainDistributionLimitA - operatorSubDistributionLimitA
    );
    setExternalLoadFallBackB(
      mainDistributionLimitB - operatorSubDistributionLimitB
    );
    setExternalLoadFallBackC(
      mainDistributionLimitC - operatorSubDistributionLimitC
    );
  }

  async function loadConfigs() {
    try {
      const resConfigs = await authAxios.get("/configs/get/all/", {
        headers: {
          Authorization: token,
        },
      });

      const config = resConfigs.data.response;
      setConfigs(config);

      console.log("CONFIIIG: ", config);

      setUserManagement(config.UserManagement);
      setKwhAcPrice(config.kwhACPrice);
      setKwhDcPrice(config.kwhDCPrice);
      setCurrency(config.Currency);

      setMainDistributionLimitA(config.MainDistributionLimit[0]);
      setMainDistributionLimitB(config.MainDistributionLimit[1]);
      setMainDistributionLimitC(config.MainDistributionLimit[2]);

      setSubDistributionLimitA(config.SubDistributionLimit[0]);
      setSubDistributionLimitB(config.SubDistributionLimit[1]);
      setSubDistributionLimitC(config.SubDistributionLimit[2]);

      setOperatorSubDistributionLimitA(config.OperatorSubDistributionLimit[0]);
      setOperatorSubDistributionLimitB(config.OperatorSubDistributionLimit[1]);
      setOperatorSubDistributionLimitC(config.OperatorSubDistributionLimit[2]);

      setExternalLoadFallBackA(config.ExternalLoadFallback[0]);
      setExternalLoadFallBackB(config.ExternalLoadFallback[1]);
      setExternalLoadFallBackC(config.ExternalLoadFallback[2]);

      setPVInstalledA(config.PVInstalled[0]);
      setPVInstalledB(config.PVInstalled[1]);
      setPVInstalledC(config.PVInstalled[2]);

      setOnlyPV(config.OnlyPV);

      setMaximumAllEVSEA(config.MaximumAllEVSE);
      setMinimumAllEVSE(config.MinimumAllEVSE);

      setMinimumPriorityOne(config.MinimumPriorityOneEVSE);
      setMinimumPriorityTwo(config.MinimumPriorityTwoEVSE);
      setMinimumPriorityThree(config.MinimumPriorityThreeEVSE);
      setMinimumPriorityFour(config.MinimumPriorityFourEVSE);

      setHasPV(config.hasPV);

      setPhaseType(config.InstallationType);

      setOperatorName(config.ManagerName);
      setOperatorEmail(config.ManagerEmail);

      setViewInKw(config.ViewInKw ? "True" : "False");
      setInstallationUrl(config.InstallationUrl);
      setPVUrl(config.PVUrl);
      setThirdPartyBackendUrl(config.ThirdPartyBackendUrl);

      setFactorPower(config.FactorPower);
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          t.toast.loadingError[language] ||
          "Something went wrong when loading your configuration data",
      });
      console.log(error);
    }
  }

  async function saveConfig() {
    setLoadingRequest(true);

    var data = {
      MainDistributionLimit: [
        +mainDistributionLimitA,
        +mainDistributionLimitB,
        +mainDistributionLimitC,
      ],
      SubDistributionLimit: [
        +subDistributionLimitA,
        +subDistributionLimitB,
        +subDistributionLimitC,
      ],
      OperatorSubDistributionLimit: [
        +operatorSubDistributionLimitA,
        +operatorSubDistributionLimitB,
        +operatorSubDistributionLimitC,
      ],
      ExternalLoadFallback: [
        +ExternalLoadFallBackA,
        +ExternalLoadFallBackB,
        +ExternalLoadFallBackC,
      ],
      hasPV: hasPV,
      InstallationType: phaseType,
      PVInstalled: [+PVInstalledA, +PVInstalledB, +PVInstalledC],
      MaximumAllEVSE: +maximumAllEVSEA,
      MinimumPriorityOneEVSE: +minimumPriorityOne,
      MinimumPriorityTwoEVSE: +minimumPriorityTwo,
      MinimumPriorityThreeEVSE: +minimumPriorityThree,
      MinimumPriorityFourEVSE: +minimumPriorityFour,
      MinimumAllEVSE: +MinimumAllEVSE,
      OnlyPV: onlyPV,
      ViewInKw: viewInKw,
      InstallationUrl: installationUrl,
      PVUrl: pvUrl,
      ThirdPartyBackendUrl: thirdPartyBackendUrl,
      FactorPower: +factorPower,
      ManagerName: operatorName,
      ManagerEmail: operatorEmail,

      Currency: currency,
      kwhACPrice: +kWhAcPrice,
      kwhDCPrice: +kWhDcPrice,
      UserManagement: userManagement,
    };

    try {
      await authAxios.put(
        "/configs/set/all",
        {
          data: data,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        variant: "success",
        title:
          t.toast.successSave[language] || "Configuration saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          t.toast.failedSave[language] ||
          "Something went wrong saving your configuration",
      });
    }

    setLoadingRequest(false);
  }

  var [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateExternalLoadFallback();
    if (loading) {
      loadConfigs();
      setLoading(false);
    }
  }, [loadConfigs, setLoading]);

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

  /* TEEEST */

  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div></div>;

  return (
    <div className="flex flex-col w-full max-h-[100vh] h-full justify-start items-center px-0 bg-bluewhite">
      <PageHeader>
        <div className="flex flex-row items-center justify-center gap-2 max-sm:w-min">
          <h2 className="text-[1.7rem] font-medium mr-0 max-sm:text-[1.5rem] max-sm:w-max  uppercase">
            {t.title[language] || "CONFIGURATIONS"}
          </h2>
        </div>
        <SaveButton isLoading={loadingRequest} onClick={saveConfig} />
      </PageHeader>

      <ScrollArea
        style={{ minHeight: "calc(100vh - 6rem)" }}
        className={cn(
          "flex flex-row justify-center items-center flex-wrap relative rounded-[0.5rem]  flex-1 w-full",
          "min-h-[76vh] rounded-none shadow-md max-sm:mb-28"
        )}
      >
        {(!configs || !isConnected) && <PingLost />}

        {configs && isConnected && (
          <div className="h-full w-full flex flex-col justify-start items-center relative rounded-[0.5rem] max-lg:pt-20 p-14 pb-40 box-border overflow-y-auto max-lg:p-7 max-lg:pb-28">
            {/* GENERAL CONFIG */}
            <LanguageSelector />
            <ConfigSection>
              <ConfigTitle label={t.general.header[language] || "GENERAL"} />

              <div className="w-full flex gap-8">
                <div
                  className={cn(
                    "flex flex-col justify-between pt-0 w-1/2 gap-3",
                    !hasPV ? "w-1/4" : ""
                  )}
                >
                  <FormLabel
                    label={t.general.pvInstalled[language] || "PV Installed"}
                    className="text-sm font-semibold opacity-90"
                    tooltip={
                      t.general.pvInstalledTool[language] ||
                      "Please indicate if your facility has photovoltaic generation. If you enable this option, you will need to configure the URL of your energy meter, and our algorithm will start taking it into account."
                    }
                  />
                  <Switch
                    onChange={(e) => {
                      console.log("EEE EVENT: ", e.target.checked);
                      if (!e.target.checked) {
                        setOnlyPV(false);
                      }
                      setHasPV(!hasPV);
                    }}
                    name="switchsimulate"
                    checked={hasPV}
                  />
                </div>
                <div className="w-full flex gap-8">
                  <div className="flex flex-col justify-between pt-0 w-1/4 gap-3">
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
                </div>
              </div>

              <div className="w-full flex gap-8">
                <div
                  className={cn(
                    "flex flex-col justify-between pt-0  w-1/2 gap-3",
                    !hasPV ? "w-1/2" : ""
                  )}
                >
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={
                      t.general.preferredUnit[language] ||
                      "Preferred unit of measurement"
                    }
                    tooltip={
                      t.general.preferredUnitTool[language] ||
                      "What unit of measurement will be used to display the power in the energy interaction graph."
                    }
                  />
                  <Select
                    labelId="unit-favorite"
                    id="unit-favorite"
                    value={viewInKw}
                    size="small"
                    onChange={(e) => {
                      setViewInKw(e.target.value);
                    }}
                  >
                    <MenuItem value={"True"}>
                      {t.general.preferredUnitOptions[language][1] ||
                        "Kilowatts"}
                    </MenuItem>
                    <MenuItem value={"False"}>
                      {t.general.preferredUnitOptions[language][0] || "Ampers"}
                    </MenuItem>
                  </Select>
                </div>

                <div className="flex flex-col justify-between pt-0 w-1/2 gap-3">
                  <FormLabel
                    label={
                      t.general.installationType[language] ||
                      "Installation Type"
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
                <div className="w-1/3 flex flex-col gap-5">
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

                <div className="w-1/3 flex flex-col gap-5">
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
                <div
                  className={cn(
                    "flex flex-col justify-between pt-0 w-1/3 gap-3",
                    !hasPV ? "w-1/2" : ""
                  )}
                >
                  <FormLabel
                    label={t.general.factor[language] || "Factor Power"}
                    className="text-sm font-semibold opacity-90"
                  />
                  <Input
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
            </ConfigSection>

            <Separator className="w-full h-[1px] bg-[#42424218] my-12" />

            <ConfigSection>
              <ConfigTitle label={t.princing.header[language] || "PRICING"} />

              <div className="flex flex-col gap-6 animate-[fade_0.75s_cubic-bezier(0.215,0.61,0.355,1)]">
                <div className="w-full flex gap-8">
                  <div className="flex flex-col justify-between pt-0 w-1/2 gap-3 max-lg:w-full">
                    <FormLabel
                      label={t.princing.currency[language] || "Currency"}
                      className="text-sm font-semibold opacity-90"
                      tooltip="Please indicate if your facility is single-phase or three-phase, as this will affect the fields you see in the phase configurations. If you plan to install both single-phase and three-phase chargers, select the three-phase option."
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
                        {t.princing.currencyOptions[language][1] ||
                          "Pund Sterling"}
                      </MenuItem>
                      <MenuItem value={"chf"}>
                        {t.princing.currencyOptions[language][2] ||
                          "Swiss Franc"}
                      </MenuItem>
                      <MenuItem value={"usd"}>
                        {t.princing.currencyOptions[language][3] || "US Dollar"}
                      </MenuItem>
                      <MenuItem value={"mxn"}>
                        {t.princing.currencyOptions[language][4] ||
                          "Mexican Peso"}
                      </MenuItem>
                      <MenuItem value={"cop"}>
                        {t.princing.currencyOptions[language][5] ||
                          "Colombian Peso"}
                      </MenuItem>
                    </Select>
                  </div>
                  <div className="flex flex-col justify-between pt-0 w-1/2 gap-3 max-lg:hidden"></div>
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
            </ConfigSection>

            <Separator className="w-full h-[1px] bg-[#42424218] my-12" />

            {/* API URLS CONFIG */}

            <ConfigSection>
              <ConfigTitle
                label={t.endpoints.header[language] || "ENDPOINTS"}
              />
              <div className="w-full flex justify-between gap-12 relative max-lg:gap-6 max-lg:flex-col">
                <div className="w-1/2 flex gap-3 max-lg:w-full">
                  <ConfigIcon>
                    <Image src={"/icons/grid1.png"} alt="grid icon" fill />
                  </ConfigIcon>

                  <div className="flex flex-col justify-between pt-1  w-full">
                    <FormLabel
                      className="text-sm font-semibold opacity-90"
                      label={
                        t.endpoints.powerMeter[language] ||
                        "Building Power Meter"
                      }
                      tooltip={
                        t.endpoints.powerMeterTooltip[language] ||
                        "URL of access to the power meter of the installation."
                      }
                    />
                    <ConfigInput
                      icon={
                        <PingIndicator
                          key={installationUrl}
                          url={installationUrl}
                        />
                      }
                      type="text"
                      value={installationUrl}
                      onChange={(e) => setInstallationUrl(e.target.value)}
                    />
                  </div>
                </div>

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

                    <ConfigInput
                      icon={
                        <PingIndicator
                          key={thirdPartyBackendUrl}
                          url={thirdPartyBackendUrl}
                        />
                      }
                      type="text"
                      value={thirdPartyBackendUrl}
                      onChange={(e) => setThirdPartyBackendUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between gap-12 relative max-lg:gap-6 max-lg:flex-col">
                {hasPV === true && (
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

                      <ConfigInput
                        icon={<PingIndicator key={pvUrl} url={pvUrl} />}
                        type="text"
                        value={pvUrl}
                        onChange={(e) => setPVUrl(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="w-1/2 flex gap-3 max-lg:w-full max-lg:hidden"></div>
              </div>
            </ConfigSection>

            <Separator className="w-full h-[1px] bg-[#42424218] my-12" />

            <ConfigSection>
              <ConfigTitle
                label={t.distribution.header[language] || "DISTRIBUTION LIMITS"}
              />

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
                        t.distribution.main[language] ||
                        "Main distribution limit"
                      }
                      tooltip={
                        t.distribution.mainTooltip[language] ||
                        "Es la potencia máxima de la instalación. El algoritmo tendrá este valor como referencia para no superarlo."
                      }
                    />
                  </div>

                  <div className="flex w-full gap-6 items-center max-lg:gap-3">
                    <ConfigInput
                      icon={<div>A</div>}
                      type="number"
                      min={0}
                      value={mainDistributionLimitA}
                      onChange={(e) => {
                        setMainDistributionLimitA(parseInt(e.target.value));
                        calculateExternalLoadFallback();
                      }}
                    />
                    {phaseType === "three-phase" && (
                      <ConfigInput
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
                    className="w-2/3 max-lg:w-full absolute top-0 h-[1px] rounded-2xl flex items-center"
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
                  <div className="flex w-full gap-6 items-center  max-lg:gap-3">
                    <ConfigInput
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
                        calculateExternalLoadFallback();
                      }}
                    />
                    {phaseType === "three-phase" && (
                      <ConfigInput
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
                    className="w-1/3 max-lg:w-full absolute top-0 h-[1px] rounded-2xl flex items-center"
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
                        "If you need to set a limit within the Sub-Distribution Limit itself, set this below the Sub Distribution value. Set this value equal to the Sub Distribution if you want to generate another sub-limit. This value cannot be greater than the main limit."
                      }
                    />
                  </div>
                  <div className="flex w-full gap-6 items-center  max-lg:gap-3">
                    <ConfigInput
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
                        calculateExternalLoadFallback();
                      }}
                    />
                    {phaseType === "three-phase" && (
                      <ConfigInput
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

              <div className="w-full flex flex-col gap-5">
                <div className="w-full flex gap-3">
                  <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                    <FormLabel
                      className="text-sm font-semibold opacity-90"
                      label={
                        t.distribution.loadFallback[language] ||
                        "External Load Fallback."
                      }
                      tooltip={
                        t.distribution.loadFallbackTooltip[language] ||
                        "This value determines what part of the installation is allocated to the rest of the installation, not to the chargers. It is the difference between the Main Distribution Limit and the Sub Distribution Limit."
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full gap-6 items-center  max-lg:gap-3">
                  <ConfigInput
                    icon={<div>A</div>}
                    type="number"
                    disabled
                    value={ExternalLoadFallBackA}
                  />
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      icon={<div>A</div>}
                      type="number"
                      value={ExternalLoadFallBackB}
                      disabled
                    />
                  )}
                  {phaseType === "three-phase" && (
                    <ConfigInput
                      icon={<div>A</div>}
                      type="number"
                      disabled
                      value={ExternalLoadFallBackC}
                    />
                  )}
                </div>
              </div>
            </ConfigSection>
            <Separator className="w-full h-[1px] bg-[#42424218] my-12" />
            {hasPV && (
              <ConfigSection>
                <ConfigTitle
                  label={
                    t.pvDistribution.header[language] || "PHOTOVOLTAIC SYSTEM"
                  }
                />

                <div className="w-full flex flex-col gap-5">
                  {hasPV && (
                    <div className="flex flex-col justify-between pt-0 w-1/2 gap-3">
                      <FormLabel
                        label={
                          t.pvDistribution.onlyPv[language] ||
                          "Charge only with PV"
                        }
                        tooltip={
                          t.pvDistribution.onlyPvTooltip[language] ||
                          "If you do not want to be dependent on the mains, activate this option. The chargers will only charge if PV generation is available."
                        }
                        className="text-sm font-semibold opacity-90"
                      />
                      <Switch
                        onChange={(e) => setOnlyPV(!onlyPV)}
                        name="switchsimulate"
                        checked={onlyPV}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-5">
                  <div className="w-full flex gap-3">
                    <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                      <FormLabel
                        className="text-sm font-semibold opacity-90"
                        label={
                          t.pvDistribution.installed[language] ||
                          "PV Distribution Limits"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-6 items-center  max-lg:gap-3">
                    <ConfigInput
                      icon={<div>kw</div>}
                      type="number"
                      value={PVInstalledA}
                      onChange={(e) => {
                        setPVInstalledA(e.target.value);
                      }}
                    />
                    {phaseType === "three-phase" && (
                      <ConfigInput
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
              </ConfigSection>
            )}
            {hasPV && (
              <Separator className="w-full h-[1px] bg-[#42424218] my-12" />
            )}
            <ConfigSection>
              <ConfigTitle
                label={t.priority.header[language] || "PRIORITIES"}
              />

              <div className="w-full flex gap-8">
                <div className="flex flex-col justify-between w-1/4 gap-3">
                  <FormLabel
                    label={t.priority.high[language] || "High"}
                    className="text-sm font-semibold opacity-90"
                  />
                  <ConfigInput
                    icon={<AiOutlinePercentage />}
                    min={0}
                    max={100}
                    type="number"
                    className="w-full"
                    value={minimumPriorityOne}
                    onChange={(e) => {
                      setMinimumPriorityOne(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between w-1/4  gap-3">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.priority.medium[language] || "Medium"}
                  />
                  <ConfigInput
                    icon={<AiOutlinePercentage />}
                    min={0}
                    max={minimumPriorityOne}
                    type="number"
                    value={minimumPriorityTwo}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let final_value = value;
                      if (value > minimumPriorityOne) {
                        final_value = minimumPriorityOne;
                      }
                      setMinimumPriorityTwo(final_value);
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between w-1/4  gap-3">
                  <FormLabel
                    label={t.priority.low[language] || "Low"}
                    className="text-sm font-semibold opacity-90"
                  />
                  <ConfigInput
                    icon={<AiOutlinePercentage />}
                    min={0}
                    max={minimumPriorityTwo}
                    type="number"
                    className="w-full"
                    value={minimumPriorityThree}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let final_value = value;
                      if (value > minimumPriorityTwo) {
                        final_value = minimumPriorityTwo;
                      }
                      setMinimumPriorityThree(final_value);
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between w-1/4  gap-3">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.priority.veryLow[language] || "Very Low"}
                  />

                  <ConfigInput
                    icon={<AiOutlinePercentage />}
                    min={0}
                    max={minimumPriorityThree}
                    type="number"
                    value={minimumPriorityFour}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let final_value = value;
                      if (value > minimumPriorityThree) {
                        final_value = minimumPriorityThree;
                      }
                      setMinimumPriorityFour(final_value);
                    }}
                  />
                </div>
              </div>
            </ConfigSection>
            <Separator className="w-full h-[1px] bg-[#42424218] my-12" />

            <ConfigSection>
              <ConfigTitle label={t.contact.header[language] || "CONTACT"} />

              <div className="w-full flex gap-8 max-lg:flex-col">
                <div className="flex flex-col justify-between gap-3 w-full">
                  <FormLabel
                    label={t.contact.name[language] || "Operator Name"}
                    className="text-sm font-semibold opacity-90"
                  />
                  <ConfigInput
                    type="text"
                    className="w-full"
                    value={operatorName}
                    readOnly
                  />
                </div>

                <div className="flex flex-col justify-between   gap-3 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.contact.mail[language] || "Operator Email"}
                  />
                  <ConfigInput
                    type="text"
                    className="w-full"
                    value={operatorEmail}
                    readOnly
                  />
                </div>
              </div>
            </ConfigSection>
            <Separator className="w-full h-[1px] bg-[#42424218] my-12" />

            <ConfigSection>
              <ConfigTitle label={t.update.header[language] || "UPDATE"} />
              <div className="w-full flex gap-4">
                <UpdateApiButton /> <UpdateAlgorithmButton />
              </div>
            </ConfigSection>
            <EvaID evaId={configs.EvaId} />
          </div>
        )}
      </ScrollArea>
      <Toaster />
    </div>
  );
}
