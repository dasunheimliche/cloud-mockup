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

export default function EnergyProductionGraph() {
  const { language } = useLangStore();

  const data = [
    {
      name: t.jan[language],
      [t.produced[language]]: 4000,
      [t.consumed[language]]: 2400,
    },
    {
      name: t.feb[language],
      [t.produced[language]]: 3000,
      [t.consumed[language]]: 1398,
    },
    {
      name: t.mar[language],
      [t.produced[language]]: 2000,
      [t.consumed[language]]: 5800,
    },
    {
      name: t.apr[language],
      [t.produced[language]]: 2780,
      [t.consumed[language]]: 3908,
    },
    {
      name: t.may[language],
      [t.produced[language]]: 1890,
      [t.consumed[language]]: 4800,
    },
    {
      name: t.jun[language],
      [t.produced[language]]: 2390,
      [t.consumed[language]]: 3800,
    },
    {
      name: t.jul[language],
      [t.produced[language]]: 3490,
      [t.consumed[language]]: 4300,
    },
  ];

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <AreaChart
        // width={500}
        // height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
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
          dataKey={t.produced[language]}
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
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
