import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import t from "@/translations/metrics";
import useLangStore from "@/stores/lang-store";

export default function TotalPowerConsumptionLinear() {
  const { language } = useLangStore();

  const data = [
    {
      name: "00:00 AM",
      [t.consumed[language]]: 1000,
    },
    {
      name: "04:00 AM",
      [t.consumed[language]]: 900,
    },
    {
      name: "08:00 AM",
      [t.consumed[language]]: 3000,
    },
    {
      name: "12:00 PM",
      [t.consumed[language]]: 3542,
    },
    {
      name: "04:00 PM",
      [t.consumed[language]]: 3121,
    },
    {
      name: "08:00 PM",
      [t.consumed[language]]: 3045,
    },
  ];

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={t.consumed[language]}
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}
