import { cn } from "@/lib/utils";
import StartAuthProvider from "./start-auth-provider";

export default function StartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StartAuthProvider>
      <div
        className={cn(
          "w-full h-[100vh] flex flex-col items-center justify-center",
          "bg-bluewhite max-md:pt-[5.125rem]"
        )}
      >
        {children}
      </div>
    </StartAuthProvider>
  );
}
