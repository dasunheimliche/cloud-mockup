"use client";

import DashboardPageLayout from "@/components/dashboard-page-layout";
import HeaderActions from "@/components/header-actions";
import HeaderButton from "@/components/header-button";
import Table from "@/components/table";
import ModalTrigger from "@/components/ui/modal-trigguer";
import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import AddInstanceForm from "./components/add-instance-form";
import EditInstanceForm from "./components/edit-instance-form";
import { handleActionClick } from "@/lib/utils";
import useInstance from "@/hooks/useInstance";
import DeleteInstanceAlert from "./components/delete-instance-alert";
import HARDCODED_INSTANCES from "@/HARDCODED/instances";

const columnsRef = [
  {
    label: "ID",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "NAME",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "LOCAL EVA ID",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "GROUP ID",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "ONLY PV",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "SOLAR INSTALLED",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "MAIN DIST.",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "SUB DIST.",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "OP. DIST",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "1º PRIORITY",
    hiddenOnMobile: false,
    isLast: false,
    hidden: true,
  },
  {
    label: "2º PRIORITY",
    hiddenOnMobile: false,
    isLast: false,
    hidden: true,
  },
  {
    label: "3º PRIORITY",
    hiddenOnMobile: false,
    isLast: false,
    hidden: true,
  },
  {
    label: "4º PRIORITY",
    hiddenOnMobile: false,
    isLast: false,
    hidden: true,
  },
  {
    label: "WEBSOCKET CONN.",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "subusers",
    hiddenOnMobile: false,
    isLast: true,
    hidden: false,
  },
];

export default function InstancesPage() {
  const {
    // instances,
    loading,
    selectedInstance,
    setSelectedInstance,
    addInstance,
    editInstance,
    removeInstance,
  } = useInstance();

  const addRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);

  return (
    <DashboardPageLayout
      title="INSTANCES"
      blocked={!HARDCODED_INSTANCES}
      headerActions={
        <HeaderActions
          desktopActions={
            <>
              <HeaderButton
                disabled={!selectedInstance}
                icon={<MdDelete className="text-slate-50 text-[1.2rem]" />}
                label={"REMOVE"}
                onClick={() => handleActionClick(deleteRef)}
              />
              <HeaderButton
                disabled={!selectedInstance}
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
      <Table
        columnsRef={columnsRef}
        data={HARDCODED_INSTANCES}
        selected={selectedInstance}
        onSelectRow={setSelectedInstance}
        onDoubleClickRow={() => handleActionClick(editRef)}
      />
      <ModalTrigger
        ref={addRef}
        modal={<AddInstanceForm onSubmit={addInstance} loading={loading} />}
      >
        <div className="absolute hidden">IGNORE THIS!!</div>
      </ModalTrigger>
      {selectedInstance && (
        <>
          <ModalTrigger
            ref={editRef}
            modal={
              <EditInstanceForm
                onSubmit={editInstance}
                loading={loading}
                selectedInstance={selectedInstance}
                onCancel={() => setSelectedInstance(undefined)}
              />
            }
          >
            <div className="absolute hidden">IGNORE THIS!!</div>
          </ModalTrigger>

          <ModalTrigger
            key={selectedInstance.id}
            ref={deleteRef}
            modal={
              <DeleteInstanceAlert
                selectedInstance={selectedInstance}
                loading={loading}
                onConfirm={removeInstance}
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
