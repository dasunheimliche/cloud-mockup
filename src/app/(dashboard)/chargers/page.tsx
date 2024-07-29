"use client";

import { useQuery } from "@tanstack/react-query";

// React and related hooks
import { useEffect, useState, useRef } from "react";

// Types
import { ChargerType } from "@/lib/types";

// Store
import useLangStore from "@/stores/lang-store";

// Utils and API
import { cn } from "@/lib/utils";
import oldApi from "@/lib/old-api";
import { AUTH_URL } from "@/lib/config";

// Translations
import t from "@/translations/chargers";

// Components
import { Toaster } from "@/components/ui/toaster";
import DashboardPageLayout from "@/components/dashboard-page-layout";

// Local components
import Charger from "./components/charger";
import TooltipColors from "./components/tooltip-colors";
import ChargerActions from "./components/chargers-actions";
import ChargersFormTriggers from "./components/charger-form-triggers";

// Hooks
import usePingChecker from "@/hooks/usePingChecker";

const POLLING_INTERVAL = 500;

export default function DashboardPage() {
  const [onlyOnline, setOnlyOnline] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<ChargerType | null>(
    null
  );
  const [sendJsonMessage, setSendJsonMessage] = useState(null); //! Almacenamos una función.
  const [websocketReq, setWebsocketReq] = useState(false);

  const { language } = useLangStore();

  const isConnected = usePingChecker(AUTH_URL!);

  const {
    data: chargers,
    isLoading: isLoadingChargers,
    refetch,
  } = useQuery({
    queryKey: ["chargers"],
    queryFn: async () => {
      const response = await oldApi.get("/chargers/get");
      return response.data;
    },
    refetchInterval: POLLING_INTERVAL,
    refetchIntervalInBackground: true,
  });

  function onChangeExcel(e: any) {
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);

    try {
      oldApi.post("/chargers/add/fromExcel", formData).catch((r) => {});
    } catch (e) {
      console.log(e);
    }
  }

  const addRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const cloneRef = useRef<any>(null);
  const deleteRef = useRef<any>(null);

  const handleModalClick = (ref: any) => {
    ref.current?.click();
  };

  const filteredChargers = onlyOnline
    ? chargers?.filter(
        (charger: any) => charger.chargerStatus !== "unavailable"
      )
    : chargers;

  useEffect(() => {
    if (isConnected) {
      refetch();
    }
  }, [isConnected]);

  return (
    <DashboardPageLayout
      title={t.header[language] || "MY CHARGERS"}
      tooltip={<TooltipColors />}
      headerActions={
        <ChargerActions
          onAddCharger={() => handleModalClick(addRef)}
          onAddFromExcel={onChangeExcel}
          onToggleOnlyOnline={setOnlyOnline}
          onlyOnline={onlyOnline}
        />
      }
      blocked={isLoadingChargers || !isConnected}
    >
      <div
        className={cn(
          "flex flex-row justify-start items-start content-start flex-wrap p-8 max-sm:p-0 max-sm:pt-4 pl-16 max-sm:pl-0 max-sm:justify-center max-sm:px-4 overflow-y-auto relative flex-1 w-full min-h-[76vh] rounded-none"
        )}
      >
        {filteredChargers?.map((charger: any, index: any) => (
          <Charger
            key={index}
            values={charger}
            index={index}
            onClickEdit={() => handleModalClick(editRef)}
            onClickDelete={() => handleModalClick(deleteRef)}
            onClickClone={() => handleModalClick(cloneRef)}
            isEven={(index + 1) % 2 === 0}
            selectedValues={setSelectedValues}
            setSendJsonMessage={setSendJsonMessage}
            sendJsonMessage={sendJsonMessage}
            setWebsocketReq={setWebsocketReq}
            websocketReq={websocketReq}
          />
        ))}
        <ChargersFormTriggers
          selectedCharger={selectedValues}
          addRef={addRef}
          editRef={editRef}
          delRef={deleteRef}
          cloneRef={cloneRef}
          setSelectedCharger={setSelectedValues}
        />
        <Toaster />
      </div>
    </DashboardPageLayout>
  );
}
