import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import PingLost from "@/components/ping-lost";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  tooltip?: React.ReactNode;
  headerActions?: React.ReactNode;
  blocked: boolean;
}

const DashboardPageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  tooltip,
  headerActions,
  blocked,
}) => {
  return (
    <div className="flex flex-col w-full max-h-[100vh] h-full justify-start items-center px-0 bg-bluewhite">
      <PageHeader>
        <div className="flex flex-row items-center justify-center gap-2 max-sm:w-min">
          <h2 className="text-[1.7rem] font-medium mr-0 max-sm:text-[1.5rem] max-sm:w-max uppercase">
            {title}
          </h2>
          {tooltip}
        </div>

        {headerActions}
      </PageHeader>

      <ScrollArea
        style={{ minHeight: "calc(100vh - 6rem)" }}
        className={cn("relative w-full rounded-none")}
      >
        {blocked && <PingLost />}

        {!blocked && children}
      </ScrollArea>

      <Toaster />
    </div>
  );
};

export default DashboardPageLayout;
