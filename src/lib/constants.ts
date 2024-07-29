import cABBIcon from "/public/imgs/chargers vendors/ABB.png";
import cALFENIcon from "/public/imgs/chargers vendors/ALFEN.png";
import cALPITRONICIcon from "/public/imgs/chargers vendors/ALPITRONIC.png";
import cAMPSIcon from "/public/imgs/chargers vendors/AMPS.png";
import cCHARGEVIcon from "/public/imgs/chargers vendors/CHARGE V.png";
import cCIRCONTROLIcon from "/public/imgs/chargers vendors/CIRCONTROL.png";
import cCIRCUTORIcon from "/public/imgs/chargers vendors/CIRCUTOR.png";
import cEATONIcon from "/public/imgs/chargers vendors/EATON.png";
import cECOTAPIcon from "/public/imgs/chargers vendors/ECOTAP.png";
import cEFACECIcon from "/public/imgs/chargers vendors/EFACEC.png";
import cENELXIcon from "/public/imgs/chargers vendors/ENEL X.png";
import cENSTOIcon from "/public/imgs/chargers vendors/ENSTO.png";
import cEVBOXIcon from "/public/imgs/chargers vendors/EVBOX.png";
import cEVMOBEIcon from "/public/imgs/chargers vendors/EVMOBE.png";
import cFLOOXIcon from "/public/imgs/chargers vendors/FLOOX.png";
import cHUAWEIIcon from "/public/imgs/chargers vendors/HUAWEI.png";
import cINGETEAMIcon from "/public/imgs/chargers vendors/INGETEAM.png";
import cKEBAIcon from "/public/imgs/chargers vendors/KEBA.png";
import cKEMPOWERIcon from "/public/imgs/chargers vendors/KEMPOWER.png";
import cLEGRANDIcon from "/public/imgs/chargers vendors/LEGRAND.png";
import cMENNEKESIcon from "/public/imgs/chargers vendors/MENNEKES.png";
import cORBISIcon from "/public/imgs/chargers vendors/ORBIS.png";
import cOTROSIcon from "/public/imgs/chargers vendors/OTROS.png";
import cPOLICHARGERIcon from "/public/imgs/chargers vendors/POLICHARGER.png";
import cSCHNEIDERIcon from "/public/imgs/chargers vendors/SCHNEIDER.png";
import cSIEMENSIcon from "/public/imgs/chargers vendors/SIEMENS.png";
import cSIMONIcon from "/public/imgs/chargers vendors/SIMON.png";
import cTESLAIcon from "/public/imgs/chargers vendors/TESLA.png";
import cV2CIcon from "/public/imgs/chargers vendors/V2C.png";
import cVEGAIcon from "/public/imgs/chargers vendors/VEGA.png";
import cWALLBOXIcon from "/public/imgs/chargers vendors/WALLBOX.png";
import cWEBASTOIcon from "/public/imgs/chargers vendors/WEBASTO.png";

import { ChargerOption, LanguageOption } from "./types";

export const connectorTypeOptions: ChargerOption[] = [
  {
    value: "DC",
    label: "Direct Current (DC)",
  },
  {
    value: "AC",
    label: "Alternating Current (AC)",
  },
];

export const ACThreePhaseConfigs: ChargerOption[] = [
  {
    value: "11",
    label: "11 (kW)",
  },
  {
    value: "22",
    label: "22 (kW)",
  },
];
export const ACSinglePhaseConfigs: ChargerOption[] = [
  {
    value: "3.7",
    label: "3.7 (kW)",
  },
  {
    value: "7.4",
    label: "7.4 (kW)",
  },
];

export const priorities: ChargerOption[] = [
  {
    value: "1",
    label: "High",
  },
  {
    value: "2",
    label: "Medium",
  },
  {
    value: "3",
    label: "Low",
  },
  {
    value: "4",
    label: "Very Low",
  },
];

export const ocppVersions: ChargerOption[] = [
  {
    value: "1.6",
    label: "OCPP v1.6",
  },
  {
    value: "2.0",
    label: "OCPP v2.0",
  },
  {
    value: "2.0.1",
    label: "OCPP v2.0.1",
  },
];

