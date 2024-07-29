"use client";

import { ComponentPropsWithoutRef } from "react";
import FormLabel from "./form-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface FormSelectorInput extends ComponentPropsWithoutRef<typeof Select> {
  label?: string;
  placeholder: string;
  selectLabel: string;
  className?: string;
  options: Array<{ value: string; label: string }>;
}

export default function FormSelectorInput({
  label,
  placeholder,
  selectLabel,
  options,
  className,
  ...props
}: FormSelectorInput) {
  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && <FormLabel label={label} />}
      <Select {...props}>
        <SelectTrigger>
          <SelectValue className="w-full" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup className="w-full">
            <SelectLabel>{selectLabel}</SelectLabel>
            {options.map((item: any, i: number) => (
              <SelectItem className="w-full" key={i} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
