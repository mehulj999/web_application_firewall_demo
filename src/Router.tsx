import { Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import HomePage from "./components/HomePage/HomePage";
import MonitoringPage from "./components/MonitoringPage/MonitoringPage";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute"; // Import AdminRoute

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/monitoring"
        element={
          <AdminRoute>
            <MonitoringPage />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;