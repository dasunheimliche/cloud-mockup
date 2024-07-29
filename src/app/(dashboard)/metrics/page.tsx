"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GridPowerGauge from "./components/GridPowerGauge";
import SelfPowerPie from "./components/SelfPowerPie";
import TotalPowerConsumptionLinear from "./components/TotalPowerComsumptionLinear";
import StackedPowerGraph from "./components/StackedGraph";
import EnergyProductionGraph from "./components/EnergyProductionGraph";
import { UsersList } from "./components/UsersList";
import PvPowerGauge from "./components/PvPowerGauge";
import BatteryPowerGauge from "./components/BatteryPowerGauge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import usePingChecker from "@/hooks/usePingChecker";
import { AUTH_URL } from "@/lib/config";
import StatusPie from "./components/status-pie";
import t from "@/translations/metrics";
import useLangStore from "@/stores/lang-store";
import DashboardPageLayout from "@/components/dashboard-page-layout";

export default function MetricsPage() {
  const isConnected = usePingChecker(AUTH_URL!);

  const { language } = useLangStore();

  const graphics = [
    {
      label: "",
      data: [6, 5, 5, 5, 2, 4, 6, 7, 8, 2, 3],
    },
    {
      label: "",
      data: [1, 6, 8, 4, 9],
    },
    {
      label: "",
      data: [1, 12, 70, -10, 90],
    },
  ];
  const valorKW = 70;
  const maxValue = 100;
  const porcentaje =
    (valorKW / maxValue) * 100 > maxValue
      ? maxValue
      : (valorKW / maxValue) * 100;

  return (
    <DashboardPageLayout
      title={t.header[language] || "METRICS"}
      // blocked={!isConnected}
      blocked={false}
    >
      <div className="h-full w-full flex flex-col justify-start items-center p-14 rounded-[0.5rem] pb-40 box-border overflow-y-auto max-lg:p-7 max-lg:pb-28 relative">
        <div className="w-full flex gap-5 max-xl:flex-col">
          <div className=" flex w-3/4 relative flex-col gap-5 max-xl:w-full">
            <div className="w-full flex justify-between relative gap-5 max-[955px]:flex-col">
              <Card className="w-1/3 relative max-[955px]:w-full">
                <CardHeader className="max-2xl:pb-0 ">
                  <CardTitle className="text-green-800 relative flex justify-between">
                    {t.gridPower.title[language] || "Grid Power"}{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-center items-center h-full w-5">
                            {
                              <div
                                className={cn(
                                  "bg-[#236e2dda] w-2 h-2 opacity-100 rounded-full cursor-pointer"
                                )}
                              />
                            }
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {t.gridPower.connected[language] || "Connected"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>
                    {t.gridPower.sub[language] || "Consumed vs. Max. Limit"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="h-[10rem] w-full flex justify-center items-center relative max-lg:h-4rem">
                  <GridPowerGauge />
                </CardContent>
              </Card>

              <Card className="w-1/3 relative max-[955px]:w-full">
                <CardHeader className="max-2xl:pb-0">
                  <CardTitle className="text-green-800 relative flex justify-between">
                    {t.pvPower.title[language] || "PV Power"}{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-center items-center h-full w-5">
                            {
                              <div
                                className={cn(
                                  "bg-[#236e2dda] w-2 h-2 opacity-100 rounded-full cursor-pointer"
                                )}
                              />
                            }
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.pvPower.connected[language] || "Connected"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>
                    {t.pvPower.sub[language] || "Current vs. Max. Production"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[10rem] w-full flex justify-center items-center relative max-lg:h-4rem">
                  <PvPowerGauge />
                </CardContent>
              </Card>

              <Card className="w-1/3 relative max-[955px]:w-full">
                <CardHeader className="max-2xl:pb-0">
                  <CardTitle className="text-green-800 relative flex justify-between">
                    {t.storage.title[language] || "Storage"}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-center items-center h-full w-5">
                            {
                              <div
                                className={cn(
                                  "bg-[#236e2dda] w-2 h-2 opacity-100 rounded-full cursor-pointer"
                                )}
                              />
                            }
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.storage.connected[language] || "Connected"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>
                    {t.storage.sub[language] || "Current charge percentage"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[10rem] w-full flex justify-center items-center relative max-lg:h-4rem">
                  <BatteryPowerGauge />
                </CardContent>
              </Card>
            </div>
            <div className="w-full flex gap-5 relative max-lg:flex-col">
              <Card className="w-1/2 relative max-lg:w-full">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {t.totalUsage.title[language] || "Total Power Usage"}
                  </CardTitle>
                  <CardDescription>
                    {t.totalUsage.sub[language] || "Montly Power Usage"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-24rem w-full relative flex justify-center items-center  text-[0.8rem]">
                  <StackedPowerGraph />
                </CardContent>
              </Card>

              <Card className="w-1/2 relative max-lg:w-full">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {t.production.title[language] || "Energy Production"}
                  </CardTitle>
                  <CardDescription>
                    {t.production.sub[language] ||
                      "Produced vs. Consumed Energy"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-24rem w-full relative flex justify-center items-center  text-[0.8rem]">
                  <EnergyProductionGraph />
                </CardContent>
              </Card>
            </div>
            <div className="w-full flex gap-5 max-lg:flex-col relative">
              <Card className="w-1/3 max-lg:w-full">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {t.selfStatus.title[language] || "Self Power Status"}
                  </CardTitle>
                  <CardDescription>
                    {t.selfStatus.sub[language] || "Energy Sources"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full h-[17rem] flex justify-center items-center relative !text-[0.8rem]">
                  <SelfPowerPie />
                </CardContent>
              </Card>

              <Card className="w-2/3 max-lg:w-full">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {t.energyLastDay.title[language] || "Energy Usage Last Day"}
                  </CardTitle>
                  <CardDescription>
                    {t.energyLastDay.sub[language] ||
                      "Power consumption along the day"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full relative">
                  <div className="flex gap-1 max-md:flex-col max-md:gap-3 relative">
                    <div className="flex flex-col gap-2 w-1/6 max-md:flex-row max-md:w-full max-md:justify-between text-gray-500">
                      <div>
                        <h4 className="font-semibold text-sm  text-opacity-70">
                          {t.energyLastDay.perSix[language] || "Per 6hr"}
                        </h4>
                        <p className="text-xs opacity-80 font-medium">2 MWh</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm  text-opacity-70">
                          {t.energyLastDay.perHour[language] || "Per Hour"}
                        </h4>
                        <p className="text-xs opacity-80 font-medium">
                          3.6 MWh
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm  text-opacity-70">
                          {t.energyLastDay.perMin[language] || "Per Minute"}
                        </h4>
                        <p className="text-xs opacity-80 font-medium">
                          1.9 MWh
                        </p>
                      </div>
                    </div>
                    <div className="w-5/6 text-[0.8rem] relative max-md:w-full">
                      <TotalPowerConsumptionLinear />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-1/4 max-xl:w-full flex-col gap-5">
            <Card className="w-full h-[40rem]">
              <CardHeader>
                <CardTitle className="text-green-800">
                  {t.users.title[language] || "Users"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UsersList />
              </CardContent>
            </Card>

            <Card className="w-full h-[35rem] mt-5">
              <CardHeader>
                <CardTitle className="text-green-800">
                  {t.status.title[language] || "Chargers Status"}
                </CardTitle>
                <CardDescription>
                  {t.status.sub[language] || "Percentage of chargers by state"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <StatusPie />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
