import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function firstSliderValue(value: number | readonly number[]) {
  return Array.isArray(value) ? Number(value[0]) : Number(value)
}
