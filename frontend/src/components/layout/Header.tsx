import "./Header.css";

type HeaderProps = {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
};

export function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__start">
        <button
          type="button"
          className="header__menu-btn"
          onClick={onMenuToggle}
          aria-expanded={sidebarOpen}
          aria-controls="app-sidebar"
          aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
        >
          <span className="header__menu-icon" aria-hidden="true" />
        </button>
        <div className="header__brand">
          <span className="header__logo" aria-hidden="true">
            HL
          </span>
          <div>
            <h1 className="header__title">Homelab Dashboard</h1>
            <p className="header__subtitle">Infrastructure overview</p>
          </div>
        </div>
      </div>
      <div className="header__end">
        <span className="header__badge" title="Dark mode active">
          Dark
        </span>
      </div>
    </header>
  );
}
