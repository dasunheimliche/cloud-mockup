"use client";

import authAxios from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { Switch, TextField } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import t from "@/translations/interactions";
import useLangStore from "@/stores/lang-store";

function EnergySimulate(props: any) {
  const [getApiUrl, setGetApiUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGetApiUrl(localStorage.getItem("apiUrl") || "https://api.evasoft.app");
    }
  }, []);

  const { token } = sessionStore();
  const { language } = useLangStore();

  const energyName = props.name;

  const isSimulating = props.simulate;
  const setIsSimulating = props.setSimulate;
  const [simulateValues, setSimulateValues] = useState({
    L1: 0,
    L2: 0,
    L3: 0,
  });

  const changeIsSimulating = (ev: any) => {
    setIsSimulating(!isSimulating);

    console.log(!isSimulating);

    editConfigs(
      energyName,
      !isSimulating,
      `[${simulateValues.L1}, ${simulateValues.L2}, ${simulateValues.L3}]`
    );
  };

  const loadConfigs = props.loadConfigs;
  const v = props.v;
  const setV = props.setV;

  const position = props.position;
  var apiUrl =
    typeof window !== undefined && `http:${getApiUrl.split(":")[1]}:8000`;

  async function editConfigs(energyType: any, simulated: any, values: any) {
    const valuess = values.replace("[", "%5B").replace("]", "%5D");

    try {
      const res = await authAxios.put(
        `/powermeters/update/?powermeter_type=${energyType}&simulated=${simulated}&value=${values}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return res.data.response;
    } catch (error) {
      console.log(error);
    }

    // axios
    //   .create({
    //     baseURL: API_URL,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "ngrok-skip-browser-warning": "uwu",
    //     },
    //   })
    //   .post("/energyConfigs/edit", {
    //     energyType: energyType,
    //     simulated: simulated,
    //     values: values,
    //   })
    //   .then((r) => {
    //     console.log(r.data);
    //     return r.data;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  async function getEnergyConfigs() {
    try {
      const response = await authAxios.get("/powermeters/get/all", {
        headers: {
          Authorization: token,
        },
      });

      let result = response.data.response;

      if (energyName === "PV") {
        let values = result.PV.value;

        setSimulateValues({
          L1: Number(values[0]),
          L2: Number(values[1]),
          L3: Number(values[2]),
        });
      } else if (energyName === "Building") {
        let values = result.Building.value;

        setSimulateValues({
          L1: Number(values[0]),
          L2: Number(values[1]),
          L3: Number(values[2]),
        });
      }

      return result;
    } catch (error) {
      console.log(error);
    }

    // axios
    //   .create({
    //     baseURL: API_URL,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "ngrok-skip-browser-warning": "uwu",
    //     },
    //   })
    //   .get("/energyConfigs/get")
    //   .then((r) => {
    //     console.log(r.data);
    //     var result = r.data;

    //     if (energyName === "PV") {
    //       var values = String(result.PV.values)
    //         .replace("[", "")
    //         .replace("]", "")
    //         .split(",");
    //       setSimulateValues({
    //         L1: Number(values[0]),
    //         L2: Number(values[1]),
    //         L3: Number(values[2]),
    //       });
    //     } else if (energyName === "Building") {
    //       var values = String(result.Building.values)
    //         .replace("[", "")
    //         .replace("]", "")
    //         .split(",");
    //       setSimulateValues({
    //         L1: Number(values[0]),
    //         L2: Number(values[1]),
    //         L3: Number(values[2]),
    //       });
    //     }

    //     return result;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  var [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
      getEnergyConfigs();
    }
  }, [getEnergyConfigs]);

  /**
   * Función que modifica los valores simulados.
   *
   * @param {object} ev - El objeto del evento.
   * @return {void} Esta función no devuelve ningún valor.
   */
  const changeSimulateValues = (ev: any) => {
    const { name, value } = ev.target;
    var vtcg = { ...simulateValues, [name]: value };
    setSimulateValues(vtcg);
    console.log(energyName);

    if (energyName == "PV") {
      if (
        isNaN(vtcg.L1) == false &&
        isNaN(vtcg.L2) == false &&
        isNaN(vtcg.L3) == false
      ) {
        editConfigs("PV", "True", `[${vtcg.L1}, ${vtcg.L2}, ${vtcg.L3}]`);
      }
    } else if (energyName == "Building") {
      if (
        isNaN(vtcg.L1) == false &&
        isNaN(vtcg.L2) == false &&
        isNaN(vtcg.L3) == false
      ) {
        editConfigs("Building", "True", `[${vtcg.L1}, ${vtcg.L2}, ${vtcg.L3}]`);
      }
    }

    // setV({ ...simulateValues, [name]: value })
  };

  return (
    <div
      className={clsx(
        "energy-simulate",
        position === "right" && "energy-simulate-right",
        position === "left" && "energy-simulate-left"
      )}
    >
      <div className="energy-simulate-action">
        <Switch
          onChange={changeIsSimulating}
          name="switchsimulate"
          checked={isSimulating}
        />
        <span>{t.simulated[language] || "Simulated"}</span>
      </div>

      <div className="energy-simulate-phases">
        {/* FASE L1 */}
        <div className="energy-simulate-phase">
          L1
          <TextField
            onChange={changeSimulateValues}
            value={simulateValues.L1}
            name="L1"
            fullWidth
            type="number"
            disabled={!isSimulating}
          />
        </div>

        {/* FASE L2 */}
        <div className="energy-simulate-phase">
          L2
          <TextField
            onChange={changeSimulateValues}
            value={simulateValues.L2}
            name="L2"
            fullWidth
            type="number"
            disabled={!isSimulating}
          />
        </div>

        {/* FASE L3 */}
        <div className="energy-simulate-phase">
          L3
          <TextField
            onChange={changeSimulateValues}
            value={simulateValues.L3}
            name="L3"
            fullWidth
            type="number"
            disabled={!isSimulating}
          />
        </div>
      </div>
    </div>
  );
}

export default EnergySimulate;
