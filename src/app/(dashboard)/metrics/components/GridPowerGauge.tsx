import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Image from "next/image";
import { LuUtilityPole } from "react-icons/lu";

export default function GridPowerGauge() {
  return (
    <div className="relative w-full h-full ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[35%]">
        <LuUtilityPole className="text-[1.5rem] opacity-45 text-green-900" />
      </div>
      <Gauge
        value={5.5}
        valueMax={20}
        startAngle={-90}
        endAngle={90}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: "calc(0.75rem)",
            fontWeight: "500",
            transform: "translate(0px, 0px)",
            opacity: "0.8",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#82ca9d",
          },
        }}
        text={({ value, valueMax }) => `${value} MWh / ${valueMax} MWh`}
      />
    </div>
  );
}
