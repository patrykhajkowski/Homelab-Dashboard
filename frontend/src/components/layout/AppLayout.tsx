import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import "./AppLayout.css";

export function AppLayout() {
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
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}
