export interface ChargerOption {
  value: string;
  label: string;
}

export interface ChargerType {
  chargerName: string;
  chargerId: string;
  chargerVendor: string;
  chargerModel: string;
  chargerSerialNumber: string;
  chargerType: "single-phase" | "three-phase";
  chargerSupportOCPP: string;
  chargerPhase: string;
  chargerPriority: string;
  chargerStatus: "available" | "unavailable";
  chargerKwPower: number;
  chargerConnectorType: "AC" | "DC"; // Asumiendo que son las dos opciones comunes
  chargerEfficiency: number; // Presumiblemente, un porcentaje de eficiencia
  multiConector: "true" | "false"; // Representando valores booleanos como cadenas
  connectorId: number;
}

export type LanguageType = "uk" | "es" | "fr" | "it" | "de" | "pt";

export interface LanguageOption {
  value: LanguageType;
  label: string;
}

export type Role = "owner" | "user" | "admin" | "maintainer";
export type PriorityUser = 1 | 2 | 3 | 4;

export interface User {
  id: string;
  username: string;
  password?: string;
  role: Role;
  name: string;
  last_name: string;
  company: string;
  tag_id: string;
  allow_only_in_selected_chargers: boolean;
  allowed_in: number[];
  priority_user: PriorityUser;
  last_login: string;
}
