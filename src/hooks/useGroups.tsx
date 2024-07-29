"use client";

import { cloudAxios } from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function useGroups() {
  const [groups, setGroups] = useState<any>([]);
  const [update, setUpdate] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { token } = sessionStore();
  const { toast } = useToast();

  async function addGroup(object: any) {
    setLoading(true);
    try {
      await cloudAxios.post("/groups/create", null, {
        params: {
          owner_id: object.owner_id,
          name: object.name,
          city: object.city,
          zipcode: object.zipcode,
          address: object.address,
          local_currency: object.local_currency,
          price_kwh: object.currency,
        },
      });
      toast({
        variant: "success",
        title: "Group added successfully.",
      });
      updateGroupsList();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wront adding your group.",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function editGroup(object: any) {
    setLoading(true);
    try {
      await cloudAxios.put("/groups/edit", null, {
        params: {
          group_id: object.id,
          owner_id: object.owner_id,
          name: object.name,
          city: object.city,
          zipcode: object.zipcode,
          address: object.address,
          local_currency: object.local_currency,
          price_kwh: object.currency,
        },
      });
      toast({
        variant: "success",
        title: "Group edited successfully.",
      });
      setSelectedGroup(undefined);
      updateGroupsList();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wront adding your group.",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function removeGroup() {
    setLoading(true);

    try {
      await cloudAxios.delete(`groups/delete?id=${selectedGroup.id}`);

      updateGroupsList();
      setLoading(false);
      toast({
        variant: "success",
        title: "Group removed successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong removing your group",
      });
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getGroups(token: string | null) {
      if (!token) return;
      try {
        const res = await cloudAxios.get("groups/all", {
          headers: {
            Authorization: token,
          },
        });

        const dbGroups: any = res.data.response;

        const groupsList: any = Object.entries(dbGroups).map(
          ([id, instance]: any): any => ({
            id,
            name: instance.name,
            owner_id: instance.owner_id,
            city: instance.city,
            address: instance.address,
            local_currency: instance.local_currency,
            zipcode: instance.zipcode,
            price_kwh: instance.price_kwh,
            ...instance,
          })
        );

        setGroups(groupsList);
      } catch (error: unknown) {
        console.log(error);
      }
    }
    getGroups(token);
  }, [update]);

  function updateGroupsList() {
    setUpdate((prev) => prev + 1);
  }

  return {
    groups,
    loading,
    selectedGroup,
    setSelectedGroup,
    addGroup,
    editGroup,
    removeGroup,
    updateGroupsList,
  };
}
