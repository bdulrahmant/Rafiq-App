import { Route } from "react-router-dom";

// Layouts
import DoctorLayout from "../layouts/Doctor.layout.jsx";
import SettingsLayout from "../layouts/SettingsLayout.jsx";

// Doctor Pages
import DoctorHome from "../pages/Home/Doctor/doctor.home.jsx";
import Appointments from "../pages/Home/Doctor/doctor.Appointments.jsx";
import Patients from "../pages/Home/Doctor/doctor.Patients.jsx";
import Articles from "../pages/Home/Doctor/doctor.Articles.jsx";
import Settings from "../pages/Home/Doctor/doctor.Settings.jsx";

// Settings Pages
import Profile from "../pages/Home/Doctor/setting/EditProfile.jsx";
import EditClinic from "../pages/Home/Doctor/setting/EditClinic.jsx";
import PaymentSettings from "../pages/Home/Doctor/setting/PaymentSettings.jsx";
import Earnings from "../pages/Home/Doctor/setting/Earnings.jsx";
import ChangePassword from "../pages/Home/Doctor/setting/EditPassword.jsx";
import Notification from "../pages/Home/Doctor/Notification.jsx";
import DoctorProfile from "../pages/Home/Doctor/DoctorProfile.jsx";

const doctorRoutes = (
  <>
    {/* 🔹 Doctor Layout */}
    <Route path="/doctor" element={<DoctorLayout />}>
    <Route path="profile" element={<DoctorProfile />} />
      <Route index element={<DoctorHome />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="patients" element={<Patients />} />
      <Route path="articles" element={<Articles />} />

      {/* Settings main */}
      <Route path="settings" element={<Settings />} />
    </Route>

    {/* 🔹 Settings Layout (sub pages) */}
    <Route path="/doctor/settings" element={<SettingsLayout />}>
      <Route path="profile" element={<Profile />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="clinic" element={<EditClinic />} />
      <Route path="bank" element={<PaymentSettings />} />
      <Route path="transactions" element={<Earnings />} />

      {/* Notifications */}
      <Route
        path="notifications"
        element={<Notification />}
      />
    </Route>
  </>
);

export default doctorRoutes;