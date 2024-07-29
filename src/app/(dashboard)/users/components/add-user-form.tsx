"use client";

import Modal from "@/components/ui/modal";
import ModalAccept from "@/components/ui/modal-accept";
import ModalClose from "@/components/ui/modal-close";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_USER } from "@/lib/constants";
import { useUserSchema } from "@/stores/zod-store";
import { FaUserPlus } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { memo, useEffect, useRef, useState } from "react";
import FormLabel from "@/components/form-label";
import { cn } from "@/lib/utils";
import ErrorBanner from "@/components/error-banner";
import { cloudAxios } from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { Switch } from "@mui/material";
import axios from "axios";
import { API_URL } from "@/lib/config";
import { ScrollArea } from "@/components/ui/scroll-area";
import t from "@/translations/forms";
import useLangStore from "@/stores/lang-store";

const AddUserForm = memo(function AddChargerForm({
  users,
  update,
}: {
  users: any;
  update: any;
}) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = sessionStore();

  const [allowedChargers, setAllowedChargers] = useState<any>([]);
  const [page, setPage] = useState(1);

  const usernames = Object.values(users).map((user: any) =>
    user.username.toLowerCase()
  );
  const tagIds = Object.values(users).map((user: any) =>
    user.tag_id.toLowerCase()
  );

  const { language } = useLangStore();

  const [user, setUser] = useState<any>({
    name: "",
    lastname: "",
    company: "",
    tag: "",
    role: "user",
    priority: 4,
    username: "",
    password: "",
    allowOnlyInSelectedChargers: false,
  });

  const onySelectedChargers = user.allowOnlyInSelectedChargers;

  const [chargers, setChargers] = useState<any>([]);

  const usernameExists = usernames.includes(user.username.toLowerCase())
    ? t.toast.usernameExists[language] || "Username already exists"
    : "";

  const tagIdExists = tagIds.includes(user.tag.toLowerCase())
    ? t.toast.tagExists[language] || "Tag ID already exists"
    : "";

  const { toast } = useToast();

  async function saveUser() {
    setLoading(true);
    try {
      await cloudAxios.post(
        `subusers/create?username=${user.username}&password=${
          user.password
        }&name=${user.name}&last_name=${
          user.lastname
        }&assigned_charger_vendor=${
          user.chargerVendor
        }&assigned_charger_model=${user.chargerModel}&assigned_charger_serial=${
          user.chargerSerial
        }&priority_user=${String(user.priority)}&company=${user.company}&role=${
          user.role
        }&allow_only_in_selected_chargers=${onySelectedChargers}`,
        {
          data: {
            tag_id: user.tag,
            allowed_in: onySelectedChargers ? allowedChargers : [],
          },
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      update({
        username: user.username,
        password: user.password,
        name: user.name,
        last_name: user.lastname,
        tag_id: user.tag,
        priority_user: String(user.priority),
        company: user.company,
        role: user.role,
      });

      toast({
        variant: "success",
        title: t.toast.successAddUser[language] || "User added successfully",
      });
      setAllowedChargers([]);
      setUser(DEFAULT_USER);
      setLoading(false);
      handleCloseClick();
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          t.toast.failedAddUser[language] || "Something went wrong adding user",
      });
      setLoading(false);
      console.log(error);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevents space from being typed
    }
  };

  const userSchemas: any = useUserSchema();

  useEffect(() => {
    if (!userSchemas) return;

    if (Object.values(user).some((value) => value !== "")) {
      const validateCharger = async () => {
        try {
          await userSchemas.parseAsync(user);
          setError("");
        } catch (error: any) {
          const firstError = error.issues[0];
          setError(firstError.message);
        }
      };

      validateCharger();
    }
  }, [user, userSchemas]);

  useEffect(() => {
    setError("");
  }, []);

  const closeRef = useRef<any>(null);

  const handleCloseClick = () => {
    if (closeRef.current) {
      setLoading(false);
      closeRef.current.click();
    }
  };

  function handleCloseButton() {
    setUser(DEFAULT_USER);
    setAllowedChargers([]);
    setPage(1);
  }

  async function getChargers() {
    var requests = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "uwu",
      },
    });

    try {
      const response = await requests.get("/chargers/get");
      setChargers(response.data);
      return; // Si la solicitud fue exitosa, salimos de la función
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }

  useEffect(() => {
    getChargers();
  }, []);

  useEffect(() => {
    if (!onySelectedChargers) return;

    if (allowedChargers < 1 && page === 2) {
      setError(
        t.chargerSelectorError[language] ||
          "You must select at least 1 charger."
      );
    } else {
      setError("");
    }
  }, [allowedChargers, page]);

  return (
    <Modal>
      <form
        id="edit-form"
        action=""
        className="bg-white rounded overflow-hidden"
      >
        <div className=" flex gap-2 items-center text-sm font-bold px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
          <FaUserPlus size={"1.25rem"} /> {t.addUser[language] || "ADD USER"}
        </div>
        {<ErrorBanner error={usernameExists || tagIdExists || error} />}
        {page === 1 && (
          <div className="w-full p-5 text-[#01110b]">
            <Label className="font-semibold relative pl-2 text-green-950">
              <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
              {t.userData[language] || "USER DATA"}
            </Label>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <FormLabel label={t.name[language] || "Name"} />
                  <Input
                    required
                    value={user.name}
                    placeholder={t.namePlaceholder[language] || "Ej: John"}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel label={t.lastname[language] || "Lastname"} />
                  <Input
                    required
                    value={user.lastname}
                    placeholder={t.lastnamePlaceholder[language] || "Ej: Doe"}
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <FormLabel label={t.company[language] || "Company"} />
                  <Input
                    required
                    value={user.company}
                    placeholder={
                      t.companyPlaceholder[language] || "Ej: Company S.A"
                    }
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      setUser({ ...user, company: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel label="Tag ID" />
                  <Input
                    required
                    value={user.tag}
                    placeholder={t.tagIdPlaceholder[language] || "Ej: #yourtag"}
                    onChange={(e) => setUser({ ...user, tag: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                  <FormLabel label={t.role[language] || "Role"} />
                  <Select
                    defaultValue={user.role}
                    onValueChange={(e) =>
                      setUser({
                        ...user,
                        role: e,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t.roleType[language] || "Role Type"}
                        </SelectLabel>
                        <SelectItem value="user">
                          {t.user[language] || "User"}
                        </SelectItem>
                        <SelectItem value="admin">
                          {t.admin[language] || "Admin"}
                        </SelectItem>
                        <SelectItem value="maintainer">
                          {t.mantainer[language] || "Maintainer"}
                        </SelectItem>
                        <SelectItem value="owner">
                          {t.owner[language] || "Owner"}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <FormLabel label={t.priority[language] || "Priority"} />
                  <Select
                    defaultValue={user.priority.toString()}
                    onValueChange={(e) => setUser({ ...user, priority: +e })}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.select[language] || "Select"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t.priority[language] || "Priority"}
                        </SelectLabel>
                        <SelectItem value="1">
                          {t.high[language] || "High"}
                        </SelectItem>
                        <SelectItem value="2">
                          {t.medium[language] || "Medium"}
                        </SelectItem>
                        <SelectItem value="3">
                          {t.low[language] || "Low"}
                        </SelectItem>
                        <SelectItem value="4">
                          {t.veryLow[language] || "Very Low"}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-3 bg-transparent" />
            <Label className="font-semibold relative pl-2 text-green-950">
              <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
              {t.security[language] || "SECURITY"}
            </Label>
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <FormLabel label={t.username[language] || "Username"} />
                  <Input
                    required
                    value={user.username}
                    placeholder={
                      t.nameUserPlaceholder[language] || "Ej: jhondoe"
                    }
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel label={t.password[language] || "Password"} />
                  <Input
                    required
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <Separator className="my-3 bg-transparent" />
            <Label className="font-semibold relative pl-2 text-green-950">
              <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
              {t.assignedCharger[language] || "ASSIGNED CHARGER INFO"}
            </Label>
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="airplane-mode">
                    {t.allowOnly[language] || "Allow Only in Selected Chargers"}
                  </Label>
                  <Switch
                    onChange={() =>
                      setUser((prev: any) => ({
                        ...prev,
                        allowOnlyInSelectedChargers:
                          !prev.allowOnlyInSelectedChargers,
                      }))
                    }
                    name="switchsimulate"
                    defaultChecked={user.allowOnlyInSelectedChargers}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="w-full p-5 text-[#01110b] flex flex-col justify-start gap-3">
            <Label className="font-semibold relative pl-2 text-green-950">
              <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
              {t.assignedCharger[language] || "ASSIGNED CHARGER INFO"}
            </Label>
            <FormLabel
              label={`${
                t.selectAllowed[language] || "SELECT ALLOWED CHARGERS"
              }: ${allowedChargers.length}`}
            />
            <ScrollArea className="w-full h-[24.9rem]">
              <table className="w-full">
                <thead>
                  <tr className="text-[0.75rem] font-normal uppercase text-slate-700">
                    <th className="py-3 border-b-[1px] border-r-[1px] border-slate-200">
                      ID
                    </th>
                    <th className="py-3 border-b-[1px] border-r-[1px] border-slate-200">
                      {t.name[language] || "NAME"}
                    </th>
                    <th className="border-b-[1px] border-r-[1px] border-slate-200 ">
                      {t.chargerId[language] || "CHARGER ID"}
                    </th>
                    <th className="py-3 border-b-[1px] border-slate-200">
                      {t.connectorId[language] || "CONNECTOR ID"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chargers.map((charger: any, i: any) => (
                    <tr
                      key={charger?.id}
                      className={cn(
                        "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]",
                        allowedChargers.includes(charger?.id)
                          ? "bg-[#96f9c9]"
                          : ""
                      )}
                      onClick={() =>
                        setAllowedChargers((prev: any) => {
                          if (prev.includes(charger.id)) {
                            return prev.filter((id: any) => id !== charger.id);
                          } else {
                            return [...prev, charger.id];
                          }
                        })
                      }
                    >
                      <td className="py-3 flex justify-center items-center border-b-[1px] border-slate-200">
                        {charger?.id}
                      </td>
                      <td className="border-b-[1px] border-slate-200 ">
                        {charger?.chargerName}
                      </td>
                      <td className="border-b-[1px] border-slate-200 ">
                        {charger?.chargerId}
                      </td>
                      <td className="border-b-[1px] border-slate-200 ">
                        {charger?.connectorId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        )}

        <div className="flex justify-end mt-1 gap-2 pr-5 pb-3">
          <ModalClose onClick={handleCloseButton} />

          {user.allowOnlyInSelectedChargers && page === 2 && (
            <button
              type="button"
              className={cn(
                "flex justify-center rounded-full text-sm items-center font-semibold shadow-none h-4 w-24 py-5 bg-slate-950 text-zinc-50 hover:bg-slate-900 hover:text-zinc-50"
              )}
              onClick={() => setPage(1)}
            >
              {t.previous[language] || "Previous"}
            </button>
          )}

          {(!user.allowOnlyInSelectedChargers || page === 2) && (
            <button
              type="button"
              disabled={!!error}
              className={cn(
                "flex justify-center rounded-full text-sm items-center font-semibold shadow-none h-4 w-24 py-5 bg-slate-950 text-zinc-50 hover:bg-slate-900 hover:text-zinc-50",
                !!error
                  ? "opacity-35 cursor-not-allowed hover:bg-slate-950 hover:text-slate-50"
                  : ""
              )}
              onClick={saveUser}
            >
              {!loading && (t.add[language] || "Add")}
              {loading && <div className="loader"></div>}
            </button>
          )}

          {user.allowOnlyInSelectedChargers && page === 1 && (
            <button
              type="button"
              disabled={!!error}
              className={cn(
                "flex justify-center rounded-full text-sm items-center font-semibold shadow-none h-4 w-24 py-5 bg-slate-950 text-zinc-50 hover:bg-slate-900 hover:text-zinc-50",
                !!error
                  ? "opacity-35 cursor-not-allowed hover:bg-slate-950 hover:text-slate-50"
                  : ""
              )}
              onClick={() => setPage(2)}
            >
              {!loading && (t.next[language] || "Next")}
              {loading && <div className="loader"></div>}
            </button>
          )}

          <ModalAccept
            ref={closeRef}
            onClick={() => {}}
            label="Add"
            className="absolute opacity-0 -translate-x-[10000px] "
          />
        </div>
      </form>
    </Modal>
  );
});

export default AddUserForm;