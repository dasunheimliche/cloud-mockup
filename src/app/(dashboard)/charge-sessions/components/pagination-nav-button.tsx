import { cn } from "@/lib/utils";

export default function PaginationNavButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  const className = cn(
    "hover:underline hover:underline-offset-2 cursor-pointer",
    disabled ? "hover:no-underline opacity-35" : ""
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={label}
    >
      {label}
    </button>
  );
}
