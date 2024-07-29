import { cn } from "@/lib/utils";

interface HeaderButtonProps extends React.ComponentProps<"div"> {
  icon: any;
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function HeaderButton({
  disabled,
  icon,
  label,
  loading = false,
  ...props
}: HeaderButtonProps) {
  return (
    <div
      {...props}
      className={cn(
        "font-bold flex justify-center items-center hover:bg-[#d8e0d7] h-10 px-[1.2rem] text-[0.7rem] cursor-pointer text-slate-50 bg-[#0b2019] hover:bg-[#ffffff1c] transition-all bg-opacity-10 border-solid border border-white border-opacity-10 rounded-[2rem] backdrop-blur-sm",
        disabled ? "opacity-45" : ""
      )}
    >
      {!loading && icon}
      {label && !loading && <p className="ml-[0.5rem]">{label}</p>}
      {loading && <div className="loader"></div>}
    </div>
  );
}
