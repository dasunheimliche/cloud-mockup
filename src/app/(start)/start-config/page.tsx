"use client";

import { API_URL } from "@/lib/config";
import { useEffect, useState } from "react";
import Welcome from "./components/welcome";
import UrlConfig from "./components/url-config";
import ChargeDistributionConfig from "./components/charge-distribution-config";
import PvChargeDistributionConfig from "./components/pv-charge-distribution-config";
import PowerPriorityConfig from "./components/power-priority-config";
import Success from "./components/success";
import { Toaster } from "@/components/ui/toaster";
import GeneralSettings from "./components/general-settings";
import ContactSettings from "./components/contactSettings";
import sessionStore from "@/stores/session-store";
import authAxios from "@/lib/api";
import EnergyPricing from "./components/energy-pricing";
import Loading from "@/components/loading";

export default function Page() {
  const { isConfigured, token } = sessionStore();

  const [step, setStep] = useState<number>(0);

  const [loadingRequest, setLoadingRequest] = useState<any>(false);

  const [apiUrl, setApiUrl] = useState<any>(API_URL);
  const [installationUrl, setInstallationUrl] = useState<any>(
    "http:127.0.0.1:6666"
  );
  const [pvUrl, setPVUrl] = useState<any>("http://127.0.0.1:2222");
  const [thirdPartyBackendUrl, setThirdPartyBackendUrl] = useState<any>(
    "wss://backend.evasoft.app"
  );

  const [hydrated, setHydrated] = useState<boolean>(false);

  const URLS = {
    apiUrl,
    installationUrl,
    pvUrl,
    thirdPartyBackendUrl,
  };

  const [mainDistributionLimitA, setMainDistributionLimitA] =
    useState<any>(250);
  const [mainDistributionLimitB, setMainDistributionLimitB] =
    useState<any>(250);
  const [mainDistributionLimitC, setMainDistributionLimitC] =
    useState<any>(250);

  const [subDistributionLimitA, setSubDistributionLimitA] = useState<any>(150);
  const [subDistributionLimitB, setSubDistributionLimitB] = useState<any>(150);
  const [subDistributionLimitC, setSubDistributionLimitC] = useState<any>(150);

  const [operatorSubDistributionLimitA, setOperatorSubDistributionLimitA] =
    useState<any>(50);
  const [operatorSubDistributionLimitB, setOperatorSubDistributionLimitB] =
    useState<any>(50);
  const [operatorSubDistributionLimitC, setOperatorSubDistributionLimitC] =
    useState<any>(50);

  const [ExternalLoadFallBackA, setExternalLoadFallBackA] = useState<any>(null);
  const [ExternalLoadFallBackB, setExternalLoadFallBackB] = useState<any>(null);
  const [ExternalLoadFallBackC, setExternalLoadFallBackC] = useState<any>(null);

  const CHARGE_DISTRIBUTION = {
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
  };

  const [PVInstalledA, setPVInstalledA] = useState<any>(250);
  const [PVInstalledB, setPVInstalledB] = useState<any>(250);
  const [PVInstalledC, setPVInstalledC] = useState<any>(250);

  const PV_CHARGE_DISTRIBUTION = {
    PVInstalledA,
    PVInstalledB,
    PVInstalledC,
  };

  const [maximumAllEVSEA, setMaximumAllEVSEA] = useState<any>(32);
  const [MinimumAllEVSE, setMinimumAllEVSE] = useState<any>(6);
  const [onlyPV, setOnlyPV] = useState<any>(false);
  const [viewInKw, setViewInKw] = useState<any>(false);
  const [factorPower, setFactorPower] = useState<any>(80);
  const [hasPV, setHasPV] = useState<boolean>(false);
  const [phaseType, setPhaseType] = useState<string>("single-phase");
  const [userManagement, setUserManagement] = useState<boolean>(false);

  const GENERAL = {
    hasPV,
    viewInKw,
    phaseType,
    factorPower,
    maximumAllEVSEA,
    MinimumAllEVSE,
    userManagement,
  };

  const [minimumPriorityOne, setMinimumPriorityOne] = useState<any>(100);
  const [minimumPriorityTwo, setMinimumPriorityTwo] = useState<any>(90);
  const [minimumPriorityThree, setMinimumPriorityThree] = useState<any>(60);
  const [minimumPriorityFour, setMinimumPriorityFour] = useState<any>(20);

  const POWER_PRIORITY = {
    minimumPriorityOne,
    minimumPriorityTwo,
    minimumPriorityThree,
    minimumPriorityFour,
  };

  const [operatorName, setOperatorName] = useState<string>("");
  const [operatorEmail, setOperatorEmail] = useState<string>("");
  const [configuredBy, setConfiguredBy] = useState<string>("");

  const OPERATOR = {
    operatorName,
    operatorEmail,
    configuredBy,
  };

  const [currency, setCurrency] = useState<string>("eur");
  const [kWhAcPrice, setKwhAcPrice] = useState<number>(0.08);
  const [kWhDcPrice, setKwhDcPrice] = useState<number>(0.09);

  const PRICES = {
    currency,
    kWhAcPrice,
    kWhDcPrice,
  };

  async function saveConfig(operatorName: any, operatorEmail: any) {
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

    const res = await authAxios.put(
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

    setLoadingRequest(false);
  }

  function handleNext() {
    if (!hasPV && step === 4) {
      setStep(6);
      return;
    }

    if (step === 8) {
      return;
    }

    setStep((prev) => {
      if (prev === 8) return 8;

      return prev + 1;
    });
  }

  function handleReturn() {
    if (!hasPV && step === 5) {
      setStep(3);
      return;
    }

    setStep((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }

  function handleSetUrls(options: any) {
    setApiUrl(options.apiUrl);
    setInstallationUrl(options.installationUrl);
    setPVUrl(options.pvUrl);
    setThirdPartyBackendUrl(options.thirdPartyBackendUrl);
  }

  function handleSetGeneral(options: any) {
    setMaximumAllEVSEA(options.maximumAllEVSEA);
    setMinimumAllEVSE(options.MinimumAllEVSE);
    setViewInKw(options.viewInKw);
    setFactorPower(options.factorPower);
    setHasPV(options.hasPV);
    setPhaseType(options.phaseType);
    setUserManagement(options.userManagement);
  }

  function handleSetChargeDistribution(options: any) {
    console.log("OPTIONSSSS CHARGE DISTRIBUTION: ", options);
    setMainDistributionLimitA(options.mainDistributionLimitA);
    setMainDistributionLimitB(options.mainDistributionLimitB);
    setMainDistributionLimitC(options.mainDistributionLimitC);
    setSubDistributionLimitA(options.subDistributionLimitA);
    setSubDistributionLimitB(options.subDistributionLimitB);
    setSubDistributionLimitC(options.subDistributionLimitC);
    setOperatorSubDistributionLimitA(options.operatorSubDistributionLimitA);
    setOperatorSubDistributionLimitB(options.operatorSubDistributionLimitB);
    setOperatorSubDistributionLimitC(options.operatorSubDistributionLimitC);
    setExternalLoadFallBackA(options.ExternalLoadFallBackA);
    setExternalLoadFallBackB(options.ExternalLoadFallBackB);
    setExternalLoadFallBackC(options.ExternalLoadFallBackC);
  }

  function handleSetPvChargeDistribution(options: any) {
    setPVInstalledA(options.PVInstalledA);
    setPVInstalledB(options.PVInstalledB);
    setPVInstalledC(options.PVInstalledC);
  }

  function handleSetPowerPriority(options: any) {
    setMinimumPriorityOne(options.minimumPriorityOne);
    setMinimumPriorityTwo(options.minimumPriorityTwo);
    setMinimumPriorityThree(options.minimumPriorityThree);
    setMinimumPriorityFour(options.minimumPriorityFour);
  }

  function handleSetContact(options: any) {
    setOperatorName(options.operatorName);
    setOperatorEmail(options.operatorEmail);
    setConfiguredBy(options.configuredBy);
  }

  function handleSetPrices(options: any) {
    setCurrency(options.currency);
    setKwhAcPrice(options.kWhAcPrice);
    setKwhDcPrice(options.kWhDcPrice);
  }

  const configuration = {
    MainDistributionLimit: [
      mainDistributionLimitA,
      mainDistributionLimitB,
      mainDistributionLimitC,
    ],
    SubDistributionLimit: [
      subDistributionLimitA,
      subDistributionLimitB,
      subDistributionLimitC,
    ],
    OperatorSubDistributionLimit: [
      operatorSubDistributionLimitA,
      operatorSubDistributionLimitB,
      operatorSubDistributionLimitC,
    ],
    ExternalLoadFallback: [
      ExternalLoadFallBackA,
      ExternalLoadFallBackB,
      ExternalLoadFallBackC,
    ],
    hasPV: [hasPV],
    InstallationType: [phaseType],
    PVInstalled: [PVInstalledA, PVInstalledB, PVInstalledC],
    MaximumAllEVSE: [maximumAllEVSEA],
    MinimumPriorityOneEVSE: [minimumPriorityOne],
    MinimumPriorityTwoEVSE: [minimumPriorityTwo],
    MinimumPriorityThreeEVSE: [minimumPriorityThree],
    MinimumPriorityFourEVSE: [minimumPriorityFour],
    MinimumAllEVSE: [MinimumAllEVSE],
    OnlyPV: [onlyPV],
    ViewInKw: [viewInKw],
    InstallationUrl: [installationUrl],
    PVUrl: [pvUrl],
    ThirdPartyBackendUrl: [thirdPartyBackendUrl],
    FactorPower: [factorPower],
    ManagerName: [operatorName],
    ManagerEmail: [operatorEmail],
    ConfiguredBy: [configuredBy],
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (isConfigured && step < 7) return <Loading />;

  return (
    <>
      {step === 0 && <Welcome onContinue={handleNext} />}
      {step === 1 && (
        <GeneralSettings
          general={GENERAL}
          onSetGeneral={handleSetGeneral}
          onContinue={handleNext}
          onReturn={handleReturn}
        />
      )}
      {step === 2 && (
        <EnergyPricing
          prices={PRICES}
          onSetPrices={handleSetPrices}
          onContinue={handleNext}
          onReturn={handleReturn}
        />
      )}
      {step === 3 && (
        <UrlConfig
          urls={URLS}
          hasPV={hasPV}
          onContinue={handleNext}
          onReturn={handleReturn}
          onSetUrls={handleSetUrls}
        />
      )}
      {step === 4 && (
        <ChargeDistributionConfig
          chargeDistribution={CHARGE_DISTRIBUTION}
          onContinue={handleNext}
          onReturn={handleReturn}
          onSetChargeDistribution={handleSetChargeDistribution}
          phaseType={phaseType}
        />
      )}
      {step === 5 && (
        <PvChargeDistributionConfig
          pvChargeDistribution={PV_CHARGE_DISTRIBUTION}
          onContinue={handleNext}
          onReturn={handleReturn}
          onSetPvChargeDistribution={handleSetPvChargeDistribution}
          phaseType={phaseType}
        />
      )}
      {step === 6 && (
        <PowerPriorityConfig
          powerPriority={POWER_PRIORITY}
          onSetPowerPriority={handleSetPowerPriority}
          onReturn={handleReturn}
          onContinue={handleNext}
          isLoading={loadingRequest}
          setIsLoading={setLoadingRequest}
        />
      )}
      {step === 7 && (
        <ContactSettings
          contact={OPERATOR}
          onSetContact={handleSetContact}
          onSaveConfig={saveConfig}
          onReturn={handleReturn}
          onContinue={handleNext}
          isLoading={loadingRequest}
          setIsLoading={setLoadingRequest}
        />
      )}
      {step === 8 && <Success configuration={configuration} />}
      <Toaster />
    </>
  );
}
