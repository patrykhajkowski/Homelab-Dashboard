import { useEffect, useState } from "react";
import "./StatusCard.css";

type HealthResponse = {
  status: string;
  database?: boolean;
};

export function StatusCard() {
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
    <section className="status-card" id="overview">
      <h2>API Status</h2>
      {loading && <p>Checking backend...</p>}
      {!loading && error && (
        <p className="status-card__error">
          Backend unreachable: {error}. Start the API and database (see README).
        </p>
      )}
      {!loading && health && (
        <ul className="status-card__list">
          <li>
            API: <span className="status-card__ok">{health.status}</span>
          </li>
          <li>
            Database:{" "}
            <span className={health.database ? "status-card__ok" : "status-card__warn"}>
              {health.database ? "connected" : "disconnected"}
            </span>
          </li>
        </ul>
      )}
    </section>
  );
}
