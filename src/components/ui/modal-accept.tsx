import { cn } from "@/lib/utils";
import { AlertDialogAction } from "./alert-dialog";
import { forwardRef } from "react";

interface ModalAcceptProps
  extends React.ComponentProps<typeof AlertDialogAction> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
}
const ModalAccept = forwardRef<any, ModalAcceptProps>(function ModalAccept(
  { onClick, label, className, ...props },
  ref
) {
  return (
    <AlertDialogAction
      ref={ref}
      className={cn(
        "font-semibold shadow-none rounded-lg w-24 py-5 bg-slate-950 text-zinc-950 hover:bg-slate-900 hover:text-zinc-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </AlertDialogAction>
  );
});

ModalAccept.displayName = "ModalAccept";

export default ModalAccept;
