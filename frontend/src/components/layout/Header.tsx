import type { Theme } from "../../hooks/useTheme";
import "./Header.css";

type HeaderProps = {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  theme: Theme;
  onThemeToggle: () => void;
  username?: string;
  onLogout: () => void;
};

export function Header({
  onMenuToggle,
  sidebarOpen,
  theme,
  onThemeToggle,
  username,
  onLogout,
}: HeaderProps) {
  const isDark = theme === "dark";

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
        {username && <span className="header__user">{username}</span>}
        <button
          type="button"
          className="header__theme-btn"
          onClick={onThemeToggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          className="header__theme-btn"
          onClick={onLogout}
          aria-label="Sign out"
          title="Sign out"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
