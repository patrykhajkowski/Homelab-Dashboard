import { SystemHealthWidget } from "../components/dashboard/widgets/SystemHealthWidget";
import { PlaceholderWidget } from "../components/dashboard/widgets/PlaceholderWidget";
import "./DashboardPage.css";

export function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <h1 className="dashboard-page__title">Dashboard</h1>
        <p className="dashboard-page__subtitle">Overview of your homelab at a glance</p>
      </header>

      <div className="dashboard-grid">
        <SystemHealthWidget />

        <PlaceholderWidget
          title="Services"
          value="12"
          detail="Running services — data coming soon"
        />

        <PlaceholderWidget
          title="CPU Usage"
          value="34%"
          detail="Average across all hosts"
        />

        <PlaceholderWidget
          title="Memory"
          value="61%"
          detail="Cluster memory utilization"
        />

        <PlaceholderWidget
          title="Storage"
          span="wide"
          value="2.4 TB"
          detail="Used of 4.0 TB total capacity"
        />

        <PlaceholderWidget
          title="Network"
          value="1.2 Gbps"
          detail="Current aggregate throughput"
        />

        <PlaceholderWidget
          title="Alerts"
          value="3"
          detail="Active warnings requiring attention"
        />

        <PlaceholderWidget
          title="Uptime"
          value="99.8%"
          detail="Rolling 30-day availability"
        />
      </div>
    </div>
  );
}
