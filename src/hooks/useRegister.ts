import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/login";
import { cloudAxios } from "@/lib/api";

interface LoginResult {
  success: boolean;
  error?: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLangStore();

  const signIn = async (
    email: string,
    password: string,
    contact_number: string
  ): Promise<LoginResult> => {
    console.table({ email, password, contact_number });

    setLoading(true);
    try {
      const res = await cloudAxios.post(
        `users/register?email=${email}&password=${password}&name=test&contact_number=${contact_number}`
      );

      console.log("RES: ", res);

      router.push("/login-employee");

      toast({
        variant: "success",
        title: t.toast.loginSuccess[language] || "Signed Up successfully",
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
        "Incorrect email or password.";
    } else {
      title = t.toast.failedErrorTitle[language] || "Sign Up failed";
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

  return { signIn, loading };
};
