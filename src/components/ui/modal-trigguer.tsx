"use client";
import React, { forwardRef, ReactNode } from "react";
import { AlertDialog, AlertDialogTrigger } from "./alert-dialog";

interface ModalTriggerProps {
  children: ReactNode;
  modal: ReactNode;
  onClick?: () => void;
}

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, modal, onClick }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref} onClick={onClick}>
          {children}
        </AlertDialogTrigger>
        {modal}
      </AlertDialog>
    );
  }
);

ModalTrigger.displayName = "ModalTrigger";

export default ModalTrigger;
