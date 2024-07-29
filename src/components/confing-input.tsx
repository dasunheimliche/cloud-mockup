import { ComponentProps } from "react";
import { Input } from "./ui/input";

interface ConfigInputProps extends ComponentProps<typeof Input> {
  icon?: any;
}

export default function ConfigInput({ icon, ...props }: ConfigInputProps) {
  return (
    <div className="relative flex w-full items-center">
      <div className="absolute right-3 font-normal text-gray-400">{icon}</div>
      <Input
        {...props}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}
