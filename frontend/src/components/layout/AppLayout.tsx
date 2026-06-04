import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import "./AppLayout.css";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");

    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (mq.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", onResize);
    return () => mq.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onNavigate={closeSidebar} />
      <div className="app-layout__body">
        <Header onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
