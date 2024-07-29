"use client";

import DashboardPageLayout from "@/components/dashboard-page-layout";
import HeaderActions from "@/components/header-actions";
import HeaderButton from "@/components/header-button";
import Table from "@/components/table";
import ConfigSection from "../configuration/components/config-section";
import { Button } from "@/components/ui/button";
import { TbReload } from "react-icons/tb";
import useBackups from "@/hooks/useBackups";
import FormSelectorInput from "@/components/form-selector-input";
import HARDCODED_BACKUPS from "@/HARDCODED/backups";

export default function BackupsPage() {
  const {
    // backups,
    instances,
    selectedInstance,
    loading,
    downloadLatestBackup,
    updateBackupsList,
    handleInstanceSelector,
  } = useBackups();

  const columnsRef = [
    {
      label: "ID",
      hiddenOnMobile: false,
      isLast: false,
    },
    {
      label: "INSTANCE",
      hiddenOnMobile: false,
      isLast: false,
    },
    {
      label: "DATETIME",
      hiddenOnMobile: false,
      isLast: false,
    },
    {
      label: "DOWNLOAD",
      hiddenOnMobile: false,
      isLast: true,
      type: "button",
    },
  ];

  return (
    <DashboardPageLayout
      title="BACKUPS"
      blocked={loading}
      headerActions={
        <HeaderActions
          desktopActions={
            <>
              <HeaderButton
                disabled={false}
                loading={loading}
                icon={<TbReload className="text-slate-50 text-[1.2rem]" />}
                label={""}
                onClick={updateBackupsList}
              />
            </>
          }
        />
      }
    >
      <div className="w-full p-10 relative">
        <ConfigSection>
          <div className="flex gap-10 w-full relative max-xl:w-full max-lg:flex-col">
            <div className="w-1/2 relative max-lg:w-full flex flex-col gap-[1.875rem]">
              <div className="text-[1.6062rem] font-semibold leading-[1.925rem] relative w-max !text-gradient">
                Your Backups
              </div>
              <p className="text-[1.0125rem] leading-[1.5188rem] max-w-[75%]">
                View a list of your recent backups for easy access and
                management. This section provides detailed information about
                each backup, allowing you to monitor your data protection
                activities and ensure everything is up to date.
              </p>

              <Button
                onClick={() => downloadLatestBackup(selectedInstance)}
                className="rounded-full font-medium max-w-max text-[0.8rem] bg-[#073940] text-white shadow-none px-5 py-5   hover:bg-gray-900 hover:text-zinc-50"
                style={{
                  background:
                    "linear-gradient(180deg, #002929 0%, #073940 100%)",
                }}
              >
                DOWNLOAD LATEST BACKUP
              </Button>
            </div>
            <div className="min-h-[35vh] relative w-1/2 max-xl:w-full">
              {instances && (
                <div>
                  <FormSelectorInput
                    selectLabel=""
                    onValueChange={handleInstanceSelector}
                    defaultValue={selectedInstance}
                    placeholder="Instances"
                    options={[{ label: "All", value: "all" }, ...instances]}
                  />
                </div>
              )}
              <Table columnsRef={columnsRef} data={HARDCODED_BACKUPS} />
            </div>
          </div>
        </ConfigSection>
        {/* <ConfigSection>
          <div className="flex gap-10 w-3/4 relative max-xl:w-full max-lg:flex-col">
            <div className="w-1/2 max-lg:w-full">
              <p className="text-[1.05rem]">
                Create your own Lock screen, adjusting the clock size, color and
                location. Or browse our many Flex Window and Watch Face options
                to find one with the graphics and features that match your
                style.
              </p>

              <Button
                onClick={() => downloadLatestBackup("solution")}
                className="font-medium text-[0.8rem] mt-8 text-white shadow-none rounded-full px-5 py-5 bg-black  hover:bg-gray-900 hover:text-zinc-50"
              >
                DOWNLOAD LATEST BACKUP
              </Button>
            </div>
            <div className="min-h-[35vh] relative w-1/2 max-xl:w-full">
              {instances && (
                <div>
                  <FormSelectorInput
                    selectLabel=""
                    onValueChange={handleInstanceSelector}
                    defaultValue={selectedInstance}
                    placeholder="Instances"
                    options={[{ label: "All", value: "all" }, ...instances]}
                  />
                </div>
              )}
              <Table columnsRef={columnsRef} data={backups} />
            </div>
          </div>
        </ConfigSection> */}
      </div>
    </DashboardPageLayout>
  );
}
