"use client";

import useWebsocketStore from "@/stores/websocket-store";
import { useEffect, useState } from "react";

export default function useWebsocket(chargerId: string) {
  const [isWebsocketOn, setIsWebsocketOn] = useState(false);
  const { websocket } = useWebsocketStore();

  useEffect(() => {
    if (websocket.includes(chargerId)) {
      setIsWebsocketOn(true);
    }
  }, [chargerId, websocket]);

  return isWebsocketOn;
}
