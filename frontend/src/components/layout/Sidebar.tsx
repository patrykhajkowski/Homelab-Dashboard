import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", href: "#overview", active: true },
  { id: "services", label: "Services", href: "#services", active: false },
  { id: "metrics", label: "Metrics", href: "#metrics", active: false },
  { id: "settings", label: "Settings", href: "#settings", active: false },
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
                <a
                  href={item.href}
                  className={`sidebar__link ${item.active ? "sidebar__link--active" : ""}`}
                  aria-current={item.active ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
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
