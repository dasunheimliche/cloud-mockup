"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, AUTH_URL } from "@/lib/config";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import HistoryTableButton from "./components/history-table-button";
import LogTableButton from "./components/log-table-button";
import t from "@/translations/logs";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { MobileDropdownMenu } from "./components/mobile-dropdown";
import HeaderButton from "@/components/header-button";
import { TbReload } from "react-icons/tb";
import usePingChecker from "@/hooks/usePingChecker";
import PingLost from "@/components/ping-lost";
import useLangStore from "@/stores/lang-store";
// import DashboardPageLayout from "@/components/dashboard-page-layout";
// import LogsActions from "./components/logs-actions";

export default function HistoryContentPage() {
  const [loading, setLoading] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [history, setHistory] = useState(null);
  const [logs, setLogs] = useState(null);
  const [table, setTable] = useState<"system" | "smtp">("smtp");
  const [update, setUpdate] = useState<number>(0);

  const isConnected = usePingChecker(AUTH_URL!);
  const { language } = useLangStore();

  const requests = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "uwu",
    },
  });

  const logColumns: any = [
    { field: "file", flex: 0.25, headerName: t.file[language] },
    { field: "time", flex: 0.2, headerName: t.time[language] },
    { field: "type", flex: 0.1, headerName: t.type[language] },
    { field: "message", flex: 1, headerName: t.message[language] },
  ];

  const columns: any = [
    { field: "id", flex: 0.15 },
    { field: "chargerId", flex: 0.25, headerName: t.chargerId[language] },
    { field: "date", flex: 0.25, headerName: t.date[language] },
    { field: "response", flex: 1, headerName: t.response[language] },
  ];

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading, setLoading]);

  useEffect(() => {
    if (loading === false) {
      getHistory();
      getLogs();
    }
  }, [loading, update]);

  async function getHistory() {
    console.log("GETTING HISTORY LOGS");
    const retryDelay = 5000; // Tiempo de espera entre reintentos (en ms)

    while (true) {
      try {
        const response = await requests.get("/history/get");
        var tempHistory: any = [];

        response.data.forEach((register: any) => {
          tempHistory.unshift({
            id: register.id,
            chargerId: register.chargerId,
            date: register.date.split(".")[0],
            response: register.content,
          });
        });

        setHistory(tempHistory);
        setLoadingRequest(false);
        return; // Si la solicitud fue exitosa, salimos de la función
      } catch (e) {
        console.log(`Error: ${e}`);
        setLoadingRequest(true);
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Esperar antes del próximo reintento
      }
    }
  }

  async function getLogs() {
    console.log("GETTING LOGS");

    const retryDelay = 5000; // Tiempo de espera entre reintentos (en ms)

    while (true) {
      try {
        const response = await requests.get("/logs");
        var tempLog: any = [];

        response.data.lines.forEach((register: any, index: number) => {
          tempLog.unshift({
            id: index,
            file: register.file,
            message: register.message,
            time: register.time.split(".")[0],
            type: register.type,
          });
        });

        setLogs(tempLog);
        setLoadingRequest(false);
        return; // Si la solicitud fue exitosa, salimos de la función
      } catch (e) {
        console.log(`Error: ${e}`);
        setLoadingRequest(true);
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Esperar antes del próximo reintento
      }
    }
  }

  const pagination = true;
  const paginationPageSizeSelector = [10, 15, 20, 30, 50, 100];

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden w-full h-full relative justify-start items-center px-0 bg-bluewhite"
      )}
    >
      <PageHeader>
        <div className="flex flex-row items-center justify-center gap-2 max-sm:w-min">
          <h2 className="text-[1.7rem] font-medium mr-0 max-sm:text-[1.5rem] max-sm:w-max  uppercase">
            {t.header[language] || "LOGS"}
          </h2>
        </div>

        <MobileDropdownMenu onClick={setTable} table={table} />

        <div
          className="max-lg:hidden"
          style={{ gap: "2rem", position: "relative" }}
        >
          <div className="flex gap-3">
            <HistoryTableButton
              onClick={() => setTable("smtp")}
              pressed={table === "smtp"}
            />

            <LogTableButton
              onClick={() => setTable("system")}
              pressed={table === "system"}
            />

            <HeaderButton
              icon={<TbReload className="text-slate-50 text-[1.2rem]" />}
              label=""
              loading={loadingRequest}
              onClick={() => setUpdate((prev) => prev + 1)}
            />
          </div>
        </div>
      </PageHeader>

      {(!isConnected || loadingRequest) && <PingLost />}

      {isConnected && !loadingRequest && table === "smtp" && (
        <div style={{ width: "100%", height: "100%" }}>
          <div
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-quartz"
          >
            <AgGridReact
              rowData={history}
              columnDefs={columns}
              pagination={pagination}
              paginationAutoPageSize={true}
              paginationPageSizeSelector={paginationPageSizeSelector}
            />
          </div>
        </div>
      )}

      {!loadingRequest && table === "system" && (
        <div style={{ width: "100%", height: "100%" }}>
          <div
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-quartz"
          >
            <AgGridReact
              rowData={logs}
              columnDefs={logColumns}
              pagination={pagination}
              paginationAutoPageSize={true}
              paginationPageSizeSelector={paginationPageSizeSelector}
            />
          </div>
        </div>
      )}
    </div>
  );
}
