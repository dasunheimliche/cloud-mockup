"use client";

import { cloudAxios } from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import saveAs from "file-saver";

export default function useVersion() {
  const [algorithmVersions, setAlgorithmVersions] = useState<any>([]);
  const [solutionVersions, setSolutionVersions] = useState<any>([]);
  const [update, setUpdate] = useState<number>(0);
  const [selectedVersion, setSelectedVersion] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { token } = sessionStore();
  const { toast } = useToast();

  async function addVersion(object: any) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", object.file);

    try {
      await cloudAxios.post("/versions/eva/new", formData, {
        params: {
          type: object.type,
          version: object.version,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        variant: "success",
        title: "Version added successfully.",
      });
      updateVersionsList();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wront adding your version.",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function editVersion(object: any) {
    setLoading(true);

    let formData = new FormData();

    if (object.file) {
      formData.append("file", object.file);
    }

    try {
      await cloudAxios.put("/versions/eva/edit", formData, {
        params: {
          type: object.type,
          version: object.version,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        variant: "success",
        title: "Version edited successfully.",
      });
      setSelectedVersion(undefined);
      updateVersionsList();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wront editing your version.",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function removeVersion() {
    setLoading(true);

    try {
      await cloudAxios.delete(`/versions/eva/delete?id=${selectedVersion.id}`);

      updateVersionsList();
      setLoading(false);
      toast({
        variant: "success",
        title: "Version removed successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong removing your version",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function downloadVersion(id: string, type: string, version: string) {
    try {
      const res = await cloudAxios.get("/versions/eva/get", {
        responseType: "blob",
        params: {
          id,
          type,
          version,
        },
      });
      saveAs(res.data, `${type}_${version}.bin`);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong downloading your file",
      });
    }
  }

  async function downloadLatestVersion(type: string) {
    try {
      const res = await cloudAxios.get(`/versions/eva/get/last/${type}`, {
        responseType: "blob",
      });
      saveAs(res.data, `${type}_latest_version.bin`);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
      toast({
        variant: "destructive",
        title: "Something went wrong downloading your file",
      });
    }
  }

  useEffect(() => {
    async function getGroups(token: string | null) {
      if (!token) return;
      try {
        const [algorithmResponse, solutionResponse] = await Promise.all([
          cloudAxios.get(`/versions/eva/get/all/algorithm`),
          cloudAxios.get(`/versions/eva/get/all/solution`),
        ]);

        const dbAlgorithmVersions: any = algorithmResponse.data.response;
        const dbSolutionVersions: any = solutionResponse.data.response;

        const algorithmVersionsList: any = Object.entries(
          dbAlgorithmVersions
        ).map(([id, algorithm]: any): any => ({
          id,
          version: algorithm.version,
          size: algorithm.size,
          download: () =>
            downloadVersion(id, algorithm.type, algorithm.version),
        }));

        const solutionVersionsList: any = Object.entries(
          dbSolutionVersions
        ).map(([id, solution]: any): any => ({
          id,
          version: solution.version,
          size: solution.size,
          download: () => downloadVersion(id, solution.type, solution.version),
        }));

        console.log("SOLUTIONS LIST: ", solutionVersionsList);
        console.log("ALGORITHMS LIST: ", algorithmVersionsList);

        setAlgorithmVersions(algorithmVersionsList);
        setSolutionVersions(solutionVersionsList);
      } catch (error: unknown) {
        console.log(error);
      }
    }
    getGroups(token);
  }, [update]);

  function updateVersionsList() {
    setUpdate((prev) => prev + 1);
  }

  return {
    algorithmVersions,
    solutionVersions,
    loading,
    selectedVersion,
    setSelectedVersion,
    addVersion,
    editVersion,
    removeVersion,
    downloadLatestVersion,
    downloadVersion,
    updateVersionsList,
  };
}
