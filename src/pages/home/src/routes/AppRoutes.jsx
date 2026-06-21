import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import doctorRoutes from "./DoctorRoutes.jsx";
import authRoutes from "./AuthRoutes.jsx";
import settingsRoutes from "./SettingsRoutes.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login-user" replace />} />

        {/* Auth */}
        {authRoutes}

        {/* Doctor Dashboard */}
        {doctorRoutes}

        {/* Settings */}
        {settingsRoutes}

      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;