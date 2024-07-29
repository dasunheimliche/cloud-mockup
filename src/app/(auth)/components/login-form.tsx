"use client";

import React, { useEffect, useState } from "react";

import LanguageSelector from "@/components/language-selector";

import InputField from "./input-field";
import LoginButton from "./submit-button";
import BackgroundImage from "./background-image";
import Logo from "./logo";

import t from "@/translations/login";
import useLangStore from "@/stores/lang-store";
import { usePathname } from "next/navigation";
import { normalizePathname } from "@/lib/utils";
import useNormalizedPath from "@/hooks/useNormalizedPath";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserTypeLabel from "./user-type-label";
import { Separator } from "@/components/ui/separator";

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin, loading }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hydrated, setHydrated] = useState<boolean>(false);

  const { language } = useLangStore();
  const path = useNormalizedPath();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div></div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex relative flex-col bg-white shadow outline outline-[1px] outline-[#ffffff0c] rounded-sm overflow-hidden w-[50rem] max-lg:w-full max-lg:h-full max-lg:justify-center"
    >
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-none dark:bg-gray-800 lg:max-w-4xl">
        <BackgroundImage />
        <div className="w-full px-6 py-24 pt-28 pb-32 md:px-8 lg:w-1/2 max-lg:w-full relative">
          <LanguageSelector />
          <Logo />
          <Separator className="opacity-0 my-6" />
          {path === "login" && (
            <InputField
              id="LoggingEmailAddress"
              label={"Username"}
              value={username}
              onChange={setUsername}
              type="text"
            />
          )}
          {path !== "login" && (
            <InputField
              id="LoggingEmailAddress"
              label={"Email"}
              value={username}
              onChange={setUsername}
              type="email"
            />
          )}
          <InputField
            id="loggingPassword"
            label={
              t.password[language as keyof typeof t.password] || "Password"
            }
            value={password}
            onChange={setPassword}
            type="password"
          />
          <LoginButton
            disabled={!username || !password}
            loading={loading}
            text={t.login[language as keyof typeof t.login] || "Log In"}
          />
          <Link
            href={path === "login" ? "/login-employee" : "/login"}
            className="w-full flex justify-center"
          >
            <Button className="border bg-transparent shadow-none border-slate-500 text-slate-700 py-2 hover:bg-slate-200 transition duration-300 mt-5 w-3/5 rounded-full h-[2.5rem]">
              {path === "login" ? "Log in as user" : "Log in as subuser"}
            </Button>
          </Link>
          <div className="w-full absolute left-0 bottom-0 h-7 flex bg-slate-900">
            <div className="w-4/6 h-full bg-white rounded-br-[1rem]"></div>
            <div className="w-2/6 h-full flex justify-center items-center bg-white relative">
              <div className="w-full h-full flex justify-center pt-1 items-center bg-slate-900 rounded-tl-[1rem] text-slate-50 text-[0.75rem] font-semibold">
                {path === "login" ? "SUBUSER" : "USER"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
