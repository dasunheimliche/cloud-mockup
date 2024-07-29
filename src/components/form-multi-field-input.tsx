import { cn } from "@/lib/utils";
import FormLabel from "./form-label";
import { Input } from "./ui/input";

export default function FormMultiFieldInput({
  label,
  className,
  values,
  onChange,
  field,
}: any) {
  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      const updatedValues = [...values];
      updatedValues[index] = +newValue;

      onChange((prev: any) => ({ ...prev, [field]: updatedValues }));
    };

  return (
    <div className={cn("flex flex-col gap-2 w-full relative", className)}>
      <FormLabel label={label} />
      <div className="flex gap-1">
        <Input
          type="number"
          value={values && values[0]}
          onChange={handleChange(0)}
        />
        <Input
          type="number"
          value={values && values[1]}
          onChange={handleChange(1)}
        />
        <Input
          type="number"
          value={values && values[2]}
          onChange={handleChange(2)}
        />
      </div>
    </div>
  );
}
