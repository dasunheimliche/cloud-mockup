"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "@/components/ui/aurora-background";

import LoginForm from "../components/login-form";

import { useLogin } from "@/hooks/useLogin";
import sessionStore from "@/stores/session-store";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const { token } = sessionStore();
  const { login, loading } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <AuroraBackground>
      <LoginForm handleLogin={login} loading={loading} />

      <Toaster />
    </AuroraBackground>
  );
}
