"use client";

import authAxios from "@/lib/api";
import sessionStore from "@/stores/session-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const { token, setToken } = sessionStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    async function getUser(token: string) {
      try {
        if (!token) {
          router.push("login");
        }
        // const userRes = await authAxios.get("auth/me", {
        //   headers: {
        //     Authorization: token,
        //   },
        // });

        // const user = userRes.data.response.user;

        // setUser(user);
        setLoading(false);
      } catch (error: any) {
        // setUser(false);
        setToken(null);
        // router.push("/login");
        setLoading(false);
        setError(error);
      }
    }

    getUser(token);
  }, [token]);

  return { user, loading, error };
}
