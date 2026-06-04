import type { ReactNode } from "react";
import "./DashboardWidget.css";

type DashboardWidgetProps = {
  title: string;
  children: ReactNode;
  span?: "normal" | "wide" | "full";
};

export function DashboardWidget({
  title,
  children,
  span = "normal",
}: DashboardWidgetProps) {
  return (
    <article className={`dashboard-widget dashboard-widget--${span}`}>
      <header className="dashboard-widget__header">
        <h2 className="dashboard-widget__title">{title}</h2>
      </header>
      <div className="dashboard-widget__body">{children}</div>
    </article>
  );
}
