"use client";

import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import evaImageLogo from "/public/imgs/eva-green.png";
import consumedIcon from "/public/imgs/icons/Consumed.svg";
import pvIcon from "/public/imgs/icons/PV.svg";
import buildingIcon from "/public/imgs/icons/building.svg";
import installedIcon from "/public/imgs/icons/energyInteractionBlack.svg";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Image from "next/image";
import useWebSocket from "react-use-websocket";
import { API_URL, AUTH_URL } from "@/lib/config";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/page-header";
import EnergyLine from "./components/energy-line";
import EnergySimulate from "./components/energy-simulate";
import authAxios from "@/lib/api";
import sessionStore from "@/stores/session-store";
import usePingChecker from "@/hooks/usePingChecker";
import t from "@/translations/interactions";
import useLangStore from "@/stores/lang-store";
import PingLost from "@/components/ping-lost";

export default function EnergyInteractionPage() {
  // TODO: Que podamos simular la parte de fotovoltaica y/o la perte de consumo total. Obtén el valor de cada uno con una función que devuelva True o False si es simulada cada parte. Yo modificaré y adaptaré las dos funciones para obtener los datos de la base de datos luego.

  //? Lógica.
  //? Si el consumo de los cargadores es mayor a 0 en cualquiera de las fases, la energía (una flecha o algo así), va de la energía consumida y de las baterías (si es que es mayor a cero) hacia el consumo de los cargadores.

  const [simulatePV, setSimulatePV] = useState<any>(false);
  const [simulateBuilding, setSimulateBuilding] = useState<any>(false);
  const [getApiUrl, setGetApiUrl] = useState<any>("https://api.evasoft.app");

  const { token } = sessionStore();
  const isConnected = usePingChecker(AUTH_URL!);
  const { language } = useLangStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGetApiUrl(localStorage.getItem("apiUrl") || "https://api.evasoft.app");
      console.log(getApiUrl);
    }
  }, []);

  const [configs, setConfigs] = useState<any>(null);

  const [mainDistributionLimitA, setMainDistributionLimitA] =
    useState<any>(400);
  const [mainDistributionLimitB, setMainDistributionLimitB] =
    useState<any>(400);
  const [mainDistributionLimitC, setMainDistributionLimitC] =
    useState<any>(400);

  const [PVA, setPVA] = useState<any>(400);
  const [PVB, setPVB] = useState<any>(400);
  const [PVC, setPVC] = useState<any>(400);

  const [operatorSubDistributionLimitA, setOperatorSubDistributionLimitA] =
    useState<any>(400);
  const [operatorSubDistributionLimitB, setOperatorSubDistributionLimitB] =
    useState<any>(400);
  const [operatorSubDistributionLimitC, setOperatorSubDistributionLimitC] =
    useState<any>(400);

  const [PV, setPV] = useState<any>({ L1: 0, L2: 0, L3: 0 });
  const [installed, setInstalled] = useState<any>({ L1: 0, L2: 0, L3: 0 });
  const [saved, setSaved] = useState<any>({ L1: 0, L2: 0, L3: 0 });
  const [consumed, setConsumed] = useState<any>({ L1: 0, L2: 0, L3: 0 });

  var [viewInkW, setViewInkW] = useState<any>("False");

  async function loadConfigs() {
    const retryDelay = 5000; // Tiempo de espera entre reintentos (en ms)

    while (true) {
      try {
        const response = await authAxios.get("/configs/get/all", {
          headers: {
            Authorization: token,
          },
        });

        const configs = response.data.response;

        console.log("INTERACTIONS REEEES: ", configs);

        setConfigs(response.data);
        setMainDistributionLimitA(configs.MainDistributionLimit[0]);
        setMainDistributionLimitB(configs.MainDistributionLimit[1]);
        setMainDistributionLimitC(configs.MainDistributionLimit[2]);

        setPVA(configs.PVInstalled[0]);
        setPVB(configs.PVInstalled[1]);
        setPVC(configs.PVInstalled[2]);

        setOperatorSubDistributionLimitA(
          configs.OperatorSubDistributionLimit[0]
        );
        setOperatorSubDistributionLimitB(
          configs.OperatorSubDistributionLimit[1]
        );
        setOperatorSubDistributionLimitC(
          configs.OperatorSubDistributionLimit[2]
        );

        setViewInkW(configs.ViewInKw ? "True" : "False");

        setOnlyPV(configs.OnlyPV);

        return configs;
      } catch (e) {
        console.log(`Error: ${e}`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  async function getEnergyConfigs() {
    const retryDelay = 5000;

    while (true) {
      try {
        const response = await authAxios.get("/powermeters/get/all", {
          headers: {
            Authorization: token,
          },
        });

        let result = response.data.response;

        if (result.PV.simulated) {
          setSimulatePV(true);
        }
        if (result.Building.simulated) {
          setSimulateBuilding(true);
        }

        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Esperar antes del próximo reintento
      }
    }
  }

  /**
   * Calcular la energía total sumando los valores de todas las fases.
   *
   * @param {object} phases - Objeto que contiene los valores de energía de cada fase.
   * @return {number} La energía total calculada a partir de la suma de todos los valores de fase.
   */

  const calculateEnergyByPhases = (phases: any) => {
    var totalAmpers = Number(phases.L1) + Number(phases.L2) + Number(phases.L3);

    var totalkW = (totalAmpers * 230) / 1000;

    return totalkW;
  };

  const [loading, setLoading] = useState(true);

  // VALORES DE ENERGÍA
  const energyPv = calculateEnergyByPhases(PV);
  const energyInstalled = calculateEnergyByPhases(installed);
  const energySaved = calculateEnergyByPhases(saved);
  const energyConsumed = calculateEnergyByPhases(consumed);

  var APIEndpoint;

  if (typeof window !== "undefined") {
    APIEndpoint = `ws:${API_URL!.split(":")[1]}:7788`;
  }

  var [onlyPV, setOnlyPV] = useState<any>(null);
  var [messageHistory, setMessageHistory] = useState<any>([]);

  const { sendMessage, lastMessage, readyState, sendJsonMessage } =
    useWebSocket(APIEndpoint!, {
      onError: (e) => {
        console.log(e);
      },

      onClose: () => {},

      onMessage: (e) => {
        // console.log(e.target)
      },
    });

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading, setLoading]);

  useEffect(() => {
    if (lastMessage !== null) {
      setLoading(false);

      setMessageHistory((prev: any) => prev.concat(lastMessage));

      var data = lastMessage.data.replaceAll("'", '"');

      data = JSON.parse(data);
      console.log(data);
      setPV(data.PV);
      setInstalled(data.Installed);
      setSaved(data.Saved);
      setConsumed(data.Consumed);

      loadConfigs();

      getEnergyConfigs();
    }
  }, [lastMessage, setMessageHistory, sendJsonMessage, loading]);

  function updateWebsocket() {
    try {
      sendMessage("update!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full max-h-[100%] overflow-hidden h-full] justify-start items-center px-0 bg-bluewhite">
      <PageHeader>
        <div className="flex flex-row items-center justify-center gap-2 max-sm:w-min">
          <h2 className="text-[1.7rem] font-medium mr-0 max-sm:text-[1.5rem] max-sm:w-max  uppercase">
            {t.header[language] || "ENERGY INTERACTIONS"}
          </h2>
        </div>
      </PageHeader>

      {(!isConnected || !configs) && (
        // <div className="loadingContainer">
        //   <div className="loadingDiv">
        //     <div className="loadingIcon">
        //       <RotateRightIcon />
        //     </div>

        //     <p className="loadingText">
        //       Trying to access the API... If this continues, reload the page.
        //     </p>
        //   </div>
        // </div>
        <PingLost />
      )}

      {configs && isConnected && (
        <div
          style={{ minHeight: "calc(100vh - 6rem)" }}
          className={cn(
            "flex flex-row justify-center items-center flex-wrap p-8 overflow-y-auto relative rounded-[0.5rem]  flex-1 w-full",
            "min-h-[76vh] rounded-none shadow-md"
          )}
        >
          <div className="energyInteractionD" style={{ marginBottom: "5rem" }}>
            {/* EVA LOGO */}

            <Image
              width={169}
              height={100}
              className="energy-logo"
              src={evaImageLogo}
              alt="Eva Logo"
            />

            {/* NODO INSTALLED */}
            <div className="energy-progress energy-progress-1">
              <CircularProgressbarWithChildren
                background
                value={
                  +(
                    onlyPV
                      ? energyInstalled - (energyPv - energyConsumed)
                      : energyInstalled - energyPv
                  ).toFixed(2)
                }
              >
                <Image
                  width={24}
                  height={24}
                  className="energy-icon"
                  src={installedIcon}
                  alt="installed icon"
                />

                <span
                  className={
                    "energy-text " +
                    (viewInkW == "True" ? "" : "energy-text-small")
                  }
                  dangerouslySetInnerHTML={{
                    __html:
                      viewInkW == "True"
                        ? (onlyPV
                            ? energyInstalled - (energyPv - energyConsumed)
                            : energyInstalled - energyPv
                          ).toFixed(2) + " kW"
                        : "L1: " +
                          (onlyPV
                            ? saved.L1 - (PV.L1 - consumed.L1) < 0
                              ? saved.L1 - (PV.L1 - consumed.L1)
                              : 0
                            : installed.L1 - PV.L1
                          ).toFixed(2) +
                          "A<br />L2: " +
                          (onlyPV
                            ? saved.L2 - (PV.L2 - consumed.L2) < 0
                              ? saved.L2 - (PV.L2 - consumed.L2)
                              : 0
                            : installed.L2 - PV.L2
                          ).toFixed(2) +
                          "A<br />L3: " +
                          (onlyPV
                            ? saved.L3 - (PV.L3 - consumed.L3) < 0
                              ? saved.L3 - (PV.L3 - consumed.L3)
                              : 0
                            : installed.L3 - PV.L3
                          ).toFixed(2) +
                          "A",
                  }}
                ></span>

                <span className="energy-text">
                  {t.network[language] || "E. Network"}
                </span>
              </CircularProgressbarWithChildren>
              <EnergyLine
                position="top left"
                isActive={energyInstalled - energyPv !== 0}
                endArrow={
                  energyInstalled - energyPv > 0 && energyConsumed > 0
                    ? true
                    : false
                }
                startArrow={
                  (energyInstalled - energyPv < 0 && energyConsumed > 0) ||
                  (energyConsumed <= 0 && energyPv > 0)
                    ? true
                    : false
                }
              />
            </div>

            {/* NODO PV */}
            <div className="energy-progress energy-progress-2">
              <CircularProgressbarWithChildren
                background
                value={energyPv}
                maxValue={calculateEnergyByPhases({
                  L1: PVA,
                  L2: PVB,
                  L3: PVC,
                })}
              >
                <Image
                  width={24}
                  height={24}
                  className="energy-icon"
                  src={pvIcon}
                  alt="pv icon"
                />
                <span
                  className={
                    "energy-text " +
                    (viewInkW == "True" ? "" : "energy-text-small")
                  }
                  dangerouslySetInnerHTML={{
                    __html:
                      viewInkW == "True"
                        ? energyPv.toFixed(2) + "kW"
                        : "L1: " +
                          PV.L1.toFixed(2) +
                          "A<br />L2: " +
                          PV.L2.toFixed(2) +
                          "A<br />L3: " +
                          PV.L3.toFixed(2) +
                          "A",
                  }}
                ></span>

                <span className="energy-text">
                  {t.photovoltaic[language] || "Photovoltaic"}
                </span>
              </CircularProgressbarWithChildren>
              <EnergySimulate
                position="right"
                endArrow
                v={PV}
                setV={setPV}
                simulate={simulatePV}
                setSimulate={setSimulatePV}
                name={"PV"}
                loadCOnfigs={loadConfigs}
              />
              <EnergyLine
                position="top right"
                isActive={energyPv > 0}
                endArrow={energyPv > 0}
              />
            </div>

            {/* NODO SAVED */}
            <div className="energy-progress energy-progress-3">
              <CircularProgressbarWithChildren background value={energySaved}>
                <Image
                  width={24}
                  height={24}
                  className="energy-icon"
                  src={buildingIcon}
                  alt="saved icon"
                />
                <span
                  className={
                    "energy-text " +
                    (viewInkW == "True" ? "" : "energy-text-small")
                  }
                  dangerouslySetInnerHTML={{
                    __html:
                      viewInkW == "True"
                        ? energySaved.toFixed(2) + "kW"
                        : "L1: " +
                          saved.L1.toFixed(2) +
                          "A<br />L2: " +
                          saved.L2.toFixed(2) +
                          "A<br />L3: " +
                          saved.L3.toFixed(2) +
                          "A",
                  }}
                ></span>
                <span className="energy-text">
                  {t.building[language] || "Building"}
                </span>
              </CircularProgressbarWithChildren>
              <EnergyLine
                position="bottom left"
                startArrow={
                  (energyInstalled - energyPv < 0 && energyConsumed > 0) ||
                  (energyConsumed <= 0 && energyPv > 0)
                    ? true
                    : false
                }
                isActive={
                  onlyPV
                    ? saved.L1 > 0 || saved.L2 > 0 || saved.L3 > 0
                      ? true
                      : false
                    : energyInstalled - energyPv !== 0
                }
              />

              <EnergySimulate
                position="left"
                v={saved}
                setV={setSaved}
                simulate={simulateBuilding}
                setSimulate={setSimulateBuilding}
                name={"Building"}
                loadCOnfigs={loadConfigs}
              />
            </div>

            {/* NODO CONSUMED */}
            <div className="energy-progress energy-progress-4">
              <CircularProgressbarWithChildren
                background
                value={energyConsumed}
                maxValue={calculateEnergyByPhases({
                  L1: operatorSubDistributionLimitA,
                  L2: operatorSubDistributionLimitB,
                  L3: operatorSubDistributionLimitC,
                })}
              >
                <Image
                  width={24}
                  height={24}
                  className="energy-icon"
                  src={consumedIcon}
                  alt="consumed icon"
                />
                <span
                  className={
                    "energy-text " +
                    (viewInkW == "True" ? "" : "energy-text-small")
                  }
                  dangerouslySetInnerHTML={{
                    __html:
                      viewInkW == "True"
                        ? energyConsumed.toFixed(2) + "kW"
                        : "L1: " +
                          consumed.L1.toFixed(2) +
                          "A<br />L2: " +
                          consumed.L2.toFixed(2) +
                          "A<br />L3: " +
                          consumed.L3.toFixed(2) +
                          "A",
                  }}
                ></span>
                <span className="energy-text">
                  {t.chargers[language] || "Chargers"}
                </span>
              </CircularProgressbarWithChildren>
              <EnergyLine
                position="bottom right"
                startArrow={energyConsumed > 0}
                isActive={energyConsumed > 0}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
