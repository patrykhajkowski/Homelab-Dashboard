import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", to: "/dashboard" },
  { id: "services", label: "Services", to: "/services" },
  { id: "metrics", label: "Metrics", to: "/metrics" },
  { id: "settings", label: "Settings", to: "/settings" },
] as const;

type SidebarProps = {
  open: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ open, onNavigate }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${open ? "sidebar-backdrop--visible" : ""}`}
        onClick={onNavigate}
        aria-hidden={!open}
      />
      <aside
        id="app-sidebar"
        className={`sidebar ${open ? "sidebar--open" : ""}`}
        aria-label="Main navigation"
      >
        <nav className="sidebar__nav">
          <p className="sidebar__section-label">Navigation</p>
          <ul className="sidebar__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                  }
                  onClick={onNavigate}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <footer className="sidebar__footer">
          <p>Homelab Dashboard v0.1</p>
        </footer>
      </aside>
    </>
  );
}
