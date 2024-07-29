"use client";

import { cloudAxios } from "@/lib/api";
import { User } from "@/lib/types";
import sessionStore from "@/stores/session-store";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function useInstances() {
  const [instances, setInstances] = useState<User[]>([]);
  const [update, setUpdate] = useState<number>(0);
  const [selectedInstance, setSelectedInstance] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { token } = sessionStore();
  const { toast } = useToast();

  async function addInstance(object: any) {
    setLoading(true);
    try {
      await cloudAxios.post(
        `instances/create?local_eva_id=${object.local_eva_id}&group_id=${object.group_id}&name=${object.name}`
      );
      toast({
        variant: "success",
        title: "Instance added successfully.",
      });
      updateInstanceList();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wront adding your instance.",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function editInstance(object: any) {
    setLoading(true);
    try {
      await cloudAxios.put("/instances/edit", null, {
        params: {
          id: object.id,
          local_eva_id: object.localEvaId,
          group_id: object.groupId,
          name: object.instanceName,
          main_dis_limit: object.mainDisLimit,
          sub_dis_limit: object.subDisLimit,
          op_sub_dis_limit: object.opSubDisLimit,
          solar_installed: object.solarInstalled,
          percentage_one_priority: object.percentageOnePriority,
          percentage_two_priority: object.percentageTwoPriority,
          percentage_three_priority: object.percentageThreePriority,
          percentage_four_priority: object.percentageFourPriority,
          only_pv: object.onlyPv,
        },
      });
      toast({
        variant: "success",
        title: "Instance updated successfully.",
      });
      updateInstanceList();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong updating your instance.",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function removeInstance() {
    setLoading(true);

    try {
      await cloudAxios.delete(`instances/delete?id=${selectedInstance.id}`);

      updateInstanceList();
      setLoading(false);
      toast({
        variant: "success",
        title: "Instances removed successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong removing your instance",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getInstances(token: string | null) {
      if (!token) return;
      try {
        const res = await cloudAxios.get("instances/all", {
          headers: {
            Authorization: token,
          },
        });

        const dbInstances: Record<string, Omit<User, "id">> = res.data.response;

        const instancesList: any = Object.entries(dbInstances).map(
          ([id, instance]: any): any => ({
            id,
            name: instance.name,
            local_eva_id: instance.local_eva_id,
            group_id: 1,
            only_pv: false,
            solar_instaled: [25, 25, 25],
            main_dis_limit: [250, 250, 250],
            sub_dis_limit: [25, 25, 25],
            op_sub_dis_limit: [25, 25, 25],
            percentage_one_priority: 100,
            percentage_two_priority: 80,
            percentage_three_priority: 60,
            percentage_four_priority: 40,
            websocket_connection: false,
            subusers: () => {},
          })
        );

        setInstances(instancesList);
      } catch (error: unknown) {
        console.log(error);
      }
    }
    getInstances(token);
  }, [update]);

  function updateInstanceList() {
    setUpdate((prev) => prev + 1);
  }

  return {
    instances,
    loading,
    selectedInstance,
    setSelectedInstance,
    addInstance,
    editInstance,
    removeInstance,
    updateInstanceList,
  };
}
