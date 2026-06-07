import { DashboardWidget } from "../DashboardWidget";
import { useResourceUsage } from "../../../hooks/useResourceUsage";
import "./widgets.css";

function usageLevel(percent: number): "ok" | "warn" | "error" {
  if (percent >= 90) return "error";
  if (percent >= 75) return "warn";
  return "ok";
}

type UsageBarProps = {
  percent: number;
};

function UsageBar({ percent }: UsageBarProps) {
  const level = usageLevel(percent);

  return (
    <div className="widget-usage-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={`widget-usage-bar__fill widget-usage-bar__fill--${level}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

type ResourceWidgetProps = {
  title: string;
  span?: "normal" | "wide" | "full";
  value: string;
  detail: string;
  percent: number;
};

function ResourceWidget({
  title,
  span = "normal",
  value,
  detail,
  percent,
}: ResourceWidgetProps) {
  return (
    <DashboardWidget title={title} span={span}>
      <p className="widget-metric">{value}</p>
      <UsageBar percent={percent} />
      <p className="widget-placeholder">{detail}</p>
    </DashboardWidget>
  );
}

function ResourceWidgetShell({
  title,
  span = "normal",
}: {
  title: string;
  span?: "normal" | "wide" | "full";
}) {
  const { loading, error } = useResourceUsage();

  return (
    <DashboardWidget title={title} span={span}>
      {loading && <p className="widget-placeholder">Loading...</p>}
      {!loading && error && (
        <p className="widget-error">Could not load resource data: {error}</p>
      )}
    </DashboardWidget>
  );
}

export function CpuUsageWidget() {
  const { resources, loading, error } = useResourceUsage();

  if (loading || error || !resources) {
    return <ResourceWidgetShell title="CPU Usage" />;
  }

  return (
    <ResourceWidget
      title="CPU Usage"
      value={`${resources.cpu_percent.toFixed(0)}%`}
      percent={resources.cpu_percent}
      detail="Average across all hosts"
    />
  );
}

export function RamUsageWidget() {
  const { resources, loading, error } = useResourceUsage();

  if (loading || error || !resources) {
    return <ResourceWidgetShell title="Memory" />;
  }

  return (
    <ResourceWidget
      title="Memory"
      value={`${resources.ram_percent.toFixed(0)}%`}
      percent={resources.ram_percent}
      detail={`${resources.ram_used_gb.toFixed(1)} GB of ${resources.ram_total_gb.toFixed(0)} GB used`}
    />
  );
}

export function StorageUsageWidget() {
  const { resources, loading, error } = useResourceUsage();

  if (loading || error || !resources) {
    return <ResourceWidgetShell title="Storage" span="wide" />;
  }

  return (
    <ResourceWidget
      title="Storage"
      span="wide"
      value={`${resources.storage_used_tb.toFixed(1)} TB`}
      percent={resources.storage_percent}
      detail={`${resources.storage_percent.toFixed(0)}% of ${resources.storage_total_tb.toFixed(1)} TB total capacity`}
    />
  );
}
