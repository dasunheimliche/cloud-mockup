"use client";

import React, { useEffect, useState } from "react";

import LanguageSelector from "@/components/language-selector";

import InputField from "./input-field";
import LoginButton from "./submit-button";
import BackgroundImage from "./background-image";
import Logo from "./logo";

import t from "@/translations/login";

import useLangStore from "@/stores/lang-store";
import PasswordInputField from "./password-input-fiend";

interface LoginFormProps {
  onSubmit: (username: string, password: string, contact: string) => void;
  loading: boolean;
}

const RegisterForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [hydrated, setHydrated] = useState<boolean>(false);

  const { language } = useLangStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password, contact);
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
        <div className="w-full px-6 py-24 pt-28 md:px-8 pb-32 lg:w-1/2 max-lg:w-full relative">
          <LanguageSelector />
          {/* <UserTypeLabel
            userType={path === "login" ? "clientes" : "empleados"}
          /> */}
          <Logo />
          <p className="mt-3 text-xl text-center text-slate-600 dark:text-gray-200">
            {"Create an account!"}
          </p>

          <InputField
            id="LoggingEmailAddress"
            label={"Email"}
            value={email}
            onChange={setEmail}
            type="email"
          />
          <PasswordInputField
            id="LoggingEmailAddress"
            label={"Password"}
            value={password}
            onChange={setPassword}
            type="password"
          />
          <InputField
            id="loggingPassword"
            label={"Contact number"}
            value={contact}
            onChange={setContact}
            type="text"
          />
          <LoginButton
            disabled={!email || !password || !contact}
            loading={loading}
            text={"Sign Un"}
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
