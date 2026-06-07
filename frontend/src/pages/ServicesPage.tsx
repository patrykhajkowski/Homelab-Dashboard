import { useEffect, useState } from "react";
import { apiFetch } from "../api/fetch";
import { ServiceCard } from "../components/services/ServiceCard";
import type { Service } from "../types/service";
import "./ServicesPage.css";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiFetch("/api/services");
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }
        const data = (await response.json()) as Service[];
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchServices();
  }, []);

  return (
    <div className="services-page">
      <header className="services-page__header">
        <h1 className="services-page__title">Services</h1>
        <p className="services-page__subtitle">
          All homelab services and their current status
        </p>
      </header>

      {loading && <p className="services-page__message">Loading services...</p>}
      {!loading && error && (
        <p className="services-page__error">
          Could not load services: {error}. Start the API and database (see README).
        </p>
      )}
      {!loading && !error && services.length === 0 && (
        <p className="services-page__message">No services configured yet.</p>
      )}
      {!loading && !error && services.length > 0 && (
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
