import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import t from "@/translations/metrics";
import useLangStore from "@/stores/lang-store";

const palette = ["#8884d8", "#82ca9d", "#ffc658"];

export default function SelfPowerPie() {
  const { language } = useLangStore();

  const data = [
    { label: t.grid[language], value: 40 },
    { label: t.directSolar[language], value: 30 },
    { label: t.storage.title[language], value: 30 },
  ];

  return (
    <PieChart
      colors={palette}
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          data,
          arcLabel(item) {
            return `${item.value} MWh`;
          },
        },
      ]}
      height={300}
      margin={{ top: 50, bottom: -10, left: 0, right: 0 }}
      sx={{ tspan: { fontSize: "0.85em", fontWeight: "600", opacity: "0.6" } }}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: {
            left: 0,
            right: 0,
            bottom: 60,
          },
        },
      }}
    />
  );
}
