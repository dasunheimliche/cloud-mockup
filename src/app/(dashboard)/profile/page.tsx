"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Toaster } from "@/components/ui/toaster";
import SaveButton from "../configuration/components/save-button";
import FormLabel from "@/components/form-label";
import { Separator } from "@/components/ui/separator";
import ConfigTitle from "../configuration/components/config-title";
import ConfigInput from "@/components/confing-input";
import ConfigSection from "../configuration/components/config-section";
import authAxios from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import sessionStore from "@/stores/session-store";
import usePingChecker from "@/hooks/usePingChecker";
import { AUTH_URL } from "@/lib/config";
import t from "@/translations/profile";
import useLangStore from "@/stores/lang-store";
import { Role } from "@/lib/types";
import DashboardPageLayout from "@/components/dashboard-page-layout";

export default function ProfilePage() {
  const [me, setMe] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [role, setRole] = useState<Role | null>(null);
  const [priority, setPriority] = useState<any>();
  const [username, setUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [chargerVendor, setChargerVendor] = useState<string>("");
  const [chargerModel, setChargerModel] = useState<string>("");
  const [chargerSerial, setChargerSerial] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { token, setUser } = sessionStore();
  const [users, setUsers] = useState<any>([]);
  const [update, setUpdate] = useState<number>(0);

  const { user } = useAuth();
  const { toast } = useToast();

  const isConnected = usePingChecker(AUTH_URL!);
  const { language } = useLangStore();

  const [originalUsername, setOriginalUsername] = useState("");
  const [originalTagId, setOriginalTagId] = useState("");

  const usernames = Object.values(users).map((user: any) =>
    user.username.toLowerCase()
  );
  const tagIds = Object.values(users).map((user: any) =>
    user.tag_id.toLowerCase()
  );

  const usernameExists =
    usernames.includes(username.toLowerCase()) &&
    username.toLowerCase() !== originalUsername.toLowerCase()
      ? "Username already exists"
      : "";
  const tagIdExists =
    tagIds.includes(tag.toLowerCase()) &&
    tag.toLowerCase() !== originalTagId.toLowerCase()
      ? "Tag ID already exists"
      : "";

  console.table({ usernameExists, tagIdExists });

  const isAdmin = user?.role === "admin";
  const isOwner = user?.role === "owner";

  async function handleSaveProfile() {
    setLoading(true);

    if (usernameExists) {
      toast({
        variant: "destructive",
        title: t.toast.usernameExists[language] || "Username already exists",
      });
      setLoading(false);
      return;
    }

    if (tagIdExists) {
      toast({
        variant: "destructive",
        title: t.toast.tagIdExists[language] || "Tag ID already exists",
      });
      setLoading(false);
      return;
    }

    try {
      await authAxios.put(
        `subusers/edit?id=${me.id}&username=${username}${
          newPassword ? `&password=${newPassword}` : ""
        }&name=${name}&last_name=${lastname}&assigned_charger_vendor=${chargerVendor}&assigned_charger_model=${chargerModel}&assigned_charger_serial=${chargerSerial}&priority_user=${priority}&company=${company}&role=${role}`,
        {
          data: {
            username,
            password: newPassword,
            name,
            last_name: lastname,
            tag_id: tag,
            assigned_charger_vendor: chargerVendor,
            assigned_charger_model: chargerModel,
            assigned_charger_serial: chargerSerial,
            priority_user: priority,
            company,
            role,
          },
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!role) return;

      setUser({
        username,
        password: newPassword,
        name,
        last_name: lastname,
        tag_id: tag,
        priority_user: priority,
        company,
        role,
        ...user,
      });
      setUpdate((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await authAxios.get("auth/me", {
          headers: {
            Authorization: token,
          },
        });

        const user = res.data.response.user;

        setName(user.name);
        setLastname(user.last_name);
        setCompany(user.company);
        setTag(user.tag_id);
        setOriginalTagId(user.tag_id);
        setRole(user.role);
        setPriority(user.priority_user);

        setUsername(user.username);
        setOriginalUsername(user.username);

        setChargerVendor(user.assigned_charger_vendor);
        setChargerModel(user.assigned_charger_model);
        setChargerSerial(user.assigned_charger_serial);

        setMe(user);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();
  }, [token, update]);

  useEffect(() => {
    async function getUsers(token: string | null) {
      if (!token) return;
      try {
        const res = await authAxios.get("subusers/get", {
          headers: {
            Authorization: token,
          },
        });

        const dbUsers = res.data.response;
        const userList = Object.entries(dbUsers).map(([id, user]: any) => ({
          id,
          ...user,
        }));
        setUsers(userList);
      } catch (error: any) {
        console.log(error);
      }
    }
    getUsers(token);
  }, [update]);

  return (
    <DashboardPageLayout
      title={t.header[language] || "PROFILE"}
      headerActions={
        <SaveButton isLoading={loading} onClick={handleSaveProfile} />
      }
      blocked={!me || !isConnected}
    >
      <div className="h-full w-full flex flex-col justify-start items-center relative rounded-[0.5rem] p-14 pb-40 box-border overflow-y-auto max-lg:p-7 max-lg:pb-28">
        <ConfigSection>
          <ConfigTitle label={t.userInfo[language] || "USER INFO"} />

          <div className="w-full flex gap-8">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.name[language] || "Name"}
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <ConfigInput
                  required
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.lastname[language] || "Lastname"}
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <ConfigInput
                  required
                  type="text"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-8">
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.company[language] || "Company"}
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <ConfigInput
                  required
                  type="text"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.tagId[language] || "Tag ID"}
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <ConfigInput
                  required
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-8">
            {(isOwner || isAdmin) && (
              <div className="flex flex-col justify-between pt-0 w-1/2 gap-3">
                <FormLabel
                  label={t.role[language] || "Role"}
                  className="text-sm font-semibold opacity-90"
                />
                <Select
                  required
                  labelId="user_role"
                  id="user_role"
                  value={role}
                  size="small"
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const role: Role = e.target.value as Role;
                    setRole(role);
                  }}
                >
                  <MenuItem value={"user"}>
                    {t.roleOptions[language][0] || "User"}
                  </MenuItem>
                  <MenuItem value={"admin"}>
                    {t.roleOptions[language][1] || "Admin"}
                  </MenuItem>
                  <MenuItem value={"mantainer"}>
                    {t.roleOptions[language][2] || "Mantainer"}
                  </MenuItem>
                  <MenuItem value={"owner"}>
                    {t.roleOptions[language][3] || "Owner"}
                  </MenuItem>
                </Select>
              </div>
            )}
            {(isOwner || isAdmin) && (
              <div className="w-1/2 flex flex-col gap-5">
                <div className="w-full flex gap-3">
                  <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                    <FormLabel
                      className="text-sm font-semibold opacity-90"
                      label={t.priority[language] || "Priority"}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-6">
                  <ConfigInput
                    required
                    type="number"
                    value={priority}
                    onChange={(e) => {
                      setPriority(+e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </ConfigSection>

        <Separator className="w-full h-[1px] bg-[#42424218] my-12" />

        {/* API URLS CONFIG */}

        <ConfigSection>
          <ConfigTitle label={t.security[language] || "SECURITY"} />

          <div className="w-full flex gap-8">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.username[language] || "Username"}
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <ConfigInput
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 justify-start pt-1 w-full">
                  <FormLabel
                    className="text-sm font-semibold opacity-90"
                    label={t.newPass[language] || "New Password"}
                  />
                </div>
              </div>
              <div className="flex w-full gap-6">
                <ConfigInput
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </ConfigSection>
      </div>
      <Toaster />
    </DashboardPageLayout>
  );
}
