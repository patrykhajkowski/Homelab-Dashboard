import { ActivityFeedWidget } from "../components/dashboard/widgets/ActivityFeedWidget";
import { SystemHealthWidget } from "../components/dashboard/widgets/SystemHealthWidget";
import { PlaceholderWidget } from "../components/dashboard/widgets/PlaceholderWidget";
import {
  CpuUsageWidget,
  RamUsageWidget,
  StorageUsageWidget,
} from "../components/dashboard/widgets/ResourceUsageWidgets";
import { ResourceUsageProvider } from "../components/dashboard/ResourceUsageProvider";
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

        <ResourceUsageProvider>
          <CpuUsageWidget />
          <RamUsageWidget />
          <StorageUsageWidget />
        </ResourceUsageProvider>

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

        <ActivityFeedWidget />
      </div>
    </div>
  );
}
