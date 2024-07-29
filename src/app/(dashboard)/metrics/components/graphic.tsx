"use client";

import { Checkbox } from "@mui/material";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const pastelColors = {
  rosaClaro: "#FFD1DC",
  salmonClaro: "#FFA07A",
  amarilloClaro: "#FFD700",
  verdeClaro: "#bbf7d0",
  azulClaro1: "#AFEEEE",
  azulClaro2: "#ADD8E6",
  azulCieloClaro1: "#87CEEB",
  azulCieloClaro2: "#E0FFFF",
};

export default function Graphic({ graphics, labels }: any) {
  const [isChecked, setIsChecked] = useState({
    first: true,
    second: false,
    third: false,
  });
  const thirdGraphicData: any = useMemo(() => {
    return {
      datasets: [
        isChecked.first && {
          label: graphics[0].label,
          data: graphics[0].data,
          tension: 0.3,
          pointRadius: 6,
          borderColor: pastelColors.rosaClaro,
          pointBackgroundColor: pastelColors.rosaClaro,
        },
        isChecked.second && {
          label: graphics[1].label,
          data: graphics[1].data,
          tension: 0.3,
          pointRadius: 6,
          borderColor: pastelColors.azulClaro1,
          pointBackgroundColor: pastelColors.azulCieloClaro2,
        },
        isChecked.third && {
          label: graphics[2].label,
          data: graphics[2].data,
          tension: 0.3,
          pointRadius: 6,
          borderColor: pastelColors.salmonClaro,
          pointBackgroundColor: pastelColors.verdeClaro,
        },
      ],
      labels,
    };
  }, []);
  const thirdGraphicOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <article className="third__graphic basic__graphic__styles">
      <div>
        <h3 className="graphic__title">Primary Title</h3>
        <p className="graphic__span text__center spacing__small_top">
          Seconary Title
        </p>
      </div>
      <div className="graphic__wrapper">
        <Line
          className="graphic"
          data={thirdGraphicData}
          options={thirdGraphicOptions}
        />
      </div>
      <form className="checkbox">
        <div className="checkbox__item">
          <Checkbox
            checked={isChecked.first}
            onClick={() =>
              setIsChecked({ ...isChecked, first: !isChecked.first })
            }
          />
          <label className="checkbox__label">Curva de consumo</label>
        </div>
        <div className="checkbox__item">
          <Checkbox
            checked={isChecked.second}
            onClick={() =>
              setIsChecked({ ...isChecked, second: !isChecked.second })
            }
          />
          <label className="checkbox__label">
            curva de generación fotovoltaica
          </label>
        </div>
        <div className="checkbox__item">
          <Checkbox
            checked={isChecked.third}
            onClick={() =>
              setIsChecked({ ...isChecked, third: !isChecked.third })
            }
          />
          <label className="checkbox__label">
            Curva de consumo de vehículo eléctrico.
          </label>
        </div>
      </form>
    </article>
  );
}
