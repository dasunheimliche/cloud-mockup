"use client";

import useLangStore from "@/stores/lang-store";
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

export default function StackedPowerGraph() {
  const { language } = useLangStore();

  const data = [
    {
      name: t.jan[language],
      [t.grid[language]]: 4000,
      [t.pv[language]]: 2400,
      [t.storage.title[language]]: 2400,
    },
    {
      name: t.feb[language],
      [t.grid[language]]: 3000,
      [t.pv[language]]: 1398,
      [t.storage.title[language]]: 2210,
    },
    {
      name: t.mar[language],
      [t.grid[language]]: 2000,
      [t.pv[language]]: 9800,
      [t.storage.title[language]]: 2290,
    },
    {
      name: t.apr[language],
      [t.grid[language]]: 2780,
      [t.pv[language]]: 3908,
      [t.storage.title[language]]: 2000,
    },
    {
      name: t.may[language],
      [t.grid[language]]: 1890,
      [t.pv[language]]: 4800,
      [t.storage.title[language]]: 2181,
    },
    {
      name: t.jun[language],
      [t.grid[language]]: 2390,
      [t.pv[language]]: 3800,
      [t.storage.title[language]]: 2500,
    },
    {
      name: t.jul[language],
      [t.grid[language]]: 3490,
      [t.pv[language]]: 4300,
      [t.storage.title[language]]: 2100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={t.grid[language]}
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey={t.pv[language]}
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey={t.storage.title[language]}
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}
