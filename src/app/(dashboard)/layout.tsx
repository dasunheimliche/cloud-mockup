import Sidebar from "@/components/sidebar";
import DashAuthProvider from "./dash-auth-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashAuthProvider>
        <div className="dashboard flex h-[100vh] box-border bg-[#ffffff] relative">
          <Sidebar />
          <div className="flex flex-col flex-1 h-[100vh]">
            <div className="flex-1 p-0 flex flex-col flex-nowrap items-center justify-start min-h-[100%] box-border relative">
              {children}
            </div>
          </div>
        </div>
      </DashAuthProvider>
    </>
  );
}
