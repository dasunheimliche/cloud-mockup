import { usePathname } from "next/navigation";
import { normalizePathname } from "@/lib/utils";

export default function useNormalizedPath() {
  const path = usePathname();

  const normalizedPath = normalizePathname(path);

  return normalizedPath;
}
