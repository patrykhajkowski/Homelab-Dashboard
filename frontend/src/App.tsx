import { useEffect, useState } from "react";
import "./App.css";

type HealthResponse = {
  status: string;
  database?: boolean;
};

function App() {
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
    <main className="app">
      <header>
        <h1>Homelab Dashboard</h1>
        <p>Full-stack foundation: React, Python, PostgreSQL</p>
      </header>

      <section className="status-card">
        <h2>API Status</h2>
        {loading && <p>Checking backend...</p>}
        {!loading && error && (
          <p className="status-error">
            Backend unreachable: {error}. Start the API and database (see README).
          </p>
        )}
        {!loading && health && (
          <ul>
            <li>
              API: <span className="status-ok">{health.status}</span>
            </li>
            <li>
              Database:{" "}
              <span className={health.database ? "status-ok" : "status-warn"}>
                {health.database ? "connected" : "disconnected"}
              </span>
            </li>
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