export const singlePhase: ChargerOption[] = [
  {
    value: "L1",
    label: "L1",
  },
  {
    value: "L2",
    label: "L2",
  },
  {
    value: "L3",
    label: "L3",
  },
];

export const threePhase: ChargerOption[] = [
  {
    label: "L1 - L2 - L3",
    value: "L1-L2-L3",
  },
  {
    label: "L2 - L3 - L1",
    value: "L2-L3-L1",
  },
  {
    label: "L3 - L1 - L2",
    value: "L3-L1-L2",
  },
];

export const chargerType: ChargerOption[] = [
  {
    value: "three-phase",
    label: "Three-Phase",
  },
  {
    value: "single-phase",
    label: "Single-Phase",
  },
];

export const DEFAULT_USER = {
  name: "",
  lastname: "",
  company: "",
  tag: "",
  role: "user",
  priority: 4,
  username: "",
  password: "",
  // chargerVendor: "",
  // chargerModel: "",
  // chargerSerial: "",
  allowOnlyInSelectedChargers: false,
};

export const DEFAULT_CHARGER = {
  chargerName: "",
  chargerId: "",
  chargerVendor: "",
  chargerModel: "",
  chargerSerialNumber: "",
  chargerType: "single-phase",
  chargerSupportOCPP: ocppVersions[0].value,
  chargerPhase: singlePhase[0].value,
  chargerPriority: priorities[0].value,
  chargerStatus: "unavailable",
  chargerKwPower: 3.7,
  chargerConnectorType: "DC",
  chargerEfficiency: 80,
  multiConector: "false",
  connectorId: 0,
  connectionDate: "",
};

export const ourChargersNames = [
  "ABB",
  "ALFEN",
  "ALPITRONIC",
  "AMPS",
  "CHARGE V",
  "CIRCONTROL",
  "CIRCUTOR",
  "EATON",
  "ECOTAP",
  "EFACEC",
  "ENEL X",
  "ENSTO",
  "EVBOX",
  "EVMOBE",
  "FLOOX",
  "HUAWEI",
  "INGETEAM",
  "KEBA",
  "KEMPOWER",
  "LEGRAND",
  "MENNEKES",
  "ORBIS",
  "POLICHARGER",
  "SCHNEIDER",
  "SIEMENS",
  "SIMON",
  "TESLA",
  "V2C",
  "VEGA",
  "WALLBOX",
  "WEBASTO",
];

export const ourChargersImgs = [
  cABBIcon,
  cALFENIcon,
  cALPITRONICIcon,
  cAMPSIcon,
  cCHARGEVIcon,
  cCIRCONTROLIcon,
  cCIRCUTORIcon,
  cEATONIcon,
  cECOTAPIcon,
  cEFACECIcon,
  cENELXIcon,
  cENSTOIcon,
  cEVBOXIcon,
  cEVMOBEIcon,
  cFLOOXIcon,
  cHUAWEIIcon,
  cINGETEAMIcon,
  cKEBAIcon,
  cKEMPOWERIcon,
  cLEGRANDIcon,
  cMENNEKESIcon,
  cORBISIcon,
  cPOLICHARGERIcon,
  cSCHNEIDERIcon,
  cSIEMENSIcon,
  cSIMONIcon,
  cTESLAIcon,
  cV2CIcon,
  cVEGAIcon,
  cWALLBOXIcon,
  cWEBASTOIcon,
];

export const states = [
  "available",
  "charging",
  "unavailable",
  "faulted",
  "other",
  "unauthorized",
];

export const LANGUAGES: LanguageOption[] = [
  { value: "uk", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
];

export const USER_TABLE_HEADERS = [
  {
    label: "id",
    hiddenOnMobile: false,
    isLast: false,
  },
  {
    label: "name",
    hiddenOnMobile: true,
    isLast: false,
  },
  {
    label: "lastname",
    hiddenOnMobile: true,
    isLast: false,
  },
  {
    label: "username",
    hiddenOnMobile: false,
    isLast: false,
  },
  {
    label: "tagID",
    hiddenOnMobile: false,
    isLast: false,
  },
  {
    label: "role",
    hiddenOnMobile: false,
    isLast: false,
  },
  {
    label: "priority",
    hiddenOnMobile: false,
    isLast: true,
  },
];
