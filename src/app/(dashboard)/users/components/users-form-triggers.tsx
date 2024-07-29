"use client";

import React from "react";
import ModalTrigger from "@/components/ui/modal-trigguer";
import AddUserForm from "./add-user-form";
import EditUserForm from "./edit-user-form";
import DeleteUserAlert from "./delete-user-form";
import { User } from "@/lib/types";

interface UsersFormTriggersProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  addRef: React.RefObject<HTMLButtonElement>;
  editRef: React.RefObject<HTMLButtonElement>;
  delRef: React.RefObject<HTMLButtonElement>;
  users: User[];
  update: () => void;
}

const UsersFormTriggers: React.FC<UsersFormTriggersProps> = ({
  selectedUser,
  setSelectedUser,
  addRef,
  editRef,
  delRef,
  users,
  update,
}) => {
  const renderHiddenTrigger = () => (
    <div className="absolute hidden">IGNORE THIS!!</div>
  );

  return (
    <>
      <ModalTrigger
        ref={addRef}
        modal={<AddUserForm users={users} update={update} />}
      >
        {renderHiddenTrigger()}
      </ModalTrigger>

      {selectedUser && (
        <>
          <ModalTrigger
            ref={editRef}
            modal={
              <EditUserForm
                key={selectedUser.id}
                update={update}
                users={users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            }
          >
            {renderHiddenTrigger()}
          </ModalTrigger>

          <ModalTrigger
            ref={delRef}
            modal={
              <DeleteUserAlert
                key={selectedUser.id}
                update={update}
                selectedUser={selectedUser}
              />
            }
          >
            {renderHiddenTrigger()}
          </ModalTrigger>
        </>
      )}
    </>
  );
};

export default UsersFormTriggers;
