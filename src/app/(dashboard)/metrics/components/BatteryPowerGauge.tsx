import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { GiBatteryPack } from "react-icons/gi";

export default function BatteryPowerGauge() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[35%]">
        <GiBatteryPack className="text-[1.5rem] opacity-45 text-green-900" />
      </div>
      <Gauge
        value={88}
        valueMax={100}
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
            fill: "#4cb373 ",
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax} %`}
      />
    </div>
  );
}
