import type { FilterOption } from "@/components/inline-filter";
import type { ApiEntry } from "./types";

export interface FilterState {
  auth: "any" | "free" | "apiKey" | "OAuth";
  https: "any" | "yes";
  cors: "any" | "yes" | "no" | "unknown";
}

export const DEFAULT_FILTERS: FilterState = {
  auth: "any",
  https: "any",
  cors: "any",
};

export const AUTH_OPTIONS: FilterOption[] = [
  { value: "any", label: "Any" },
  { value: "free", label: "Free" },
  { value: "apiKey", label: "API Key" },
  { value: "OAuth", label: "OAuth" },
];

export const HTTPS_OPTIONS: FilterOption[] = [
  { value: "any", label: "Any" },
  { value: "yes", label: "HTTPS Only" },
];

export const CORS_OPTIONS: FilterOption[] = [
  { value: "any", label: "Any" },
  { value: "yes", label: "Enabled" },
  { value: "no", label: "Disabled" },
  { value: "unknown", label: "Unknown" },
];

export function applyFilters(apis: ApiEntry[], filters: FilterState): ApiEntry[] {
  let result = apis;

  if (filters.auth !== "any") {
    result = result.filter((api) => {
      if (filters.auth === "free") return api.Auth === "";
      return api.Auth === filters.auth;
    });
  }

  if (filters.https === "yes") {
    result = result.filter((api) => api.HTTPS);
  }

  if (filters.cors !== "any") {
    result = result.filter((api) => api.Cors === filters.cors);
  }

  return result;
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.auth !== "any") count++;
  if (filters.https !== "any") count++;
  if (filters.cors !== "any") count++;
  return count;
}
