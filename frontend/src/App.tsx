import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { ServicesPage } from "./pages/ServicesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="metrics" element={<PlaceholderPage title="Metrics" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
