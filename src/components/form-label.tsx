import { IoInformationCircle } from "react-icons/io5";
import { Label } from "./ui/label";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function FormLabel({
  label,
  tooltip,
  className,
}: {
  label: string;
  tooltip?: string | undefined;
  className?: string;
}) {
  return (
    <Label className={cn("text-xs flex gap-2 items-center", className)}>
      {label}{" "}
      {tooltip && (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger disabled>
              <IoInformationCircle size={"0.8rem"} />
            </TooltipTrigger>
            <TooltipContent className="w-64">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </Label>
  );
}
