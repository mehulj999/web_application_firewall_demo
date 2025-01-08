import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginRegister/LoginRegister";
import HomePage from "./components/HomePage/HomePage";
import MonitoringPage from "./components/MonitoringPage/MonitoringPage";
import NotFound from "./components/NotFound/NotFound";
import Settings from "./components/Settings";
import RulesPage from "./components/Rules";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/rules" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
