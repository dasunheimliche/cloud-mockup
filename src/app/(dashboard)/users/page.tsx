"use client";

import { useEffect, useRef, useState } from "react";
import { cloudAxios } from "@/lib/api";

import { Toaster } from "@/components/ui/toaster";
import DashboardPageLayout from "@/components/dashboard-page-layout";

import UsersActions from "./components/users-actions";
import UsersFormTriggers from "./components/users-form-triggers";
import TableHeaderItem from "./components/table-header-item";
import TableRow from "./components/table-row";

import ConfigSection from "../configuration/components/config-section";

import { AUTH_URL } from "@/lib/config";
import { User } from "@/lib/types";
import { USER_TABLE_HEADERS } from "@/lib/constants";

import sessionStore from "@/stores/session-store";
import useLangStore from "@/stores/lang-store";

import usePingChecker from "@/hooks/usePingChecker";

import t from "@/translations/users";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [update, setUpdate] = useState<number>(0);

  const { token } = sessionStore();
  const isConnected = usePingChecker(AUTH_URL!);
  const { language } = useLangStore();

  useEffect(() => {
    async function getUsers(token: string | null) {
      if (!token) return;
      try {
        const res = await cloudAxios.get("subusers/get", {
          headers: {
            Authorization: token,
          },
        });

        const dbUsers: Record<string, Omit<User, "id">> = res.data.response;

        const userList: User[] = Object.entries(dbUsers).map(
          ([id, user]: [string, Omit<User, "id">]): User => ({
            id,
            ...user,
          })
        );

        setUsers(userList);
      } catch (error: unknown) {
        console.log(error);
      }
    }
    getUsers(token);
  }, [update]);

  const addUserRef = useRef<HTMLButtonElement>(null);
  const deleteUserRef = useRef<HTMLButtonElement>(null);
  const editUserRef = useRef<HTMLButtonElement>(null);

  const handleActionClick = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  function updateHandler() {
    setSelectedUser(null);
    setUpdate((prev) => prev + 1);
  }

  return (
    <DashboardPageLayout
      title={t.header[language] || "USERS"}
      headerActions={
        <UsersActions
          blocked={!selectedUser}
          onOpenAddForm={() => handleActionClick(addUserRef)}
          onOpenEditForm={() => handleActionClick(editUserRef)}
          onOpenDeleteForm={() => handleActionClick(deleteUserRef)}
        />
      }
      blocked={!users || !isConnected}
    >
      <div className="h-full w-full flex flex-col justify-start items-center relative px-0 pt-0 pb-40 overflow-y-auto max-lg:p-7 max-sm:px-2 max-sm:py-1 max-lg:pb-28">
        <ConfigSection>
          <table id="myTable" className="w-full">
            <thead>
              <tr className="text-[0.75rem] font-normal uppercase text-slate-700">
                {USER_TABLE_HEADERS.map((header, i) => (
                  <TableHeaderItem
                    key={i}
                    label={header.label as keyof typeof t}
                    isHiddenOnMobile={header.hiddenOnMobile}
                    isLast={header.isLast}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((user: User, j: number) => {
                return (
                  <TableRow
                    key={j}
                    user={user}
                    isSelected={user.id === selectedUser?.id}
                    onSelect={() => setSelectedUser({ ...user })}
                    onOpenEditForm={() => handleActionClick(editUserRef)}
                  />
                );
              })}
            </tbody>
          </table>
        </ConfigSection>
        <Toaster />
        <UsersFormTriggers
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          addRef={addUserRef}
          editRef={editUserRef}
          delRef={deleteUserRef}
          update={updateHandler}
          users={users}
        />
      </div>
    </DashboardPageLayout>
  );
}
