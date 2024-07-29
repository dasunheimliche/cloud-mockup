import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import t from "@/translations/metrics";
import useLangStore from "@/stores/lang-store";

const palette = ["#C2F2F1", "#82ca9d", "#ffc658", "#FF2B2A"];

export default function StatusPie() {
  const { language } = useLangStore();

  const data = [
    { label: t.charging[language], value: 4 },
    { label: t.available[language], value: 10 },
    { label: t.unavailable[language], value: 2 },
    { label: t.faulted[language], value: 1 },
  ];

  return (
    <PieChart
      colors={palette}
      series={[
        {
          data,
          arcLabel(item) {
            return `${item.value}`;
          },
        },
      ]}
      width={250}
      height={380}
      margin={{ top: -50, bottom: 0, left: 0, right: 0 }}
      sx={{ tspan: { fontSize: "0.85em", fontWeight: "600", opacity: "0.6" } }}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: {
            left: 0,
            right: 0,
            bottom: -5,
          },
        },
      }}
    />
  );
}
