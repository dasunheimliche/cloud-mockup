import { useEffect, useState } from "react";
import authAxios from "@/lib/api";

const usePingChecker = (url: string) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let interval: any;

    const checkConnection = async () => {
      try {
        const res = await authAxios.get(`/ping?url=${url}`);
        setIsConnected(res.data);
      } catch (error) {
        setIsConnected(false);
      }
    };

    const startInterval = () => {
      interval = setInterval(checkConnection, 2000); // Cada 2 segundos
    };

    startInterval();

    return () => clearInterval(interval);
  }, [url]);

  return isConnected;
};

export default usePingChecker;
