import { cn } from "@/lib/utils";
import FormLabel from "./form-label";
import { Input } from "./ui/input";
import { InputHTMLAttributes } from "react";

interface FormFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  tooltip?: string;
}

export default function FormFieldInput({
  label,
  tooltip,
  className,
  ...props
}: FormFieldInputProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full relative", className)}>
      <FormLabel label={label} tooltip={tooltip} />
      <Input className="w-full" {...props} />
    </div>
  );
}
