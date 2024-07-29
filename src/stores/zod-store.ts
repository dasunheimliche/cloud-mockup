"use client";

import { z } from "zod";
import useLangStore from "./lang-store";
import t from "@/translations/zod";
import { useEffect, useState } from "react";

export const useChargerSchema = () => {
  const { language } = useLangStore();

  const [zodCharger, setZodUser] = useState<any>(null);

  useEffect(() => {
    setZodUser(
      z.object({
        chargerName: z
          .string()
          .min(
            1,
            t.charger.nameRequired[language] || "Charger name is required"
          ),
        chargerId: z
          .string()
          .min(1, t.charger.idRequired[language] || "Charger ID is required"),
        chargerVendor: z
          .string()
          .min(
            1,
            t.charger.vendorRequired[language] || "Charger vendor is required"
          ),
        chargerModel: z
          .string()
          .min(
            1,
            t.charger.modelRequired[language] || "Charger model is required"
          ),
        chargerSerialNumber: z
          .string()
          .min(
            1,
            t.charger.serialRequired[language] ||
              "Charger serial number is required"
          ),
        // chargerType: z.enum(["single-phase", "three-phase"], {
        //   errorMap: (issue) => ({
        //     message: "Charger type must be either single-phase or three-phase",
        //   }),
        // }),
        chargerSupportOCPP: z
          .string()
          .min(
            1,
            t.charger.ocppRequired[language] || "OCPP version is required"
          ),
        chargerPhase: z
          .string()
          .min(
            1,
            t.charger.phaseRequired[language] || "Charger phase is required"
          ),
        chargerPriority: z
          .string()
          .min(
            1,
            t.charger.priorityRequired[language] ||
              "Charger priority is required"
          ),
        chargerStatus: z.enum(
          [
            "available",
            "unavailable",
            "charging",
            "faulted",
            "other",
            "unauthorized",
          ],
          {
            errorMap: (issue) => ({
              message:
                "Charger status must be one of: available, unavailable, charging, faulted, unauthorized, or other",
            }),
          }
        ),
        chargerKwPower: z
          .number()
          .positive(
            t.charger.powerPositive[language] ||
              "Charger power must be a positive number"
          ),
        chargerConnectorType: z.enum(["AC", "DC"], {
          errorMap: (issue) => ({
            message: "Connector type must be either AC or DC",
          }),
        }),
        chargerEfficiency: z
          .number()
          .min(
            0,
            t.charger.effiencyMin[language] ||
              "Charger efficiency must be at least 0"
          )
          .max(
            100,
            t.charger.effiencyMax[language] ||
              "Charger efficiency must be at most 100"
          ),
        // multiConector: z.string(),
        connectorId: z
          .number()
          .min(
            0,
            t.charger.connectorIdMin[language] ||
              "Connector ID must be at least 0"
          )
          .max(
            10,
            t.charger.connectorIdMax[language] ||
              "Connector ID must be at most 10"
          ),
      })
    );
  }, [language]);

  return zodCharger;
};

export const useUserSchema = () => {
  const { language } = useLangStore();

  const [zodUser, setZodUser] = useState<any>(null);

  useEffect(() => {
    setZodUser(
      z.object({
        name: z.string().min(1, { message: t.user.nameRequired[language] }),
        lastname: z.string().min(1, {
          message: t.user.lastnameRequired[language] || "Lastname is required",
        }),
        company: z.string().min(1, {
          message: t.user.companyRequired[language] || "Company is required",
        }),
        tag: z.string().min(1, {
          message: t.user.tagRequired[language] || "Tag is required",
        }),
        role: z.enum(["owner", "user", "admin", "maintainer"]).default("user"),
        priority: z
          .number()
          .int()
          .min(1, {
            message:
              t.user.priorityMin[language] || "Priority must be at least 1",
          })
          .max(4, {
            message:
              t.user.priorityMax[language] || "Priority must be at most 4",
          }),
        username: z.string().min(1, {
          message: t.user.usernameRequired[language] || "Username is required",
        }),
        password: z.string().min(1, {
          message: t.user.passwordRequired[language] || "Password is required",
        }),
      })
    );
  }, [language]);

  return zodUser;
};

export const useUserEditSchema = () => {
  const { language } = useLangStore();

  const [zodUser, setZodUser] = useState<any>(null);

  useEffect(() => {
    setZodUser(
      z.object({
        name: z.string().min(1, { message: t.user.nameRequired[language] }),
        lastname: z.string().min(1, {
          message: t.user.lastnameRequired[language] || "Lastname is required",
        }),
        company: z.string().min(1, {
          message: t.user.companyRequired[language] || "Company is required",
        }),
        tag: z.string().min(1, {
          message: t.user.tagRequired[language] || "Tag is required",
        }),
        role: z.enum(["owner", "user", "admin", "maintainer"]).default("user"),
        priority: z
          .number()
          .int()
          .min(1, {
            message:
              t.user.priorityMin[language] || "Priority must be at least 1",
          })
          .max(4, {
            message:
              t.user.priorityMax[language] || "Priority must be at most 4",
          }),
        username: z.string().min(1, {
          message: t.user.usernameRequired[language] || "Username is required",
        }),
      })
    );
  }, [language]);

  return zodUser;
};

