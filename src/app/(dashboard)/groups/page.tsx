"use client";

import DashboardPageLayout from "@/components/dashboard-page-layout";
import HeaderActions from "@/components/header-actions";
import HeaderButton from "@/components/header-button";
import Table from "@/components/table";
import ModalTrigger from "@/components/ui/modal-trigguer";
import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdDelete, MdEditDocument } from "react-icons/md";
import AddGroupForm from "./components/add-group-form";
import { handleActionClick } from "@/lib/utils";
import EditGroupForm from "./components/edit-group-form";
import useGroups from "@/hooks/useGroups";
import DeleteGroupAlert from "./components/delete-group-alert";
import { Hidden } from "@mui/material";
import { group } from "console";
import HARDCODED_GROUPS from "@/HARDCODED/groups";

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
    label: "OWNER ID",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "CITY",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "ADDRESS",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "LOCAL CURRENCY",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "ZIP CODE",
    hiddenOnMobile: false,
    isLast: false,
    hidden: false,
  },
  {
    label: "PRICE (KWH)",
    hiddenOnMobile: false,
    isLast: true,
    hidden: false,
  },
];

export default function GroupsPage() {
  const {
    // groups,
    addGroup,
    editGroup,
    removeGroup,
    loading,
    selectedGroup,
    setSelectedGroup,
  } = useGroups();

  const addRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);

  return (
    <DashboardPageLayout
      title="GROUPS"
      blocked={!HARDCODED_GROUPS}
      headerActions={
        <HeaderActions
          desktopActions={
            <>
              <HeaderButton
                disabled={!selectedGroup}
                icon={<MdDelete className="text-slate-50 text-[1.2rem]" />}
                label={"REMOVE"}
                onClick={() => handleActionClick(deleteRef)}
              />
              <HeaderButton
                disabled={!selectedGroup}
                icon={
                  <MdEditDocument className="text-slate-50 text-[1.2rem]" />
                }
                label={"EDIT"}
                onClick={() => handleActionClick(editRef)}
              />
              <HeaderButton
                disabled={false}
                icon={<GoPlus className="text-slate-50 text-[1.2rem]" />}
                label={"CREATE"}
                onClick={() => handleActionClick(addRef)}
              />
            </>
          }
        />
      }
    >
      <Table
        columnsRef={columnsRef}
        data={HARDCODED_GROUPS}
        selected={selectedGroup}
        onSelectRow={setSelectedGroup}
        onDoubleClickRow={() => handleActionClick(editRef)}
      />
      <ModalTrigger
        key={"add"}
        ref={addRef}
        modal={
          <AddGroupForm
            onSubmit={addGroup}
            loading={loading}
            onCancel={() => setSelectedGroup(undefined)}
          />
        }
      >
        <div className="absolute hidden">IGNORE THIS!!</div>
      </ModalTrigger>
      {selectedGroup && (
        <>
          <ModalTrigger
            key={selectedGroup.id}
            ref={editRef}
            modal={
              <EditGroupForm
                onSubmit={editGroup}
                onCancel={() => setSelectedGroup(undefined)}
                loading={loading}
                selectedGroup={selectedGroup}
              />
            }
          >
            <div className="absolute hidden">IGNORE THIS!!</div>
          </ModalTrigger>

          <ModalTrigger
            key={selectedGroup.id}
            ref={deleteRef}
            modal={
              <DeleteGroupAlert
                selectedGroup={selectedGroup}
                loading={loading}
                onConfirm={removeGroup}
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
