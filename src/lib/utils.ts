import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformToTitleCase(input: string): string {
  return input
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with a space
}

export function formatDateToDDMMYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}${month}${year}`;
}

export function mapCompanyName(company: string): string {
  const companyMap: Record<string, string> = {
    "A Coy": "Alpha",
    "B Coy": "Bravo",
    "C Coy": "Charlie",
    "SP Coy": "Support",
    "MSC Coy": "MSC",
    "HQ Coy": "HQ",
  };

  return companyMap[company] || company; // Default to the original company if not found
}
