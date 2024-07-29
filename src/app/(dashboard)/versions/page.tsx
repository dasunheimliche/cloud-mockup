"use client";

import DashboardPageLayout from "@/components/dashboard-page-layout";
import HeaderActions from "@/components/header-actions";
import HeaderButton from "@/components/header-button";
import Table from "@/components/table";
import ModalTrigger from "@/components/ui/modal-trigguer";
import { useRef } from "react";
import { GoPlus } from "react-icons/go";
import { MdDelete, MdEditDocument } from "react-icons/md";
import AddVersionForm from "./components/add-version-form";
import EditVersionForm from "./components/edit-version-form";
import { handleActionClick } from "@/lib/utils";
import ConfigSection from "../configuration/components/config-section";
import ConfigTitle from "../configuration/components/config-title";
import { Button } from "@/components/ui/button";
import useVersion from "@/hooks/useVersions";
import DeleteVersionAlert from "./components/delete-version-alert";
import { Separator } from "@/components/ui/separator";

import { HARDCODED_ALGORITHM, HARCODED_SOLUTIONS } from "@/HARDCODED/versions";

export default function VersionsPage() {
  const {
    // algorithmVersions,
    // solutionVersions,
    downloadLatestVersion,
    addVersion,
    editVersion,
    removeVersion,
    setSelectedVersion,
    selectedVersion,
    loading,
  } = useVersion();

  const columnsRef = [
    {
      label: "ID",
      hiddenOnMobile: false,
      isLast: false,
    },
    {
      label: "VERSION",
      hiddenOnMobile: false,
      isLast: false,
    },
    {
      label: "SIZE",
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

  const addRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);

  return (
    <DashboardPageLayout
      title="VERSIONS"
      blocked={false}
      headerActions={
        <HeaderActions
          desktopActions={
            <>
              <HeaderButton
                disabled={!selectedVersion}
                icon={<MdDelete className="text-slate-50 text-[1.2rem]" />}
                label={"REMOVE"}
                onClick={undefined}
              />
              <HeaderButton
                disabled={!selectedVersion}
                icon={
                  <MdEditDocument className="text-slate-50 text-[1.2rem]" />
                }
                label={"EDIT"}
                onClick={() => handleActionClick(editRef)}
              />
              <HeaderButton
                disabled={false}
                icon={<GoPlus className="text-slate-50 text-[1.2rem]" />}
                label={"ADD"}
                onClick={() => handleActionClick(addRef)}
              />
            </>
          }
        />
      }
    >
      <div className="w-full p-10 relative flex flex-col gap-10">
        <ConfigSection>
          <div className="flex gap-10 w-full relative max-xl:w-full max-lg:flex-col">
            <div className="w-1/2 relative max-lg:w-full flex flex-col gap-[1.875rem]">
              <div className="text-[1.6062rem] font-semibold leading-[1.925rem] relative w-max !text-gradient">
                Solution
              </div>
              <p className="text-[1.0125rem] leading-[1.5188rem] max-w-[75%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur..
              </p>

              <Button
                onClick={() => downloadLatestVersion("solution")}
                className="rounded-full font-medium max-w-max text-[0.8rem] bg-[#073940] text-white shadow-none px-5 py-5   hover:bg-gray-900 hover:text-zinc-50"
                style={{
                  background:
                    "linear-gradient(180deg, #001717 0%, #000000 100%)",
                }}
              >
                DOWNLOAD LATEST VERSION
              </Button>
            </div>
            <div className="min-h-[35vh] relative w-1/2 max-xl:w-full">
              <Table
                columnsRef={columnsRef}
                data={HARCODED_SOLUTIONS}
                selected={selectedVersion}
                onSelectRow={setSelectedVersion}
                onDoubleClickRow={() => handleActionClick(editRef)}
              />
            </div>
          </div>
        </ConfigSection>

        <Separator />

        <ConfigSection>
          <div className="flex gap-10 w-full relative max-xl:w-full max-lg:flex-col">
            <div className="w-1/2 relative max-lg:w-full flex flex-col gap-[1.875rem]">
              <div className="text-[1.6062rem] font-semibold leading-[1.925rem] relative w-max !text-gradient">
                Algorithm
              </div>
              <p className="text-[1.0125rem] leading-[1.5188rem] max-w-[75%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>

              <Button
                onClick={() => downloadLatestVersion("algorithm")}
                className="rounded-full font-medium max-w-max text-[0.8rem] bg-[#073940] text-white shadow-none px-5 py-5   hover:bg-gray-900 hover:text-zinc-50"
                style={{
                  background:
                    "linear-gradient(180deg, #001717 0%, #000000 100%)",
                }}
              >
                DOWNLOAD LATEST VERSION
              </Button>
            </div>
            <div className="min-h-[35vh] relative w-1/2 max-xl:w-full">
              <Table
                columnsRef={columnsRef}
                data={HARDCODED_ALGORITHM}
                selected={selectedVersion}
                onSelectRow={setSelectedVersion}
                onDoubleClickRow={() => handleActionClick(editRef)}
              />
            </div>
          </div>
        </ConfigSection>
      </div>
      <ModalTrigger
        key={"add"}
        ref={addRef}
        modal={
          <AddVersionForm
            onSubmit={addVersion}
            onCancel={() => setSelectedVersion(undefined)}
            loading={loading}
          />
        }
      >
        <div className="absolute hidden">IGNORE THIS!!</div>
      </ModalTrigger>
      {selectedVersion && (
        <>
          <ModalTrigger
            key={"edit"}
            ref={editRef}
            modal={
              <EditVersionForm
                onSubmit={editVersion}
                selectedVersion={selectedVersion}
                onCancel={() => setSelectedVersion(undefined)}
                loading={loading}
              />
            }
          >
            <div className="absolute hidden">IGNORE THIS!!</div>
          </ModalTrigger>

          <ModalTrigger
            key={selectedVersion.id}
            ref={deleteRef}
            modal={
              <DeleteVersionAlert
                selectedVersion={selectedVersion}
                loading={loading}
                onConfirm={removeVersion}
              />
            }
          >
            <div className="absolute hidden">IGNORE THIS!!</div>
          </ModalTrigger>
        </>
      )}
    </DashboardPageLayout>
  );
}
