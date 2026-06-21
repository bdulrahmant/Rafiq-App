import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";

import rafiqWhiteLogo from "../../assets/rafiq-white-logo.png";
import signupIllustration from "../../assets/signup-illustration.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState(null);

  const handleNext = () => {
    if (!accountType) return;

    if (accountType === "user") {
      navigate("/signup/user");
    }

    if (accountType === "doctor") {
      navigate("/signup/doctor");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-0"
      dir="rtl"
    >
      <div className="w-full flex overflow-hidden min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen">

          {/* Right Side (illustration) */}
          <div
            className="hidden lg:flex flex-col items-center justify-center p-7 relative"
            style={{
              background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)"
            }}
          >
            <div className="absolute top-10 w-full flex justify-center">
              <img
                src={rafiqWhiteLogo}
                alt="شعار رفيق"
                className="w-[240px] h-[140px] object-contain"
              />
            </div>

            <div className="flex-1 flex items-center justify-center w-full">
              <img
                src={signupIllustration}
                alt="توضيح إنشاء حساب"
                className="max-w-full h-auto object-contain
                           drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]
                           scale-x-[-1]"
              />
            </div>
          </div>

          {/* Left Side */}
          <div className="flex items-center justify-center p-6 lg:p-12 bg-[#F7FBFF]">
            <div className="w-full max-w-[503px] flex flex-col gap-10 h-full justify-center">

              <h1 className="font-changa text-4xl font-bold text-[#468EEC] text-right w-full leading-tight">
                اختر نوع حسابك للحصول على تجربة مخصصة
              </h1>

              <div className="flex flex-col w-full gap-10">

                {/* User */}
                <button
                  type="button"
                  onClick={() => setAccountType("user")}
                  className={`w-full bg-white rounded-2xl shadow-lg p-10
                             flex items-center justify-center gap-5
                             transition-all duration-200
                             ${
                               accountType === "user"
                                 ? "ring-2 ring-[#468EEC]"
                                 : "hover:shadow-xl"
                             }`}
                >
                  <div className="bg-[#E6E6E6] rounded-2xl p-2.5 flex-shrink-0">
                    <User className="w-10 h-10 text-[#C7C7C7]" />
                  </div>

                  <div className="flex-1 flex flex-col items-end gap-6">
                    <p className="font-cairo text-xl font-semibold text-[#4B5563] text-right">
                      لحجز المواعيد وتشخيص الأعراض والحصول على استشارات طبية متخصصة
                    </p>

                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-[#C7C7C7]" />
                      <span className="font-cairo text-lg text-[#C7C7C7]">
                        ابدأ كمستخدم
                      </span>
                    </div>
                  </div>
                </button>

                {/* Doctor */}
                <button
                  type="button"
                  onClick={() => setAccountType("doctor")}
                  className={`w-full bg-white rounded-2xl shadow-lg p-10
                             flex items-center justify-center gap-5
                             transition-all duration-200
                             ${
                               accountType === "doctor"
                                 ? "ring-2 ring-[#468EEC]"
                                 : "hover:shadow-xl"
                             }`}
                >
                  <div className="bg-[#E6E6E6] rounded-2xl p-2.5 flex-shrink-0">
                    <User className="w-10 h-10 text-[#C7C7C7]" />
                  </div>

                  <div className="flex-1 flex flex-col items-end gap-6">
                    <p className="font-cairo text-xl font-semibold text-[#4B5563] text-right">
                      لإدارة مواعيدك وملفك المهني والتواصل مع المرضى بكفاءة
                    </p>

                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-[#C7C7C7]" />
                      <span className="font-cairo text-lg text-[#C7C7C7]">
                        ابدأ كطبيب
                      </span>
                    </div>
                  </div>
                </button>

              </div>

              {/* 🔘 Button تحت */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!accountType}
                  className={`flex items-center justify-center gap-2
                             w-[180px] h-[52px] rounded-lg font-semibold
                             transition-all
                             ${
                               accountType
                                 ? "bg-[#468EEC] hover:bg-[#6DA5ED] text-white"
                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
                             }`}
                >
                  <ArrowRight className="w-5 h-5" />
                  متابعة
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}