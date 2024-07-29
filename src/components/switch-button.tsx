"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchButton({
  label,
  onClick,
}: {
  label: string;
  onClick: any;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode">{label}</Label>
      <Switch
        defaultChecked={false}
        id="airplane-mode"
        onClick={() => onClick((prev: boolean) => !prev)}
      />
    </div>
  );
}
