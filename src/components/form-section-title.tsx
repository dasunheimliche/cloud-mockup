import { Label } from "./ui/label";

export default function FormSectionTitle({ title }: { title: string }) {
  return (
    <Label className="font-semibold relative pl-2 text-green-950">
      <div className="h-full w-1 absolute inset-0 bg-[#168b1c]"></div>
      {title}
    </Label>
  );
}
