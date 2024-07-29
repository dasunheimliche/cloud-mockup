"use client";

import { useEffect, useState } from "react";

export default function useCheckInput(state: any, schema: any) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!schema) return;

    const validateCharger = async () => {
      try {
        await schema.parseAsync(state);
        setError("");
      } catch (error: any) {
        const firstError = error.issues[0];
        setError(firstError.message);
      }
    };

    validateCharger();
  }, [state, schema]);

  useEffect(() => {
    setError("");
  }, [state]);

  return { error };
}
