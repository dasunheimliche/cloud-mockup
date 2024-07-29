import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import sessionStore from "@/stores/session-store";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/login";
import { cloudAxios } from "@/lib/api";

interface LoginResult {
  success: boolean;
  error?: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { setToken } = sessionStore();
  const { language } = useLangStore();

  const login = async (
    username: string,
    password: string
  ): Promise<LoginResult> => {
    setLoading(true);
    try {
      // const { data: tokenData } = await cloudAxios.post(`auth/token`, {
      //   username,
      //   password,
      // });

      // const fullToken = `${tokenData.token_type} ${tokenData.access_token}`;
      // setToken(fullToken);

      // console.log("FULLTOKEN: ", fullToken);

      // const { data } = await cloudAxios.get("auth/me", {
      //   headers: { Authorization: fullToken },
      // });

      // console.log("DATA: ", data);

      router.push("/home");

      toast({
        variant: "success",
        title: t.toast.loginSuccess[language] || "Logged in successfully",
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = handleLoginError(error);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error: unknown): string => {
    const isAxiosError = (
      error: any
    ): error is { response?: { status: number } } =>
      error && typeof error === "object" && "response" in error;

    let title: string;
    let description: string;

    if (!isAxiosError(error)) {
      title = t.toast.connErrorTitle[language] || "Connection error";
      description =
        t.toast.connErrorDescription[language] ||
        "Please check your internet connection and try again.";
    } else if (error.response?.status === 401) {
      title = t.toast.authErrorTitle[language] || "Unauthorized";
      description =
        t.toast.authErrorDescription[language] ||
        "Incorrect username or password.";
    } else {
      title = t.toast.failedErrorTitle[language] || "Login failed";
      description =
        t.toast.failedErrorDescription[language] ||
        "An unexpected error occurred. Please try again.";
    }

    toast({
      variant: "destructive",
      title,
      description,
    });

    return description;
  };

  return { login, loading };
};
