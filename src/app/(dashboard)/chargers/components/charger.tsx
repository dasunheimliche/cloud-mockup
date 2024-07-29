"use client";

import {
  autoUpdate,
  detectOverflow,
  useFloating,
} from "@floating-ui/react-dom";
import { useRef, useState } from "react";
import ChargerWebsocket from "./charger-websocket";

import DockIcon from "@mui/icons-material/Dock";
import Triangle from "./triangle";

//! LOGO DE LOS VENDEDORES.
import Image from "next/image";
import cOTROSIcon from "/public/imgs/chargers vendors/OTROS.png";
import { ourChargersImgs, ourChargersNames, states } from "@/lib/constants";
import ChargerContextMenu from "./charger-context-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useWebsocket from "@/hooks/useWebsocket";
import useWebsocketStore from "@/stores/websocket-store";

function Charger(props: any) {
  var setSendJsonMessage = props.setSendJsonMessage;
  var setWebsocketReq = props.setWebsocketReq;

  var values = props.values;
  var isEven = props.isEven;

  var NotificationManager = props.NotificationManager;

  // var setRemoveConfirm = props.setRemoveConfirm;
  // var getChargers = props.getChargers;

  // var setEditPop = props.setEditPop;

  // var [websocket, setWebsocket] = useState(false);

  // const isWebsocketOn = useWebsocket(values.chargerId);
  const { websocket, addWebsocket, removeWebsocket, clearWebsockets } =
    useWebsocketStore();

  const isWebsocketOn = websocket.includes(values.chargerId);

  console.log("IS WEBSOCKET ON?: ", isWebsocketOn, " IN: ", values.chargerId);

  var websocketReq = props.websocketReq;
  var sendJsonMessage = props.sendJsonMessage;

  var [websocketWindow, setWebsocketWindow] = useState(false);
  var [closeConnection, setCloseConnection] = useState(null);

  const arrowRef = useRef(null);

  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: isEven ? "bottom" : "top",
    strategy: "fixed",

    middleware: [
      // autoPlacement(),
      {
        name: "middleware",
        async fn(state) {
          const overflow = await detectOverflow(state);

          if (isEven) {
            if (overflow.bottom > 0) {
              //? Se está saliendo de la pantalla.

              if (state.placement.toString() === "bottom") {
                return {
                  reset: {
                    placement: "top",
                  },
                };
              }
            }

            if (overflow.right < -30) {
              if (state.placement.toString() === "top") {
                return {
                  reset: {
                    placement: "bottom",
                  },
                };
              }
            }
          } else {
            if (overflow.top > 0) {
              //? Se está saliendo de la pantalla.

              if (state.placement.toString() === "top") {
                return {
                  reset: {
                    placement: "bottom",
                  },
                };
              }
            }

            if (overflow.top < -30) {
              if (state.placement.toString() === "bottom") {
                return {
                  reset: {
                    placement: "top",
                  },
                };
              }
            }
          }

          return {};
        },
      },
    ],
  });

  var [open, setOpen] = useState(false);
  var selectedValues = props.selectedValues;

  // const ref = useRef<any>(null);

  // const handleClick = () => {
  //   if (ref.current) {
  //     ref.current.click();
  //   }
  // };

  function handleDoubleCkick() {
    // props.selectedValues({ ...values });
    props.onClickEdit();
  }

  function handleClick() {
    props.selectedValues({ ...values });
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="Charger relative"
          ref={arrowRef}
          onContextMenu={() => props.selectedValues({ ...values })}
          onClick={handleClick}
          onDoubleClick={handleDoubleCkick}
        >
          {isEven ? (
            // Tríangulo mirando hacia arriba.
            <div
              className="chargerContainer down"
              ref={refs.setReference}
              // onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Triangle
                width={120}
                height={120}
                state={
                  states.includes(values.chargerStatus)
                    ? states.indexOf(values.chargerStatus)
                    : 4
                }
                down={true}
                values={values}
              />

              <Triangle
                width={85}
                height={85}
                neutral={true}
                down={true}
                values={values}
              />

              <div
                className="chargerInternal chargerInternalDown"
                onClick={() => {
                  if (websocketWindow) {
                    //? Está abierta la ventana de peticiones.

                    setWebsocketWindow(false);
                  }
                  setOpen(!open);
                }}
              >
                <div className="chargerConsumeDiv">
                  {values.chargingAllowed.toLowerCase() === "true" &&
                  values.chargerTransaction.toLowerCase() === "true" ? (
                    <p className="chargerConsume">
                      {values.chargingTo.toFixed(2)}{" "}
                      {values.chargerConnectorType === "AC" ? "A" : "kW"}
                    </p>
                  ) : (
                    <p className="chargerConsume">
                      0.0 {values.chargerConnectorType === "AC" ? "A" : "kW"}
                    </p>
                  )}
                </div>

                <div className="chargerImageDiv">
                  <p className="chargerVendor chargerVendorDown">
                    <DockIcon fontSize="inherit" className="asC" />{" "}
                    {values.chargerVendor.toUpperCase()}
                  </p>

                  {ourChargersNames.includes(
                    values.chargerVendor.toUpperCase()
                  ) ? (
                    <Image
                      width={45}
                      height={45}
                      src={
                        ourChargersImgs[
                          ourChargersNames.indexOf(
                            values.chargerVendor.toUpperCase()
                          )
                        ]
                      }
                      alt="Other"
                      className="chargerIcon"
                    />
                  ) : (
                    <Image
                      width={55}
                      height={45}
                      src={cOTROSIcon}
                      alt="Other"
                      className="chargerIcon"
                    />
                  )}

                  <div className="chargerConnectorIdDiv connectorIdDown -translate-y-1">
                    <p className="connectorId">{values.connectorId}</p>
                  </div>
                </div>
              </div>

              {/* {open ? (
                // TODO: Revisar esto.
                <ChargerTooltip
                  NotificationManager={NotificationManager}
                  refCustom={refs.setFloating}
                  onClickEdit={props.onClickEdit}
                  onClickDelete={props.onClickDelete}
                  stylesCustom={floatingStyles}
                  values={values}
                  // getChargers={getChargers}
                  selectedValues={selectedValues}
                  // setRemoveConfirm={setRemoveConfirm}
                  // setEditPop={setEditPop}
                  setOpen={setOpen}
                  websocket={websocket}
                  setWebsocket={setWebsocket}
                  // setSendJsonMessage={setSendJsonMessage}
                  setWebsocketReq={setWebsocketReq}
                  websocketWindow={websocketWindow}
                  setWebsocketWindow={setWebsocketWindow}
                  closeConnection={closeConnection}
                />
              ) : null} */}
            </div>
          ) : (
            // Tríangulo mirando hacia arriba.
            <div
              className="chargerContainer"
              ref={refs.setReference}
              onMouseLeave={() => setOpen(false)}
            >
              {/* {open ? (
                <ChargerTooltip
                  onClickEdit={props.onClickEdit}
                  NotificationManager={NotificationManager}
                  onClickDelete={props.onClickDelete}
                  refCustom={refs.setFloating}
                  stylesCustom={floatingStyles}
                  values={values}
                  // getChargers={getChargers}
                  // setRemoveConfirm={setRemoveConfirm}
                  // setEditPop={setEditPop}
                  selectedValues={selectedValues}
                  websocket={websocket}
                  setWebsocket={setWebsocket}
                  setOpen={setOpen}
                  // setSendJsonMessage={setSendJsonMessage}
                  setWebsocketReq={setWebsocketReq}
                  websocketWindow={websocketWindow}
                  setWebsocketWindow={setWebsocketWindow}
                  closeConnection={closeConnection}
                />
              ) : null} */}

              <Triangle
                width={120}
                height={120}
                state={
                  states.includes(values.chargerStatus)
                    ? states.indexOf(values.chargerStatus)
                    : 4
                }
                down={false}
                values={values}
              />

              <Triangle
                width={85}
                height={85}
                neutral={true}
                down={false}
                values={values}
              />

              <div
                className="chargerInternal chargerInternalTop"
                onClick={() => {
                  if (websocketWindow) {
                    //? Está abierta la ventana de peticiones.

                    setWebsocketWindow(false);
                  }
                  setOpen(!open);
                }}
              >
                <div className="chargerConnectorIdDiv connectorIdTop translate-y-1">
                  <p className="connectorId">{values.connectorId}</p>
                </div>

                <div className="chargerImageDiv">
                  {ourChargersNames.includes(
                    values.chargerVendor.toUpperCase()
                  ) ? (
                    <Image
                      width={45}
                      height={45}
                      src={
                        ourChargersImgs[
                          ourChargersNames.indexOf(
                            values.chargerVendor.toUpperCase()
                          )
                        ]
                      }
                      alt="Other"
                      className="chargerIcon"
                    />
                  ) : (
                    <Image
                      width={45}
                      height={45}
                      src={cOTROSIcon}
                      alt="Other"
                      className="chargerIcon"
                    />
                  )}

                  <p className="chargerVendor chargerVendorTop">
                    <DockIcon fontSize="inherit" />
                    {values.chargerVendor.toUpperCase()}
                  </p>
                </div>

                <div className="chargerConsumeDiv">
                  {values.chargingAllowed.toLowerCase() === "true" &&
                  values.chargerTransaction.toLowerCase() === "true" ? (
                    <p className="chargerConsume">
                      {values.chargingTo.toFixed(2)}{" "}
                      {values.chargerConnectorType === "AC" ? "A" : "kW"}
                    </p>
                  ) : (
                    <p className="chargerConsume">
                      0.0 {values.chargerConnectorType === "AC" ? "A" : "kW"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="websocket">
            {isWebsocketOn ? (
              <ChargerWebsocket
                setOpen={setOpen}
                values={values}
                setWebsocket={clearWebsockets}
                NotificationManager={NotificationManager}
                setSendJsonMessage={setSendJsonMessage}
                setWebsocketReq={setWebsocketReq}
                websocketReq={websocketReq}
                sendJsonMessage={sendJsonMessage}
                websocketWindow={websocketWindow}
                setWebsocketWindow={setWebsocketWindow}
                // refCustom={refs.setFloating}
                // customStyles={floatingStyles}
                closeConnection={closeConnection}
                setCloseConnection={setCloseConnection}
              />
            ) : null}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 backdrop-blur-sm bg-[#f5f5f5dc]">
        <ChargerContextMenu
          values={values}
          websocket={isWebsocketOn}
          setWebsocket={addWebsocket}
          removeWebsocket={removeWebsocket}
          closeConnection={closeConnection}
          setWebsocketReq={setWebsocketReq}
          setWebsocketWindow={setWebsocketWindow}
          selectedValues={selectedValues}
          websocketWindow={websocketWindow}
          onClickEdit={props.onClickEdit}
          onClickDelete={props.onClickDelete}
          onClickClone={props.onClickClone}
        />
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default Charger;
