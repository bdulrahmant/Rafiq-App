import { useNavigate } from "react-router-dom";

import rafiqWhiteLogo from "../../assets/rafiq-white-logo.png";
import signupIllustration from "../../assets/signup-illustration.png";

export default function ResetSuccessPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-4 md:p-0"
      dir="rtl"
    >
      <div className="w-full flex flex-col lg:flex-row-reverse min-h-screen">

        {/* 🔵 LEFT (نفس Login EXACT) */}
        <div
          className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 gap-8 shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]"
          style={{
            background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)"
          }}
        >
          <div className="w-48 h-28 lg:w-60 lg:h-36 flex items-center justify-center">
            <img
              src={rafiqWhiteLogo}
              alt="رفيق Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-72 h-72 lg:w-[500px] lg:h-[500px] flex items-center justify-center">
            <img
              src={signupIllustration}
              alt="Mascot Character"
              className="w-full h-full object-contain drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]"
            />
          </div>

        </div>

        {/* ⚪ RIGHT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">

          <div className="w-full max-w-md flex flex-col items-center text-center gap-6">

            {/* Title */}
            <h1 className="text-[40px] leading-[48px] font-changa font-semibold text-[#468EEC]">
              تمت إعادة تعيين كلمة المرور بنجاح
            </h1>

            {/* Description */}
            <p className="text-[28px] leading-[35px] font-changa font-semibold text-[#5B5B5B]">
              تم تحديث كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/login")}
              className="mt-4 w-full max-w-[260px] py-3 bg-[#468EEC] text-[#F5F5F5] font-cairo font-semibold text-base rounded-lg shadow-md hover:opacity-90 transition"
            >
              العودة إلى تسجيل الدخول
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}