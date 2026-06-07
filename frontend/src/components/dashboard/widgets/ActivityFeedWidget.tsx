import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/fetch";
import { DashboardWidget } from "../DashboardWidget";
import type { Event } from "../../../types/event";
import "./widgets.css";

function formatEventTimestamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ActivityFeedWidget() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiFetch("/api/events");
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }
        const data = (await response.json()) as Event[];
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchEvents();
  }, []);

  return (
    <DashboardWidget title="Recent Events" span="full">
      {loading && <p className="widget-placeholder">Loading events...</p>}
      {!loading && error && (
        <p className="widget-error">Could not load events: {error}</p>
      )}
      {!loading && !error && events.length === 0 && (
        <p className="widget-placeholder">No recent events.</p>
      )}
      {!loading && !error && events.length > 0 && (
        <ul className="activity-feed">
          {events.map((event) => (
            <li
              key={event.id}
              className={`activity-feed__item activity-feed__item--${event.severity}`}
            >
              <span
                className={`activity-feed__indicator activity-feed__indicator--${event.severity}`}
                aria-hidden="true"
              />
              <div className="activity-feed__content">
                <p className="activity-feed__message">{event.message}</p>
                <time
                  className="activity-feed__timestamp"
                  dateTime={event.occurred_at}
                >
                  {formatEventTimestamp(event.occurred_at)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardWidget>
  );
}
