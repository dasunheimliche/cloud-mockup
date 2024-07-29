import { Switch } from "@mui/material";
import { Label } from "./ui/label";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import FormLabel from "./form-label";

interface FormSwitchInputProps extends ComponentPropsWithoutRef<typeof Switch> {
  label: string;
}

export default function FormSwitchInput({
  label,
  className,
  ...props
}: FormSwitchInputProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full relative", className)}>
      <FormLabel label={label} />
      <Switch {...props} />
    </div>
  );
}
