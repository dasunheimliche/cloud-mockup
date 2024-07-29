"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import sessionStore from "@/stores/session-store";
import { useState } from "react";
import t from "@/translations/metrics";
import useLangStore from "@/stores/lang-store";

const regular = [
  {
    id: 4,
    username: "dasunheimliche",
  },
  {
    id: 1,
    username: "juan_perez",
  },
  {
    id: 2,
    username: "maria_gomez",
  },
  {
    id: 3,
    username: "pedro_lopez",
  },
  {
    id: 5,
    username: "ana_rodriguez",
  },
  {
    id: 6,
    username: "luis_fernandez",
  },
];

const admins = [
  {
    id: 10,
    username: "admin_principal",
  },
  {
    id: 11,
    username: "super_admin",
  },
  {
    id: 12,
    username: "admin_sistemas",
  },
  {
    id: 13,
    username: "admin_ventas",
  },
];

const management = [
  {
    id: 20,
    username: "gerente_general",
  },
  {
    id: 21,
    username: "gerente_operaciones",
  },
  {
    id: 22,
    username: "gerente_finanzas",
  },
];

export function UsersList() {
  const [users, setUsers] = useState<any>([]);
  const [update, setUpdate] = useState(0);

  const { token } = sessionStore();

  const { language } = useLangStore();

  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList className={cn("grid w-full grid-cols-3")}>
        <TabsTrigger
          value="user"
          className={cn(language !== "uk" ? "text-[0.75rem]" : "")}
        >
          {t.users.users[language] || "Users"}
        </TabsTrigger>
        <TabsTrigger
          value="admin"
          className={cn(language !== "uk" ? "text-[0.75rem]" : "")}
        >
          {t.users.admins[language] || "Admins"}
        </TabsTrigger>
        <TabsTrigger
          value="management"
          className={cn(language !== "uk" ? "text-[0.75rem]" : "")}
        >
          {t.users.mantainers[language] || "Management"}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <table id="myTable" className="w-full">
          <thead>
            <tr className="text-[0.75rem] font-normal uppercase text-slate-700">
              <th className="py-3 border-b-[1px] border-r-[1px] border-slate-200">
                ID
              </th>

              <th className="border-b-[1px] border-r-[1px] border-slate-200 ">
                {t.users.username[language] || "Username"}
              </th>
            </tr>
          </thead>
          <tbody>
            {regular.map((user: any, i: any) => (
              <tr
                key={i}
                className={cn(
                  "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]"
                )}
              >
                <td className="py-3 flex justify-center items-center border-b-[1px] border-slate-200">
                  {user.id}
                </td>
                <td className="border-b-[1px] border-slate-200 ">
                  {user.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>
      <TabsContent value="admin">
        <table id="myTable" className="w-full">
          <thead>
            <tr className="text-[0.75rem] font-normal uppercase text-slate-700">
              <th className="py-3 border-b-[1px] border-r-[1px] border-slate-200">
                ID
              </th>
              <th className="border-b-[1px] border-r-[1px] border-slate-200 ">
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((user: any, i: any) => (
              <tr
                key={i}
                className={cn(
                  "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]"
                )}
              >
                <td className="py-3 flex justify-center items-center border-b-[1px] border-slate-200">
                  {user.id}
                </td>
                <td className="border-b-[1px] border-slate-200 ">
                  {user.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>
      <TabsContent value="management">
        <table id="myTable" className="w-full">
          <thead>
            <tr className="text-[0.75rem] font-normal uppercase text-slate-700">
              <th className="py-3 border-b-[1px] border-r-[1px] border-slate-200">
                ID
              </th>
              <th className="border-b-[1px] border-r-[1px] border-slate-200 ">
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            {management.map((user: any, i: any) => (
              <tr
                key={i}
                className={cn(
                  "text-center cursor-pointer text-[0.8rem] transition-all text-slate-600 text-opacity-95 font-medium hover:bg-[#96f9c9]"
                )}
              >
                <td className="py-3 flex justify-center items-center border-b-[1px] border-slate-200">
                  {user.id}
                </td>
                <td className="border-b-[1px] border-slate-200 ">
                  {user.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>
    </Tabs>
  );
}
