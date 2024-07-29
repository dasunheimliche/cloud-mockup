"use client";

import { cloudAxios } from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import saveAs from "file-saver";
import { User } from "@/lib/types";

export default function useBackups() {
  const [backups, setBackups] = useState<any>([]);
  const [update, setUpdate] = useState<number>(0);
  const [selectedInstance, setSelectedInstance] = useState<undefined | string>(
    "all"
  );
  const [instances, setInstances] = useState();
  const [loading, setLoading] = useState(false);

  const { token } = sessionStore();
  const { toast } = useToast();

  async function downloadLatestBackup(uuid: string | undefined) {
    if (!uuid) return;

    try {
      const res = await cloudAxios.get(`/backups/last`, {
        responseType: "blob",
        params: {
          local_eva_id: uuid,
        },
      });
      saveAs(res.data, `${uuid}_latest_version.bin`);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
      toast({
        variant: "destructive",
        title: "Something went wrong downloading your file",
      });
    }
  }

  useEffect(() => {
    async function getBackups(token: string | null) {
      if (!token) return;

      setLoading(true);

      try {
        const backupsResponse = await cloudAxios.get(`/backups/all`, {
          params: {
            local_eva_id: selectedInstance === "all" ? null : selectedInstance,
          },
        });

        const dbBackups: any = backupsResponse.data.response;

        const algorithmVersionsList: any = Object.entries(dbBackups).map(
          ([id, backup]: any): any => ({
            id,
            ...backup,
            download: () => {},
          })
        );

        setBackups(algorithmVersionsList);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBackups(token);
  }, [selectedInstance, update]);

  useEffect(() => {
    async function getInstances() {
      const res = await cloudAxios.get("instances/all", {
        headers: {
          Authorization: token,
        },
      });

      const dbInstances: Record<string, Omit<User, "id">> = res.data.response;

      const instancesList: any = Object.entries(dbInstances).map(
        ([id, instance]: any): any => ({
          label: instance.name,
          value: instance.local_eva_id,
        })
      );

      setInstances(instancesList);
    }

    try {
      getInstances();
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);

  function updateBackupsList() {
    setUpdate((prev) => prev + 1);
  }

  function handleInstanceSelector(e: any) {
    if (!e) return;
    setSelectedInstance(e);
  }

  console.log("INSTANCES: ", selectedInstance);

  return {
    backups,
    instances,
    selectedInstance,
    loading,
    downloadLatestBackup,
    updateBackupsList,
    handleInstanceSelector,
  };
}
