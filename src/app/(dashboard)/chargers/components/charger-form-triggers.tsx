"use client";

import React from "react";
import ModalTrigger from "@/components/ui/modal-trigguer";
import { ChargerType, User } from "@/lib/types";
import AddChargerForm from "./add-charger-form";
import EditChargerForm from "./edit-charger-form";
import DeleteAlertModal from "@/components/delete-alert-modal";
import CloneChargerForm from "./clone-charger-form";

interface UsersFormTriggersProps {
  selectedCharger: ChargerType | null;
  setSelectedCharger: React.Dispatch<React.SetStateAction<ChargerType | null>>;
  addRef: React.RefObject<HTMLButtonElement>;
  editRef: React.RefObject<HTMLButtonElement>;
  delRef: React.RefObject<HTMLButtonElement>;
  cloneRef: React.RefObject<HTMLButtonElement>;
}

const ChargersFormTriggers: React.FC<UsersFormTriggersProps> = ({
  selectedCharger,
  setSelectedCharger,
  addRef,
  editRef,
  delRef,
  cloneRef,
}) => {
  const renderHiddenTrigger = () => (
    <div className="absolute hidden">IGNORE THIS!!</div>
  );

  return (
    <>
      <ModalTrigger ref={addRef} modal={<AddChargerForm key={"ASDFASDF"} />}>
        {renderHiddenTrigger()}
      </ModalTrigger>

      {selectedCharger && (
        <>
          <ModalTrigger
            ref={editRef}
            modal={
              <EditChargerForm
                key={`${selectedCharger.chargerId} - ${selectedCharger.connectorId}`}
                selectedCharger={selectedCharger}
                setSelectedCharger={setSelectedCharger}
              />
            }
          >
            {renderHiddenTrigger()}
          </ModalTrigger>

          <ModalTrigger
            ref={delRef}
            modal={
              <DeleteAlertModal
                key={selectedCharger.chargerId}
                charger={selectedCharger}
              />
            }
          >
            {renderHiddenTrigger()}
          </ModalTrigger>

          <ModalTrigger
            ref={cloneRef}
            modal={
              <CloneChargerForm
                key={selectedCharger.chargerId}
                selectedCharger={selectedCharger}
                setSelectedCharger={setSelectedCharger}
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

export default ChargersFormTriggers;
