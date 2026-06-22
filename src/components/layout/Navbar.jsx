



import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MapPin, Bell, User, Menu } from "lucide-react";
import rafiqLogo from "../../assets/rafiq-logo.png";

export default function Navbar({
  showAuthButtons = true,
  onMobileMenuClick,
}) {
  return (
    <nav className="bg-white border-b border-gray-100 rounded-b-[16px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[90px]">

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {showAuthButtons ? (
              <>
                <Link to="/signup">
                  <Button variant="outline" size="sm">
                    إنشاء حساب جديد
                  </Button>
                </Link>

                <Link to="/login">
                  <Button variant="primary" size="sm">
                    تسجيل الدخول
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">مصر , طنطا</span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#468EEC]">
                  <User size={20} />
                </div>
                <button
                  type="button"
                  className="md:hidden p-2 text-gray-600"
                  onClick={onMobileMenuClick}
                  aria-label="فتح القائمة"
                >
                  <Menu size={24} />
                </button>
              </>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-[24px] w-[598px] h-[64px] justify-center">
            <a
              href="#specialties"
              className="text-[#121212] font-changa text-2xl font-semibold hover:text-[#468EEC] transition-colors"
            >
              التخصصات
            </a>
            <a
              href="#booking"
              className="text-[#121212] font-changa text-2xl font-semibold hover:text-[#468EEC] transition-colors"
            >
              احجز موعد
            </a>
            <a
              href="#assistant"
              className="text-[#121212] font-changa text-2xl font-semibold hover:text-[#468EEC] transition-colors"
            >
              رفيقك الصحي
            </a>
            <a
              href="#home"
              className="text-[#468EEC] font-changa text-2xl font-semibold border-b-2 border-[#468EEC] pb-2"
            >
              الرئيسية
            </a>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src={rafiqLogo}
              alt="رفيق"
              className="h-[55px] w-auto"
            />
          </div>

        </div>
      </div>
    </nav>
  );
}