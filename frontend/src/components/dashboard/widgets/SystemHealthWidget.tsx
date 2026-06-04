import { useEffect, useState } from "react";
import { DashboardWidget } from "../DashboardWidget";
import "./widgets.css";

type HealthResponse = {
  status: string;
  database?: boolean;
};

export function SystemHealthWidget() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }
        const data = (await response.json()) as HealthResponse;
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchHealth();
  }, []);

  return (
    <DashboardWidget title="System Health" span="wide">
      {loading && <p className="widget-placeholder">Checking backend...</p>}
      {!loading && error && (
        <p className="widget-error">
          Backend unreachable: {error}. Start the API and database (see README).
        </p>
      )}
      {!loading && health && (
        <ul className="widget-stat-list">
          <li>
            <span className="widget-stat-list__label">API</span>
            <span className="widget-stat-list__value widget-stat-list__value--ok">
              {health.status}
            </span>
          </li>
          <li>
            <span className="widget-stat-list__label">Database</span>
            <span
              className={`widget-stat-list__value ${health.database ? "widget-stat-list__value--ok" : "widget-stat-list__value--warn"}`}
            >
              {health.database ? "connected" : "disconnected"}
            </span>
          </li>
        </ul>
      )}
    </DashboardWidget>
  );
}
