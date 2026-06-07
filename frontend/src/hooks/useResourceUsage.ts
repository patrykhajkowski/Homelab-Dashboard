import { createContext, useContext } from "react";
import type { ResourceUsage } from "../types/resource";

export type ResourceUsageState = {
  resources: ResourceUsage | null;
  loading: boolean;
  error: string | null;
};

export const ResourceUsageContext = createContext<ResourceUsageState | null>(null);

export function useResourceUsage() {
  const context = useContext(ResourceUsageContext);
  if (!context) {
    throw new Error("useResourceUsage must be used within ResourceUsageProvider");
  }
  return context;
}
