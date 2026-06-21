import { useState } from "react";
import { useNavigate } from "react-router-dom";

import doctorLoginLogo from "../../assets/doctor-login-logo.png";
import doctorLoginIllustration from "../../assets/doctor-login-illustration.png";

export default function DoctorLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Doctor Login attempt:", { email, password });
    localStorage.setItem("role", "doctor");
    navigate("/doctor");
  };

  return (
    <div
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full flex rounded-none overflow-hidden min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">

          {/* Left Side - Illustration */}
          <div
            className="hidden lg:flex flex-col items-center justify-center p-7
                       bg-linear-to-b from-[#003B88] to-[#1DA1F2] relative"
          >
            {/* Logo */}
            <div className="absolute top-7 w-full flex justify-center">
              <img
                src={doctorLoginLogo}
                alt="شعار رفيق"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Illustration */}
            <div className="flex-1 flex items-center justify-center w-full">
              <img
                src={doctorLoginIllustration}
                alt="توضيح تسجيل الدخول للطبيب"
                className="max-w-full h-auto object-contain
                           drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-110">

              <div className="flex flex-col items-center gap-6 mb-8">
                <h1 className="font-changa text-4xl font-semibold text-[#468EEC] text-center w-full">
                  يسعدني رؤيتك مجددًا!
                </h1>

                <p className="font-changa text-3xl font-semibold text-[#5B5B5B] text-center">
                  سجّل الدخول للمتابعة إلى حسابك
                </p>

                {/* User Type Toggle */}
                <div className="flex items-center gap-2 border border-[#C7C7C7] rounded-2xl p-2">

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-2.5 px-9 py-2.5 rounded-lg
                               font-cairo font-semibold text-base transition-all duration-200
                               bg-transparent text-[#121212]"
                  >
                    مستخدم
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2.5 px-9 py-2.5 rounded-lg
                               font-cairo font-semibold text-base transition-all duration-200
                               bg-[#468EEC] text-white"
                  >
                    طبيب
                  </button>
                </div>

                {/* Login Form */}
                <form
                  onSubmit={handleLogin}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <div className="flex flex-col gap-4 w-full">

                    <div className="flex flex-col gap-2 items-end w-full">
                      <label className="text-[#121212] font-cairo font-semibold text-lg">
                        البريد الالكتروني او رقم الهاتف
                      </label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-3 py-2 border border-[#C7C7C7] rounded-lg
                                   text-right font-cairo font-semibold text-base text-[#121212]
                                   placeholder:text-[#9E9E9E]
                                   focus:outline-none focus:ring-2 focus:ring-[#468EEC]"
                      />
                    </div>

                    <div className="flex flex-col gap-2 items-end w-full">
                      <label className="text-[#121212] font-cairo font-semibold text-lg">
                        كلمة المرور
                      </label>
                      <input
                        type="password"
                        placeholder="*************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-3 py-2 border border-[#C7C7C7] rounded-lg
                                   text-right font-cairo font-semibold text-base text-[#121212]
                                   placeholder:text-[#9E9E9E]
                                   focus:outline-none focus:ring-2 focus:ring-[#468EEC]"
                      />
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#468EEC] hover:bg-[#6DA5ED] active:bg-[#135BB9]
                               text-[#F5F5F5] font-cairo font-semibold text-base rounded-lg
                               shadow-md py-3 transition-all"
                  >
                    تسجيل الدخول
                  </button>
                </form>
              </div>

              <p
                onClick={() => navigate("/signup")}
                className="text-center font-cairo font-semibold text-sm text-[#135BB9]
                           mt-6 hover:underline cursor-pointer"
              >
                ليس لديك حساب؟ أنشئ حسابًا الآن
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}