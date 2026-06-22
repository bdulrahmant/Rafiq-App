import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

import rafiqWhiteLogo from "../../assets/rafiq-white-logo.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[linear-gradient(180deg,#003B88_45%,#1DA1F2_100%)] text-white">

      <div
        dir="rtl"
        className="container mx-auto px-4 py-16"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 items-start">

          {/* Logo Section */}
          <div className="flex flex-col items-start md:items-start text-right space-y-6">

            <img
              src={rafiqWhiteLogo}
              alt="رفيق"
              className="w-[180px] object-contain"
            />

            <p className="text-sm leading-relaxed max-w-[400px]">
              منصّة رفيق تسهّل عليك حجز مواعيد الأطباء في أي وقت
              وبخطوات بسيطة، وبوت ذكي يساعدك تفهم أعراضك
              ويختار لك التخصص المناسب بسرعة.
            </p>

            <Button
              variant="secondary"
              className="w-full max-w-[300px]"
              onClick={() => navigate("/listing")}
            >
              احجز الموعد
            </Button>

          </div>

          {/* Pages */}
          <div className="text-center md:text-center">

            <h3 className="font-changa text-2xl font-semibold mb-6 ">
              الصفحات
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-3">

                <Link
                  to="/"
                  className="block hover:text-gray-200 transition"
                >
                  الرئيسية
                </Link>

                <Link
                  to="/chatbot"
                  className="block hover:text-gray-200 transition"
                >
                  رفيقك الصحي
                </Link>

                <Link
                  to="/listing"
                  className="block hover:text-gray-200 transition"
                >
                  احجز موعد
                </Link>

                <Link
                  to="/"
                  className="block hover:text-gray-200 transition"
                >
                  التخصصات
                </Link>

              </div>

              <div className="space-y-3">

                <Link
                  to="/login"
                  className="block hover:text-gray-200 transition"
                >
                  تسجيل الدخول
                </Link>

                <Link
                  to="/"
                  className="block hover:text-gray-200 transition"
                >
                  الأسئلة الشائعة
                </Link>

                <Link
                  to="/"
                  className="block hover:text-gray-200 transition"
                >
                  سياسة الخصوصية
                </Link>

                <Link
                  to="/"
                  className="block hover:text-gray-200 transition"
                >
                  الشروط والأحكام
                </Link>

              </div>

            </div>

          </div>

          {/* Contact */}
          <div className="text-right">

            <h3 className="font-changa text-2xl font-semibold mb-6 flex flex-row-reverse items-center justify-start gap-3">
              تواصل معنا
            </h3>

            <div className="space-y-4">

              <div className="flex flex-row-reverse items-center justify-start gap-3">

                <MapPin className="w-5 h-5 shrink-0" />

                <span>
                  مصر – طنطا
                </span>

              </div>

              <div className="flex flex-row-reverse items-center justify-start gap-3">

                <Mail className="w-5 h-5 shrink-0" />

                <span dir="ltr">
                  support@rafiq.com
                </span>

              </div>

              <div className="flex flex-row-reverse items-center justify-start gap-3">

                <Phone className="w-5 h-5 shrink-0" />

                <span dir="ltr">
                  +20 1221750614
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">

          <p className="text-sm">
            © 2026 منصة رفيق — جميع الحقوق محفوظة
          </p>

        </div>

      </div>

    </footer>
  );
}