"use client";

import Loading from "@/components/loading";
import useAuth from "@/hooks/useAuth";
import sessionStore from "@/stores/session-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StartAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isConfigured } = sessionStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const { loading, user } = useAuth();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.push("/login");
      return;
    }

    if (token && isConfigured) {
      router.push("/interactions");
      return;
    }
  }, [user, token, hydrated]);

  if (!user || !hydrated || loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
