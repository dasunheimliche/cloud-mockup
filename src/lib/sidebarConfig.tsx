import t from "@/translations/dashboard/layout";

import { HiMiniChartBarSquare } from "react-icons/hi2";
import { AiFillInteraction } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { MdLiveHelp } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdElectricCar } from "react-icons/md";

import { PiStackSimpleFill } from "react-icons/pi";
import { PiStackFill } from "react-icons/pi";

import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";

interface SidebarButtonConfig {
  key: string;
  href: string;
  labelKey: keyof typeof t;
  icon: React.ReactNode;
  roles: string[];
}

export const BottomSidebarButtons: SidebarButtonConfig[] = [
  {
    key: "support",
    href: "https://www.evasoft.app/intro",
    labelKey: "support",
    icon: <MdLiveHelp className="text-[1.3rem] max-sm:text-[2rem]" />,
    roles: ["all"],
  },
  {
    key: "configurations",
    href: "/configuration",
    labelKey: "configurations",
    icon: <IoMdSettings className="text-[1.3rem] max-sm:text-[2rem]" />,
    roles: ["owner", "maintainer"],
  },
];

export const TopSidebarButtons: SidebarButtonConfig[] = [
  {
    key: "instances",
    href: "/instances",
    labelKey: "instances",
    icon: <PiStackSimpleFill className="text-[1.3rem] max-sm:text-[2rem]" />,
    roles: ["all"],
  },
  {
    key: "groups",
    href: "/groups",
    labelKey: "groups",
    icon: <PiStackFill className="text-[1.4rem] max-sm:text-[2rem]" />,
    roles: ["all"],
  },
  // {
  //   key: "chargers",
  //   href: "/chargers",
  //   labelKey: "myChargers",
  //   icon: (
  //     <div className="relative h-[1.35rem] w-[1.35rem] max-sm:h-[2rem] max-sm:w-[2rem]">
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-fontSizeLarge css-p79yt4"
  //         data-testid="EvStationIcon"
  //         viewBox="0 0 24 24"
  //       >
  //         <path
  //           fill="#fff"
  //           d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33a2.5 2.5 0 002.5 2.5c.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 005 0V9c0-.69-.28-1.32-.73-1.77M18 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1M8 18v-4.5H6L10 6v5h2z"
  //         ></path>
  //       </svg>
  //     </div>
  //   ),
  //   roles: ["all"],
  // },
  // {
  //   key: "metrics",
  //   href: "/metrics",
  //   labelKey: "metrics",
  //   icon: <HiMiniChartBarSquare className="text-[1.3rem] max-sm:text-[2rem]" />,
  //   roles: ["all"],
  // },
  {
    key: "users",
    href: "/users",
    labelKey: "users",
    icon: <FaUsers className="text-[1.3rem] max-sm:text-[2rem]" />,
    roles: ["all"],
  },
  {
    key: "versions",
    href: "/versions",
    labelKey: "versions",
    icon: (
      <RiGitRepositoryCommitsFill className="text-[1.3rem] max-sm:text-[2rem]" />
    ),
    roles: ["all"],
  },
  {
    key: "backups",
    href: "/backups",
    labelKey: "backups",
    icon: (
      <MdOutlineSettingsBackupRestore className="text-[1.4rem] max-sm:text-[2rem]" />
    ),
    roles: ["all"],
  },
  {
    key: "sessions",
    href: "/charge-sessions",
    labelKey: "sessions",
    icon: <MdElectricCar className="text-[1.3rem] max-sm:text-[2rem]" />,
    roles: ["owner", "admin"],
  },
  {
    key: "logs",
    href: "/logs",
    labelKey: "logs",
    icon: <RiHistoryFill className="text-[1.3rem] max-sm:text-[2rem]" />,
    roles: ["owner", "maintainer"],
  },
];
