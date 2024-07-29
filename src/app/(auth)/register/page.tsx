"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "@/components/ui/aurora-background";

import RegisterForm from "../components/register-form";

import { useLogin } from "@/hooks/useLogin";
import sessionStore from "@/stores/session-store";
import { useRegister } from "@/hooks/useRegister";

export default function LoginPage() {
  const { token } = sessionStore();
  const { signIn, loading } = useRegister();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <AuroraBackground>
      <RegisterForm onSubmit={signIn} loading={loading} />
      <Toaster />
    </AuroraBackground>
  );
}
