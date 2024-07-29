"use client";

import Loading from "@/components/loading";
import useAuth from "@/hooks/useAuth";
import { Role } from "@/lib/types";
import sessionStore from "@/stores/session-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ALLOWED_ROLES: Record<string, Role[]> = {
  interactions: ["owner", "maintainer"],
  chargers: ["owner", "admin", "maintainer", "user"],
  metrics: ["owner", "admin", "maintainer", "user"],
  users: ["owner", "admin"],
  "charge-sessions": ["owner", "admin"],
  logs: ["owner", "maintainer"],
  support: ["owner", "admin", "maintainer", "user"],
  configuration: ["owner", "maintainer"],
  profile: ["owner", "admin", "maintainer", "user"],
} as const;

type AllowedPaths = keyof typeof ALLOWED_ROLES;

export default function DashAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConfigured } = sessionStore();
  const token = true;
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);
  // const { user, loading } = useAuth();
  const path = usePathname();
  const pathNormalized = path.replace(/^\/|\/$/g, "") as AllowedPaths;

  // const userRole: Role = user?.role;

  // const isPageAllowed =
  //   ALLOWED_ROLES[pathNormalized]?.includes(userRole) || false;

  useEffect(() => {
    if (token !== undefined && isConfigured !== undefined) {
      setInitialLoad(false);
    }
  }, [token, isConfigured]);

  useEffect(() => {
    if (!initialLoad) {
      if (!token) {
        router.push("/login");
      }
    }
  }, [token, initialLoad, isConfigured, router]);

  if (initialLoad) {
    return <Loading />;
  }

  // if (!isPageAllowed)
  //   return (
  //     <div className="w-full h-[100dvh] flex justify-center items-center bg-[#01110b] text-green-50 text-[1.25rem]">
  //       <div className="w-[15rem] text-center uppercase">
  //         You are not authorized to view this section
  //       </div>
  //     </div>
  //   );

  return token ? <>{children}</> : null;
}

// "use client";

// import Loading from "@/components/loading";
// import useAuth from "@/hooks/useAuth";
// import sessionStore from "@/stores/session-store";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export const ALLOWED_ROLES = {
//   interactions: ["owner", "maintainer"],
//   chargers: ["all"],
//   metrics: ["all"],
//   users: ["owner", "admin"],
//   ["charging-sessions"]: ["owner", "admin"],
//   logs: ["owner", "maintainer"],
//   support: ["all"],
//   configurations: ["owner", "maintainer"],
// };

// export default function DashAuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { token, isConfigured } = sessionStore();
//   const router = useRouter();
//   const [initialLoad, setInitialLoad] = useState(true);
//   const { user, loading } = useAuth();
//   const path = usePathname();
//   const pathNormalized = path.replace(/^\/|\/$/g, "");

//   const userRole = user?.role || "guest";

//   const isPageAllowed =
//     ALLOWED_ROLES[pathNormalized as keyof typeof ALLOWED_ROLES].includes(
//       "all"
//     ) ||
//     ALLOWED_ROLES[pathNormalized as keyof typeof ALLOWED_ROLES].includes(
//       userRole
//     );

//   console.log("IS PAGE ALLOWED: ", isPageAllowed);

//   useEffect(() => {
//     if (token !== undefined && isConfigured !== undefined) {
//       setInitialLoad(false);
//     }
//   }, [token, isConfigured]);

//   useEffect(() => {
//     if (!initialLoad) {
//       if (token && !isConfigured) {
//         router.push("/start-config");
//         return;
//       }

//       if (!token) {
//         router.push("/login");
//       }
//     }

//     if (user && !isPageAllowed) {
//       console.log("REDIRECTING - NOT ALLOWED");
//       router.push("/error-unauthorized"); // Redirige a la página de error
//       return;
//     }
//   }, [token, initialLoad, isConfigured]);

//   if (loading) {
//     return <Loading />;
//   }

//   return <>{children}</>;
// }
