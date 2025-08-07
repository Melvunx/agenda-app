import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateString = z.string().min(1, {
  message: "This field is required",
});

export const validateArrayString = z.array(validateString).min(1, {
  message: "At least one item is required",
});

export type DataResponse = {
  success: boolean;
  error: string | null;
  message: string;
};
