"use client";

import axios from "axios";
import DockIcon from "@mui/icons-material/Dock";
import { API_URL } from "@/lib/config";
import { toast } from "@/components/ui/use-toast";
import { RiFileCopyFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AiFillRobot } from "react-icons/ai";
import { IoGitPullRequest } from "react-icons/io5";

import t from "@/translations/chargers";

import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
// import useWebsocketStore from "@/stores/websocket-store";
import useWebsocket from "@/hooks/useWebsocket";
import useLangStore from "@/stores/lang-store";

export default function ChargerDropdown({
  values,
  websocket,
  setWebsocket,
  removeWebsocket,
  closeConnection,
  websocketWindow,
  setWebsocketReq,
  setWebsocketWindow,
  selectedValues,
  onClickEdit,
  onClickDelete,
  onClickClone,
}: any) {
  // const { setWebsocket } = useWebsocketStore();
  // const isWebsocketOn = useWebsocket(values.chargerId);

  const requests = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "uwu",
    },
  });

  const { language } = useLangStore();

  async function updateStatus(status: any) {
    await requests
      .post(
        "/chargers/update",

        {
          chargerId: values.chargerId,
          newChargerId: "",
          chargerName: values.chargerName,
          chargerVendor: values.chargerVendor,
          chargerModel: values.chargerModel,
          chargerSerialNumber: values.chargerSerialNumber,
          chargerSupportOCPP: values.chargerSupportOCPP,
          chargerPhase: values.chargerPhase,
          chargerPriority: values.chargerPriority,
          chargerStatus: status,
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }

  // async function toggleSimulation(
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) {
  //   e.stopPropagation();

  //   if (!websocket === true) {
  //     toast({
  //       variant: "success",
  //       title: "Charger Websocket Update",
  //       description: `The websocket for ${values.chargerId} was turned on.`,
  //     });
  //   } else {
  //     toast({
  //       variant: "success",
  //       title: `The websocket for ${values.chargerId} was turned off.`,
  //       description: `The websocket for ${values.chargerId} was turned off.`,
  //     });
  //   }

  //   if (websocket === true) {
  //     console.log("apague");
  //     closeConnection();
  //   }

  //   if (!websocket === false) {
  //     //? Se quiere apagar el websocket.
  //   }

  //   setWebsocket(!websocket);
  // }

  function closeWebsocket(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    closeConnection();
    removeWebsocket(values.chargerId);
  }

  function openWebsocket(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setWebsocket(values.chargerId);
  }

  return (
    <>
      <ContextMenuLabel className="flex gap-1 items-center">
        <DockIcon fontSize="inherit" />
        <p className="cTooltipTitle">{values.chargerName}</p>
      </ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem className="text-[0.8rem]">
        {t.status[language] || "Status"}
        <ContextMenuShortcut>{values.chargerStatus}</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuItem className="text-[0.8rem]">
        {t.connectorType[language] || "Connector Type"}
        <ContextMenuShortcut>{values.chargerConnectorType}</ContextMenuShortcut>
      </ContextMenuItem>

      {values.chargingAllowed.toLowerCase() === "true" && (
        <ContextMenuItem className="text-[0.8rem]">
          {t.chargingTo[language] || "Charging To"}
          <ContextMenuShortcut>
            {values.chargingTo}{" "}
            {values.chargerConnectorType === "AC" ? "A" : "W"}
          </ContextMenuShortcut>
        </ContextMenuItem>
      )}

      <ContextMenuItem className="text-[0.8rem]">
        {t.chargerId[language] || "Charger ID"}
        <ContextMenuShortcut>{values.chargerId}</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuItem className="text-[0.8rem]">
        {t.chargerVendor[language] || "Charger Vendor"}
        <ContextMenuShortcut>{values.chargerVendor}</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuItem className="text-[0.8rem]">
        {t.ocppSuported[language] || "OCPP Supported"}
        <ContextMenuShortcut>
          OCPP v{values.chargerSupportOCPP}
        </ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuItem className="text-[0.8rem]">
        {t.chargerPriority[language] || "Charger Priority"}
        <ContextMenuShortcut>{values.chargerPriority}</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuItem className="text-[0.8rem]">
        {t.phaseConfig[language] || "Phase Configuration"}
        <ContextMenuShortcut>{values.chargerPhase}</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuItem className="text-[0.8rem]">
        {t.transaction[language] || "Transaction"}
        <ContextMenuShortcut>{values.chargerTransaction}</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger className="text-[0.8rem]">
          {t.more[language] || "More"}
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48 backdrop-blur-sm bg-[#f5f5f5dc]">
          <ContextMenuItem
            onClick={onClickClone}
            className="text-[0.8rem] cursor-pointer"
          >
            {t.clone[language] || "Clone"}
            <ContextMenuShortcut>
              <RiFileCopyFill
                size={"1rem"}
                className="text-muted-foreground "
              />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={onClickEdit}
            className="text-[0.8rem] cursor-pointer"
          >
            {t.edit[language] || "Edit"}
            <ContextMenuShortcut>
              <MdEditDocument size={"1rem"} className="text-muted-foreground" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem
            onClick={onClickDelete}
            className="text-[0.8rem] cursor-pointer"
          >
            {t.remove[language] || "Remove"}
            <ContextMenuShortcut>
              <MdDelete size={"1rem"} className="text-muted-foreground " />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            // onClick={toggleSimulation}
            onClick={websocket ? closeWebsocket : openWebsocket}
            className="text-[0.8rem] cursor-pointer"
          >
            {websocket
              ? t.simulatorOff[language] || "Turn off simulator"
              : t.simulatorOn[language] || "Turn on simulator"}
            <ContextMenuShortcut>
              <AiFillRobot size={"1rem"} className="text-muted-foreground" />
            </ContextMenuShortcut>
          </ContextMenuItem>
          {websocket && (
            <ContextMenuItem
              className="text-[0.8rem] cursor-pointer"
              onClick={() => {
                setWebsocketReq(true);
                selectedValues(values);
                setWebsocketWindow(!websocketWindow);
              }}
            >
              {websocketWindow
                ? t.simulatorWindowClose[language] ||
                  "Close simulate requests window"
                : t.simulateRequest[language] || "Simulate requests"}
              <ContextMenuShortcut>
                <IoGitPullRequest
                  size={"1rem"}
                  className="text-muted-foreground"
                />
              </ContextMenuShortcut>
            </ContextMenuItem>
          )}
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
}
