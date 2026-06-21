import { Route } from "react-router-dom";

import Settings from "../pages/Home/Doctor/doctor.Settings.jsx";
import PaymentSettings from "../pages/Home/Doctor/setting/PaymentSettings.jsx";
import Earnings from "../pages/Home/Doctor/setting/Earnings.jsx";

// الصفحات
const Profile = () => <div>Profile Page</div>;
const ChangePassword = () => <div>Change Password</div>;
const Clinic = () => <div>Clinic Settings</div>;
const Bank = () => <div>Bank Info</div>;
const Transactions = () => <div>Transactions</div>;

export default function SettingsRoutes() {
  return (
    <>
      <Route path="/doctor/settings" element={<Settings />} />
      <Route path="/doctor/settings/profile" element={<Profile />} />
      <Route path="/doctor/settings/change-password" element={<ChangePassword />} />
      <Route path="/doctor/settings/clinic" element={<Clinic />} />
      <Route path="/doctor/settings/bank" element={<PaymentSettings />} />
      <Route path="/doctor/settings/transactions" element={<Earnings />} />
    </>
  );
}