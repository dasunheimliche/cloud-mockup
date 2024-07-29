import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import authAxios from "@/lib/api";

const PingIndicator = ({ url }: { url: string }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("HOLA");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await authAxios.get(`/ping?url=${url}`);
        setLoading(false); // Actualiza loading a false antes de actualizar isConnected
        setIsConnected(res.data);
      } catch (error) {
        setLoading(false); // Actualiza loading a false antes de actualizar isConnected
        setIsConnected(false);
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [url]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!loading) {
        try {
          const res = await authAxios.get(`/ping?url=${url}`);
          setIsConnected(res.data);
        } catch (error) {
          setIsConnected(false);
        }
      }
    }, 5000); // Cada 5 segundos

    return () => clearInterval(interval);
  }, [url, loading]);

  return (
    <div>
      {isConnected ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center items-center h-full w-5">
                {loading && (
                  <div
                    className={cn(
                      "bg-[#aaaaaa] w-2 h-2 opacity-100 rounded-full cursor-pointer animate-ping"
                    )}
                  />
                )}
                {!loading && (
                  <div
                    className={cn(
                      "bg-[#236e2d] w-2 h-2 opacity-100 rounded-full cursor-pointer"
                    )}
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Connected</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center items-center  h-full w-5">
                {loading && (
                  <div
                    className={cn(
                      "bg-[#aaaaaa] w-2 h-2 opacity-100 rounded-full cursor-pointer animate-ping"
                    )}
                  />
                )}
                {!loading && (
                  <div
                    className={cn(
                      "bg-[#f81616f5] w-2 h-2 opacity-100 rounded-full cursor-pointer"
                    )}
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-48">
              <p>Offline - Check if there&#39;s a problem with your link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default PingIndicator;
