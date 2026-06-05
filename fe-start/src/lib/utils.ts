import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJoinedDate(createdAt: string | Date | number): string {
  const date = new Date(createdAt);
  if (isNaN(date.getTime())) {
    return "Joined recently";
  }
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date,
  );
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
}
