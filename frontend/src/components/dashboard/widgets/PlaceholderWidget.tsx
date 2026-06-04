import { DashboardWidget } from "../DashboardWidget";
import "./widgets.css";

type PlaceholderWidgetProps = {
  title: string;
  span?: "normal" | "wide" | "full";
  value: string;
  detail: string;
};

export function PlaceholderWidget({
  title,
  span = "normal",
  value,
  detail,
}: PlaceholderWidgetProps) {
  return (
    <DashboardWidget title={title} span={span}>
      <p className="widget-metric">{value}</p>
      <p className="widget-placeholder">{detail}</p>
    </DashboardWidget>
  );
}