export const useInstanceSchema = () => {
  const [zodInstance, setZodInstance] = useState<any>(null);

  useEffect(() => {
    setZodInstance(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        evaId: z.string().uuid("Invalid UUID format for evaId"),
        groupId: z.string().min(1, { message: "Group ID is required" }),
      })
    );
  }, []);

  return zodInstance;
};

export const useVersionSchema = () => {
  const [zodInstance, setZodInstance] = useState<any>(null);

  useEffect(() => {
    setZodInstance(
      z.object({
        type: z.string().min(1, { message: "Type is required" }),
        version: z.string().min(1, { message: "Version is required" }),
        file: z
          .instanceof(File)
          .refine((file) => file.size > 0, { message: "File is required" }),
      })
    );
  }, []);

  return zodInstance;
};

export const useEditVersionSchema = () => {
  const [zodInstance, setZodInstance] = useState<any>(null);

  useEffect(() => {
    setZodInstance(
      z.object({
        type: z.string().min(1, { message: "Type is required" }),
        version: z.string().min(1, { message: "Version is required" }),
      })
    );
  }, []);

  return zodInstance;
};

export const useEditInstanceSchema = () => {
  const [zodInstance, setZodInstance] = useState<any>(null);

  useEffect(() => {
    setZodInstance(
      z.object({
        name: z.string().min(1, "Name is required"),
        evaId: z.string().uuid("EVA ID must be a valid UUID"),
        groupId: z.number().int("Group ID must be an integer"),
        mainDisLimit: z
          .array(z.number().nullable())
          .nonempty("Main Dis Limit is required")
          .refine((arr) => {
            // Validamos que cada elemento sea menor o igual al anterior, considerando que puede ser null
            return arr.every((value, index) => {
              if (index === 0) return true; // No comparo el primer elemento
              if (value === null) return true; // Si el valor actual es null, no se compara
              const prevValue = arr[index - 1];
              if (prevValue === null) return true; // Si el valor anterior es null, no se compara
              return value <= prevValue; // Comparación de elementos no null
            });
          }, "Main Distribution: Invalid value"),
        subDisLimit: z
          .array(z.number().nullable())
          .nonempty("Sub Dis Limit is required")
          .refine((arr) => {
            // Validamos que cada elemento sea menor o igual al anterior, considerando que puede ser null
            return arr.every((value, index) => {
              if (index === 0) return true; // No comparo el primer elemento
              if (value === null) return true; // Si el valor actual es null, no se compara
              const prevValue = arr[index - 1];
              if (prevValue === null) return true; // Si el valor anterior es null, no se compara
              return value <= prevValue; // Comparación de elementos no null
            });
          }, "Sub Distribution: Invalid value"),
        opSubDisLimit: z
          .array(z.number().nullable())
          .length(3, "Op Sub Dis Limit must be an array of 3 numbers or nulls")
          .refine((arr) => {
            // Validamos que cada elemento sea menor o igual al anterior, considerando que puede ser null
            return arr.every((value, index) => {
              if (index === 0) return true; // No comparo el primer elemento
              if (value === null) return true; // Si el valor actual es null, no se compara
              const prevValue = arr[index - 1];
              if (prevValue === null) return true; // Si el valor anterior es null, no se compara
              return value <= prevValue; // Comparación de elementos no null
            });
          }, "Operational Sub Distribution: Invalid value"),
        percentageOnePriority: z
          .number()
          .min(0)
          .max(100, "Percentage One Priority must be between 0 and 100"),
        percentageTwoPriority: z
          .number()
          .min(0)
          .max(100, "Percentage Two Priority must be between 0 and 100"),
        percentageThreePriority: z
          .number()
          .min(0)
          .max(100, "Percentage Three Priority must be between 0 and 100"),
        percentageFourPriority: z
          .number()
          .min(0)
          .max(100, "Percentage Four Priority must be between 0 and 100"),
        onlyPv: z.boolean(),
        solarInstalled: z
          .array(z.number().nullable())
          .length(3, "Solar Installed must be an array of 3 numbers or nulls")
          .refine((arr) => {
            // Validamos que cada elemento sea menor o igual al anterior, considerando que puede ser null
            return arr.every((value, index) => {
              if (index === 0) return true; // No comparo el primer elemento
              if (value === null) return true; // Si el valor actual es null, no se compara
              const prevValue = arr[index - 1];
              if (prevValue === null) return true; // Si el valor anterior es null, no se compara
              return value <= prevValue; // Comparación de elementos no null
            });
          }, "PV Distribution: Invalid value"),
      })
    );
  }, []);

  return zodInstance;
};

export const useGroupSchema = () => {
  const [zodInstance, setZodInstance] = useState<any>(null);

  useEffect(() => {
    setZodInstance(
      z.object({
        name: z.string().min(1, "Name is required"),
        owner_id: z
          .string()
          .min(1, "Owner ID is required")
          .refine((val) => !isNaN(parseFloat(val)), {
            message: "Price per kWh must be a number",
          }),
        city: z.string().min(1, "City is required"),
        zipcode: z
          .string()
          .min(1, "Zipcode is required")
          .refine((val) => !isNaN(parseFloat(val)), {
            message: "Price per kWh must be a number",
          }),
        address: z.string().min(1, "Address is required"),
        local_currency: z.string().min(1, "Local currency is required"),
        price_kwh: z
          .string()
          .min(1, "Kwh price is required")
          .refine((val) => !isNaN(parseFloat(val)), {
            message: "Price per kWh must be a number",
          }),
      })
    );
  }, []);

  return zodInstance;
};
