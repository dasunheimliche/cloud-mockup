import { Label } from "@/components/ui/label";

export default function ConfigTitle({ label }: { label: string }) {
  return (
    <Label className="font-semibold relative pl-3 text-green-950 text-opacity-90 text-[1.2rem]">
      <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
      <p className="opacity-90">{label}</p>
    </Label>
  );
}
