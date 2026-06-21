import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer.jsx";

export default function SettingsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#eef2f7]">

      {/* المحتوى */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* الفوتر */}
      <Footer />

    </div>
  );
}