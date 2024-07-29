"use client";

import { FaUserShield } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import authAxios from "@/lib/api";
import Link from "next/link";
import sessionStore from "@/stores/session-store";
import { cn } from "@/lib/utils";
import useStore from "@/stores/main-store";
import useLangStore from "@/stores/lang-store";
import t from "@/translations/dashboard/layout";
import { useEffect, useState } from "react";
import { Role } from "@/lib/types";

export default function SidebarProfile() {
  const { setToken, setUser, token, user } = sessionStore();
  const router = useRouter();
  const role: Role | undefined = user?.role;

  const { toggleMobileSidebar } = useStore();

  const { language } = useLangStore();

  const path = usePathname().replace("/", "");

  const isCurrent = path.replace("/", "") === "profile".replace("/", "");

  async function handleLogout(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    try {
      // const res = await authAxios.post(
      //   "auth/logout",
      //   {},
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      // );

      // if (res.data.status === "LoggedOut") {
      //   console.log("LOGGING OFF");
      //   setUser(null);
      //   setToken(null);

      //   router.push("/login");
      // }
      setToken(null);
      router.push("/login");
    } catch (error) {
      console.log("LOGOUNT ERROR: ", error);
    }
  }

  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div></div>;

  return (
    <Link
      onClick={toggleMobileSidebar}
      href={"/profile"}
      className={cn(
        "w-full flex justify-between px-8 h-14 items-center hover:bg-[#0b2019] relative",
        isCurrent ? "bg-[#0b2019]" : ""
      )}
    >
      <div
        className={cn(
          "absolute h-full w-1 inset-0 ",
          isCurrent ? "bg-[#97F675]" : ""
        )}
      ></div>
      <div className="flex ">
        <div id="profile_image" className="flex items-center">
          <FaUserShield className="text-[1.35rem] max-sm:text-[2rem]" />
        </div>
        <div
          id="user_data"
          className="text-start ml-4 opacity-90 group/config cursor-pointer "
        >
          <div
            id="name"
            className="font-bold text-[0.8rem] group-hover/config:underline underline-offset-1 uppercase max-sm:text-xl max-sm:font-medium"
          >
            {"Mockup User"}
          </div>
          <div
            id="rol"
            className="group-hover/config:underline underline-offset-1 uppercase"
          >
            {"User"}
          </div>
        </div>
      </div>
      <div
        id="logout"
        onClick={(e) => handleLogout(e)}
        className="hover:opacity-100 opacity-25 transition-all flex items-center"
      >
        <TbLogout className="text-[1.35rem] max-sm:text-[2rem] cursor-pointer" />
      </div>
    </Link>
  );
}
