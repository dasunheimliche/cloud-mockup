"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConfigSection from "../configuration/components/config-section";
import authAxios from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { IoMdCloudDownload } from "react-icons/io";
import t from "@/translations/sessions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeaderButton from "@/components/header-button";
import { TbReload } from "react-icons/tb";
import ModalTrigger from "@/components/ui/modal-trigguer";
import DownloadSessionsModal from "./components/download-sessions-modal";
import PaginationButtons from "./components/pagination";
import { MobileDropdownMenu } from "./components/mobile-dropdown";
import usePingChecker from "@/hooks/usePingChecker";
import { AUTH_URL } from "@/lib/config";
import PingLost from "@/components/ping-lost";
import useLangStore from "@/stores/lang-store";

const POSTS_PER_PAGE = 8;

async function getUsers(
  token: string | null,
  filter?: string,
  filterInput?: string,
  startDate?: string,
  endDate?: string
) {
  if (!token) return;

  try {
    let res;

    if (filter === "all") {
      console.log("FILTERING BY ALL");
      res = await authAxios.get(`/sessions/get/`, {
        headers: {
          Authorization: token,
        },
      });
    } else if (filter === "user") {
      console.log("FILTERING BY USER: ", filterInput);
      res = await authAxios.get(
        `/sessions/get/?filter_type=user&username=${filterInput?.toLowerCase()}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("RES DATA: ", res?.data.response);
    } else if (filter === "charger") {
      res = await authAxios.get(
        `/sessions/get/?filter_type=charger&charger_id=${filterInput}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("RES DATA: ", res?.data.response);
    } else if (filter === "tag_id") {
      console.log("FILTERING BY TAG ID");
      res = await authAxios.get(
        `/sessions/get/?filter_type=tag_id&tag_id=${filterInput}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("RES DATA: ", res?.data.response);
    } else if (filter === "date") {
      console.log("FILTERING BY DATE: ", startDate, " : ", endDate);
      res = await authAxios.get(
        `/sessions/get/?filter_type=date&tag_id=${filterInput}&start_date=${
          startDate + "T00:00:00.000"
        }&end_date=${endDate + "T23:59:59.123"}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("RES DATA: ", res?.data.response);
    }

    if (!res) return;

    const dbSessions = res.data.response;
    const sessionList = Object.entries(dbSessions).map(
      ([id, session]: any) => ({
        id,
        ...session,
      })
    );

    console.log("SESSION LIST: ", sessionList);

    return sessionList;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export default function AdminPage() {
  const today = new Date().toISOString().split("T")[0];
  const [configs, setConfigs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [sessions, setSessions] = useState<any>([]);
  const [filter, setFilter] = useState("all");
  const [filterInput, setFilterInput] = useState("");
  const [rangeDate, setRangeDate] = useState(["null", today]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const currency = configs?.Currency;

  const isConnected = usePingChecker(AUTH_URL!);
  const { language } = useLangStore();
  const { token } = sessionStore();

  const handleFilter = (value: "string") => {
    setFilter(value);
  };

  const handleFilterClick = () => {
    setShouldFetch(!shouldFetch);
  };

  useEffect(() => {
    async function getSessions() {
      setLoading(true);
      const res = await getUsers(
        token,
        filter,
        filterInput,
        rangeDate[0],
        rangeDate[1]
      );
      setSessions(res);

      const configs = await loadConfigs();
      setLoading(false);
      setConfigs(configs);
    }

    getSessions();
  }, [shouldFetch]);

  useEffect(() => {
    async function getSessions() {
      const res = await getUsers(token, filter);
      setSessions(res);
    }
    if (filter === "all") {
      getSessions();
    }
  }, [filter]);

  async function loadConfigs() {
    try {
      const resConfigs = await authAxios.get("/configs/get/all/", {
        headers: {
          Authorization: token,
        },
      });

      const config = resConfigs.data.response;

      return config;
    } catch (error) {
      console.log(error);
    }
  }

  function handleReload() {
    setFilter("all");
  }

  const totalPages = useMemo(
    () => Math.ceil(sessions.length / POSTS_PER_PAGE),
    [sessions]
  );

  const getPostsByPage = useCallback(
    (page: number) => {
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      return sessions.slice(startIndex, endIndex);
    },
    [sessions]
  );

  function handlePageSelection(page: number) {
    setCurrentPage(page);
  }

  const sessions1 = getPostsByPage(currentPage);

  const donwnloadRef = useRef<any>();

  const handleDownload = () => {
    if (donwnloadRef.current) {
      donwnloadRef.current.click();
    }
  };

  return (
    <div className="flex flex-col w-full max-h-[100vh] h-full justify-start items-center px-0 bg-bluewhite">
      <PageHeader>
        <div className="flex flex-row items-center justify-center gap-2 max-sm:w-min">
          <h2 className="text-[1.7rem] font-medium mr-0 max-sm:text-[1.5rem] max-sm:w-max  uppercase">
            {t.header[language] || "CHARGING SESSIONS"}
          </h2>
        </div>
        <MobileDropdownMenu
          onReload={handleReload}
          onDownload={handleDownload}
        />
        <div className="flex gap-3 max-lg:hidden">
          <ModalTrigger
            ref={donwnloadRef}
            modal={
              <DownloadSessionsModal
                filter={filter}
                filterInput={filterInput}
                startDate={rangeDate[0]}
                endDate={rangeDate[1]}
              />
            }
          >
            <HeaderButton
              icon={
                <IoMdCloudDownload className="text-slate-50 text-[1.2rem]" />
              }
              label={t.download[language] || "DOWNLOAD"}
            />
          </ModalTrigger>

          <HeaderButton
            icon={<TbReload className="text-slate-50 text-[1.2rem]" />}
            label=""
            onClick={handleReload}
          />
        </div>
      </PageHeader>

      <ScrollArea
        style={{ minHeight: "calc(100vh - 6rem)" }}
        className={cn(
          "flex flex-row justify-center items-center flex-wrap relative rounded-[0.5rem]  flex-1 w-full",
          "min-h-[76vh] rounded-none shadow-md max-sm:mb-28"
        )}
      >
        {(!sessions || !isConnected) && <PingLost />}

        {sessions && isConnected && (
          <div className="h-full w-full flex flex-col justify-start items-center relative rounded-[0.5rem] p-14 pb-40 box-border overflow-y-auto max-lg:p-7 max-sm:px-2 max-sm:py-1 max-lg:pb-28">
            {/* USER INFO */}
            <div className="w-full justify-start flex gap-1 mb-1">
              <Select value={filter} onValueChange={handleFilter}>
                <SelectTrigger className="w-[8.5rem] bg-slate-200 rounded-none">
                  <SelectValue
                    placeholder={t.filterBy[language] || "Filter By"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t.filterBy[language] || "Filter By"}
                    </SelectLabel>
                    <SelectItem value="all">
                      {t.filterOptions.showAll[language] || "Show All"}
                    </SelectItem>
                    <SelectItem value="user">
                      {t.filterOptions.byUsername[language] || "By Username"}
                    </SelectItem>
                    <SelectItem value="charger">
                      {t.filterOptions.byChargerId[language] || "By Charger ID"}
                    </SelectItem>
                    <SelectItem value="tag_id">
                      {t.filterOptions.byTagId[language] || "By Tag ID"}
                    </SelectItem>
                    <SelectItem value="date">
                      {t.filterOptions.byDate[language] || "By Date"}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {filter !== "all" && filter !== "date" && (
                <Input
                  type="text"
                  className="w-[12rem]"
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                />
              )}
              {filter === "date" && (
                <div className="flex gap-1">
                  <Input
                    className="w-[7rem]"
                    type="date"
                    value={rangeDate[0]}
                    onChange={(e) =>
                      setRangeDate([e.target.value, rangeDate[0]])
                    }
                  />
                  <Input
                    className="w-[7rem]"
                    type="date"
                    value={rangeDate[1]}
                    onChange={(e) =>
                      setRangeDate([rangeDate[0], e.target.value])
                    }
                  />
                </div>
              )}
              {filter !== "all" && (
                <Button className="rounded-none" onClick={handleFilterClick}>
                  {t.filter[language] || "Filter"}
                </Button>
              )}
            </div>
            <ConfigSection>
              <table id="myTable" className="w-full">
                <thead>
                  <tr className="text-[0.75rem] font-normal uppercase text-slate-700 max-lg:text-[0.7rem]">
                    <th className="py-3 border-b-[1px] border-r-[1px] border-slate-200">
                      ID
                    </th>
                    <th className="border-b-[1px] border-r-[1px] border-slate-200 max-lg:hidden">
                      {t.chargerId[language] || "Charger ID"}
                    </th>
                    <th className="border-b-[1px] border-r-[1px] border-slate-200">
                      {t.username[language] || "Username"}
                    </th>
                    <th className="border-b-[1px] border-r-[1px] border-slate-200 ">
                      RFID Tag ID
                    </th>
                    <th className="border-b-[1px] border-r-[1px] border-slate-200">
                      {t.kwhConsumed[language] || "kWh Consumed"}
                    </th>
                    <th className="border-b-[1px] border-r-[1px] border-slate-200 max-lg:hidden">
                      {t.kWhPrice[language] || "kWh Price"}
                    </th>
                    <th className="border-b-[1px] border-slate-200 max-lg:hidden">
                      {t.startTime[language] || "Start Time"}
                    </th>
                    <th className="border-b-[1px] border-slate-200">
                      {t.chargeTime[language] || "Charge Time"}
                    </th>
                    <th className="border-b-[1px] border-slate-200 ">
                      {t.totalCost[language] || "Total Cost"}
                    </th>
                    <th className="border-b-[1px] border-slate-200 max-lg:hidden">
                      {t.status[language] || "Status"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessions1?.map((session: any, i: any) => (
                    <tr
                      key={i}
                      className={cn(
                        "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]"
                      )}
                    >
                      <td className="py-3 flex justify-center items-center border-b-[1px] border-slate-200">
                        {session.id ?? "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200  capitalize max-lg:hidden">
                        {session.charger_id ?? "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200 capitalize">
                        {session.username ?? "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200 ">
                        {session.tag_id ?? "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200">
                        {session.total_charged_energy
                          ? `${session.total_charged_energy} kWh`
                          : "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200 uppercase max-lg:hidden">
                        {session.kwh_pricing
                          ? `${session.kwh_pricing} ${currency}`
                          : "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200 max-lg:hidden">
                        {session.start_transaction
                          ? `${new Date(
                              session.start_transaction
                            ).toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}`
                          : "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200">
                        {session.total_duration
                          ? `${session.total_duration?.toFixed(2)} HS`
                          : "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200">
                        {session?.total_cost
                          ? `${session?.total_cost?.toFixed(
                              2
                            )} ${currency?.toUpperCase()} `
                          : "-"}
                      </td>
                      <td className="border-b-[1px] border-slate-200 max-lg:hidden">
                        {session.stop_status ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ConfigSection>
          </div>
        )}
        <div
          className="flex gap-2 justify-center absolute w-full"
          style={{ top: "calc(100svh - 10rem)" }}
        >
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageSelection}
          />
        </div>
      </ScrollArea>
      <Toaster />
    </div>
  );
}
