import { useEffect, useState, type ReactNode } from "react";
import { ResourceUsageContext } from "../../hooks/useResourceUsage";
import type { ResourceUsage } from "../../types/resource";

export function ResourceUsageProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<ResourceUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/api/resources");
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }
        const data = (await response.json()) as ResourceUsage;
        setResources(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setResources(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchResources();
  }, []);

  return (
    <ResourceUsageContext.Provider value={{ resources, loading, error }}>
      {children}
    </ResourceUsageContext.Provider>
  );
}
