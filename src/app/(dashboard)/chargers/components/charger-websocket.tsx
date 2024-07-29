"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import Draggable from "react-draggable"; // Both at the same time

import CloseIcon from "/public/imgs/icons/close.svg";

import { TextField } from "@mui/material";
import Image from "next/image";
import Foco from "react-foco";
import { ClassSharp } from "@mui/icons-material";
import { API_URL } from "@/lib/config";
import { useToast } from "@/components/ui/use-toast";

import t from "@/translations/chargers";
import useLangStore from "@/stores/lang-store";

function ChargerWebsocket(props: any) {
  const [getApiUrl, setGetApiUrl] = useState<any>("");
  const [getApiEndpoint, setGetApiEndpoint] = useState<any>();
  const { toast } = useToast();

  const { language } = useLangStore();

  useEffect(() => {
    var apiUrl = localStorage.getItem("apiUrl");

    var APIEndpoint = `ws:${API_URL!.split(":")[1]}:8765/${values.chargerId}`;

    // setGetApiUrl(apiUrl);
    setGetApiEndpoint(APIEndpoint);
  }, []);

  var requests = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "uwu",
    },
  });

  var setCloseConnection = props.setCloseConnection;
  var closeConnection = props.closeConnection;

  var setWebsocket = props.setWebsocket;

  var values = props.values;

  // const { setWebsocket } = useWebsocketStore();

  var websocketReq = props.websocketReq;

  var websocketWindow = props.websocketWindow;
  var setWebsocketWindow = props.setWebsocketWindow;

  var refCustom = props.refCustom;
  var customStyles = props.customStyles;

  var [reserveNow, setReserveNow] = useState(true);

  const {
    sendMessage,
    lastMessage,
    readyState,
    sendJsonMessage,
    getWebSocket,
  } = useWebSocket(getApiEndpoint, {
    onError: () => {
      console.log("There was an error connecting to the websocket server.");
      setWebsocket();
      setWebsocketWindow(false);
      updateStatus("unavailable");
    },

    onOpen: (e) => {
      setCloseConnection(() => closeConnectionReq);
      console.log("The websocket connection is open.");
    },

    onClose: () => {
      console.log(
        "The websocket connection was closed due to a request from the websocket server itself."
      );

      toast({
        variant: "success",
        title: t.toast.socketErrorTitle[language] || "Websocket server error.",
        description:
          t.toast.socketErrorDescription[language] ||
          "The websocket connection was closed due to a request from the websocket server itself.",
      });

      setWebsocket();
      updateStatus("unavailable");
      setWebsocketWindow(false);
    },
  });

  async function updateStatus(status: any) {
    // var rt = await requests.post('/chargers/update',
    //     {
    //         'chargerId': values.chargerId,
    //         'newChargerId': '',
    //         'chargerName': values.chargerName,
    //         'chargerVendor': values.chargerVendor,
    //         'chargerModel': values.chargerModel,
    //         'chargerSerialNumber': values.chargerSerialNumber,
    //         'chargerSupportOCPP': values.chargerSupportOCPP,
    //         'chargerPhase': values.chargerPhase,
    //         'chargerPriority': values.chargerPriority,
    //         'chargerStatus': status
    //     }
    // ).catch((e) => {
    //     console.log(e)
    // })
  }

  var [chargerStatus, setChargerStatus] = useState<any>("Sin conexión");
  var [messageHistory, setMessageHistory] = useState<any>([]);

  function send(message: any) {
    sendMessage(message);
  }

  function closeConnectionReq() {
    try {
      getWebSocket()?.close(1000, "User requested disconnection.");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev: any) => prev.concat(lastMessage));
    }

    if (
      connectionStatus == "Closed" ||
      connectionStatus == "Uninstantiated" ||
      connectionStatus == "Closing" ||
      connectionStatus == "Connecting"
    ) {
      setChargerStatus("Sin conexión");
    } else {
      //TODO: Acá se debería cargar un estado de la base datos??
      setChargerStatus("Disponible");
    }
  }, [lastMessage, setMessageHistory, sendJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  var setWebsocketReq = props.setWebsocketReq;

  type ChargerStatus =
    | "available"
    | "preparing"
    | "unavailable"
    | "charging"
    | "faulted";

  interface ChargerStatusOption {
    value: ChargerStatus;
    label:
      | "Disponible"
      | "Preparando"
      | "No Disponible"
      | "Cargando"
      | "Averiado";
  }

  const chargerStatusOptions: ChargerStatusOption[] = [
    { value: "available", label: "Disponible" },
    { value: "preparing", label: "Preparando" },
    { value: "unavailable", label: "No Disponible" },
    { value: "charging", label: "Cargando" },
    { value: "faulted", label: "Averiado" },
  ];

  type DataTransferOption =
    | "authError"
    | "meterValuesError"
    | "clearCacheError";

  interface DataTransferOptionItem {
    value: DataTransferOption;
    label:
      | "No support for Authorization."
      | "No support for Meter values."
      | "No support for Clear Cache.";
  }

  const dataTransferOptions: DataTransferOptionItem[] = [
    { value: "authError", label: "No support for Authorization." },
    { value: "meterValuesError", label: "No support for Meter values." },
    { value: "clearCacheError", label: "No support for Clear Cache." },
  ];

  var [chargerStatusSelected, setChargerStatusSelected] = useState(
    values.chargerStatus
  );

  var refCustom = props.refCustom;
  var customStyles = props.customStyles;

  var [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading, setLoading]);

  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      {websocketWindow ? (
        <Draggable
          cancel=".btn"
          // onClickOutside={() => {
          //   console.log("click fuera!");
          //   setWebsocketWindow(false);
          // }}
          // onFocusOutside={() => {}}
        >
          <div
            className="z-[300] fixed"
            // style={customStyles}
            ref={refCustom}
            style={{
              left: `calc(50% - ${135}px)`,
              top: `calc(50% - ${100}px)`,
            }}
          >
            <div className="wsContainer shadow-md backdrop-blur-sm bg-[#f5f5f5dc]">
              <div className="wsFloatingTop mb-3">
                <p className="wsTopText">{values.chargerId}</p>

                <div
                  className="wsCloseIcon btn"
                  onClick={() => setWebsocketWindow(false)}
                >
                  <Image
                    width={24}
                    height={24}
                    src={CloseIcon}
                    alt="close icon"
                    className="closeIcon"
                  />
                </div>
              </div>

              <div className="wsFloatingBody">
                <div className="fTextInput fTextInputFirst">
                  <TextField
                    className="fTextInput btn"
                    label={
                      t.websocket.chargerStatus[language] || "Charger Status"
                    }
                    size="small"
                    SelectProps={{ native: true }}
                    defaultValue={chargerStatusSelected}
                    fullWidth
                    onChange={(e) => {
                      console.log(e.target.value);
                      sendJsonMessage({ StatusNotification: e.target.value });
                      // setChargerStatusSelected(e.target.value);
                    }}
                    select
                  >
                    {chargerStatusOptions.map((option: ChargerStatusOption) => (
                      <option key={option.value} value={option.value}>
                        {t.states[option.value][language] || option.label}
                      </option>
                    ))}
                  </TextField>
                </div>

                <div className="fTextInput">
                  <TextField
                    className="fTextInput btn"
                    label="Send Report"
                    size="small"
                    SelectProps={{ native: true }}
                    onChange={(e) => {
                      sendJsonMessage({
                        DataTransfer: e.target.value,
                        chargerVendor: values.chargerVendor,
                      });
                    }}
                    select
                  >
                    {dataTransferOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t.websocket[option.value][language] || option.label}
                      </option>
                    ))}
                  </TextField>
                </div>

                <div className="fTextInput">
                  <button
                    className="requestButton btn"
                    onClick={() => {
                      console.log("a? qué pasa crack");

                      var messageToSend = {
                        authorize: false,
                        connectorId: values.connectorId,
                      };

                      console.log(messageToSend);
                      sendJsonMessage(messageToSend);
                    }}
                  >
                    {t.websocket.sendAuth[language] || "Send Authorize"}
                  </button>
                </div>

                <div className="fTextInput">
                  <button
                    className="requestButton btn"
                    onClick={() => {
                      if (values.chargerTransaction === "True") {
                        var messageToSend = {
                          StopTransaction: false,
                          connectorId: values.connectorId,
                        };

                        sendJsonMessage(messageToSend);
                      } else {
                        let messageToSend = {
                          StartTransaction: false,
                          connectorId: values.connectorId,
                        };

                        sendJsonMessage(messageToSend);
                      }
                    }}
                  >
                    {values.chargerTransaction === "True"
                      ? t.websocket.stopTransaction[language] ||
                        "Stop Transaction"
                      : t.websocket.startTransaction[language] ||
                        "Start Transaction"}
                  </button>
                </div>

                {/* <div className="fTextInput">
                  <button
                    className="requestButton btn"
                    onClick={() => {
                      if (reserveNow) {
                        var messageToSend = {
                          ReserveNow: false,
                          connectorId: values.connectorId,
                        };

                        sendJsonMessage(messageToSend);
                        setReserveNow(false);
                      } else {
                        let messageToSend: any = {
                          CancelReservation: false,
                          connectorId: values.connectorId,
                        };

                        sendJsonMessage(messageToSend);
                        setReserveNow(true);
                      }
                    }}
                  >
                    {reserveNow ? "Reserve Now" : "Cancel Reserve"}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </Draggable>
      ) : null}
    </div>
  );
}

export default ChargerWebsocket;
