import { useNavigate, useLocation } from "react-router-dom";
import { Bell, User, MapPin } from "lucide-react";
import signupLogo from "../../assets/rafiq-logo.png";

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      dir="rtl"
      className="w-full bg-white rounded-b-[16px] shadow-sm px-[98px] py-4 flex items-center justify-between"
    >

      {/* ✅ RIGHT SIDE (LOGO + LOCATION) */}
      <div className="flex items-center gap-4">

        {/* LOGO */}
        <img
          src={signupLogo}
          alt="logo"
          className="w-[120px] h-[80px] object-contain cursor-pointer"
          onClick={() => navigate("/patient-home")}
        />

        {/* LOCATION */}
        <div className="flex items-center gap-2 cursor-pointer">
          <MapPin className="text-[#468EEC]" size={20} />
          <span className="text-[#121212] font-semibold text-[18px]">
            مصر , طنطا
          </span>
        </div>
      </div>

      {/* ✅ CENTER (NAV LINKS) */}
      <div className="flex items-center gap-6">

        {/* الرئيسية */}
        <button
          onClick={() => navigate("/patient-home")}
          className="flex flex-col items-center"
        >
          <span
            className={`font-changa text-[24px] font-semibold ${
              isActive("/patient-home")
                ? "text-[#468EEC]"
                : "text-[#121212]"
            }`}
          >
            الرئيسية
          </span>

          {isActive("/patient-home") && (
            <div className="w-full h-[2px] bg-[#468EEC] mt-1" />
          )}
        </button>

        {/* رفيقك الصحي */}
        <button
          onClick={() => navigate("/chatbot")}
          className="font-changa text-[24px] font-semibold text-[#121212]"
        >
          رفيقك الصحي
        </button>

        {/* احجز موعد */}
        <button
          onClick={() => navigate("/listing")}
          className="font-changa text-[24px] font-semibold text-[#121212]"
        >
          احجز موعد
        </button>

        {/* حجوزاتي */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="font-changa text-[24px] font-semibold text-[#121212]"
        >
          حجوزاتي
        </button>

      </div>

      {/* ✅ LEFT SIDE (ICONS) */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button onClick={() => navigate("/notifications")}>
          <Bell className="text-[#5B5B5B]" size={22} />
        </button>

        {/* User */}
        <button onClick={() => navigate("/profile")}>
          <div className="w-[48px] h-[48px] bg-[#DBEAFE] rounded-full flex items-center justify-center">
            <User className="text-[#468EEC]" size={22} />
          </div>
        </button>

      </div>
    </div>
  );
};

export default UserNavbar;