import { cn } from "@/lib/utils";

export default function PaginationButton({
  page,
  onClick,
  isActive,
}: {
  page: number;
  onClick: () => void;
  isActive: boolean;
}) {
  const className = cn(
    "hover:underline hover:underline-offset-2",
    isActive
      ? "bg-primary rounded-full w-9 h-9 p-1 text-white flex justify-center items-center"
      : ""
  );

  return (
    <button key={page} onClick={onClick} className={className}>
      {page}
    </button>
  );
}
