import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePathname(path: string): string {
  return path.replace(/^\/|\/$/g, "");
}

export const handleActionClick = (ref: React.RefObject<HTMLButtonElement>) => {
  console.log("CLICK ON REF");
  if (ref && ref.current) {
    ref.current.click();
  }
};

interface ListItem {
  id: string;
  [key: string]: any;
}

export function convertObjectListToList<T>(object: {
  [key: string]: T;
}): ListItem[] {
  return Object.entries(object).map(
    ([id, value]): ListItem => ({
      id,
      ...value,
    })
  );
}
