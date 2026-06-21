import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import rafiqWhiteLogo from "../../assets/rafiq-white-logo.png";
import signupIllustration from "../../assets/signup-illustration.png";

import AuthMessageModal from "../../components/ui/AuthMessageModal";
import { verifyOtp } from "../../api/auth.api";

export default function VerifyOtpPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "error",
  });

  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {

    const code =
      otp.join("");

    if (
      code.length !== 4
    ) {

      setModal({
        open: true,

        title:
          "كود غير مكتمل",

        message:
          "من فضلك أدخل رمز التحقق كاملاً",

        type:
          "error",
      });

      return;
    }

    try {

      setLoading(
        true
      );

      const response =
        await verifyOtp(
          email,
          code
        );

      console.log(
        response
      );

      setModal({

        open: true,

        title:
          "تم التحقق",

        message:
          "تم التحقق من رمز التأكيد بنجاح",

        type:
          "success",
      });

      setTimeout(
        () => {

          navigate("/reset-password", {
            state: {
              email,
              otp: code,
            },
          });

        },

        1500
      );

    }

    catch (
    error
    ) {

      console.log(
        error?.response
          ?.data || error
      );

      setModal({

        open: true,

        title:
          "فشل التحقق",

        message:

          error?.response
            ?.data
            ?.message ||

          "رمز التحقق غير صحيح",

        type:
          "error",
      });
    }

    finally { setLoading(false); }
  };

  const handleResend = async () => {

    setOtp([
      "",
      "",
      "",
      "",
    ]);

    inputRefs[0]
      .current?.focus();

    setModal({

      open: true,

      title:
        "تم الإرسال",

      message:
        "تم إرسال رمز تحقق جديد",

      type:
        "success",
    });
  };

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

          <div className="w-full max-w-md flex flex-col gap-6">

            {/* Titles */}
            <div className="text-center">

              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-changa font-semibold text-[#468EEC] mb-4">
                التحقق من الرمز
              </h1>

              <p className="text-[#5B5B5B] font-cairo text-lg">
                أدخل رمز التحقق المكون من 4 أرقام.
              </p>

            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-4 mt-6" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 md:w-16 md:h-16 text-center text-xl font-bold border border-[#C7C7C7] rounded-lg"
                />
              ))}
            </div>

            {/* Button */}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-[180px] h-[52px] mx-auto mt-4 bg-[#468EEC] text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "جارٍ التحقق..." : "تحقق"}
            </button>

            {/* Resend */}
            <button
              onClick={handleResend}
              className="text-[#468EEC] text-sm mt-2"
            >
              إعادة إرسال رمز التحقق
            </button>

          </div>

        </div>

      </div>
      <AuthMessageModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() =>
          setModal({
            ...modal,
            open: false,
          })
        }
      />
    </div>
  );
}