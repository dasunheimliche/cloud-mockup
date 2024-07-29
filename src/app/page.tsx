"use client";

import Loading from "@/components/loading";
import sessionStore from "@/stores/session-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tuple } from "zod";

export default function Home() {
  // const { token } = sessionStore();
  const token = true;
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [token]);

  return <Loading />;
}

// "use client";

// import Loading from "@/components/loading";
// import sessionStore from "@/stores/session-store";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Home() {
//   const { token, user } = sessionStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (token && user) {
//       router.push(
//         ["owner", "maintainer"].includes(user.role)
//           ? "/interactions"
//           : "/chargers"
//       );
//     } else {
//       router.push("/login");
//     }
//   }, [token, user]);

//   return <Loading />;
// }
