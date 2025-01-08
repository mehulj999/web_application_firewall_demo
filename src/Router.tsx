import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginRegister/LoginRegister";
import HomePage from "./components/MainPage/MainPage";
import MonitoringPage from "./components/MonitoringPage/MonitoringPage";
import NotFound from "./components/NotFound/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
