import { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../api/auth.api";
import AuthMessageModal from "../../components/ui/AuthMessageModal";


import rafiqWhiteLogo from "../../assets/rafiq-white-logo.png";
import signupIllustration from "../../assets/signup-illustration.png";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({ open: false, title: "", message: "", type: "error", });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {

      setModal({
        open: true,

        title:
          "بيانات غير مكتملة",

        message:
          "يرجى إدخال البريد الإلكتروني",

        type:
          "error",
      });

      return;
    }

    try {

      setLoading(
        true
      );

      await sendOtp(email);

      setModal({

        open: true,

        title:
          "تم الإرسال",

        message:
          "تم إرسال رمز التحقق إلى بريدك الإلكتروني",

        type:
          "success",
      });

      setTimeout(
        () => {

          navigate(
            "/verify-otp",

            {
              state: {
                email,
              },
            }
          );

        },

        1500
      );

    }

    catch (error) {

      console.log(
        error
      );

      setModal({

        open: true,

        title:
          "فشل الإرسال",

        message: "تعذر إرسال رمز التحقق",

        type:
          "error",
      });

    }

    finally {

      setLoading(
        false
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-4 md:p-0"
      dir="rtl"
    >
      <div className="w-full flex flex-col lg:flex-row-reverse rounded-none overflow-hidden shadow-2xl min-h-screen">

        {/* LEFT */}
        {/* <div className="w-full lg:w-1/2 bg-gradient-to-b from-[#003B88] to-[#1DA1F2] flex flex-col items-center justify-center p-8 lg:p-16 gap-8 shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]"> */}
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

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">

          <div className="w-full max-w-md flex flex-col gap-6">

            <div className="text-center mb-2">

              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-changa font-semibold text-[#468EEC] mb-6">
                نسيت كلمة المرور؟
              </h1>

              <h2 className="text-xl md:text-2xl font-changa font-semibold text-[#5B5B5B]">
                اكتب بريدك الإلكتروني وسنساعدك في إعادة تعيين كلمة المرور.
              </h2>

            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">

              <div className="flex flex-col gap-2 items-end">

                <label className="text-[#121212] font-cairo font-semibold text-lg text-right w-full">
                  البريد الإلكتروني
                </label>

                <div className="relative w-full">

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full h-12 px-3 py-2 border border-[#C7C7C7] rounded-lg text-right"
                    dir="ltr"
                  />

                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-[180px] h-[52px] mx-auto mt-2 bg-[#468EEC] text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "جاري الإرسال..." : "التالي"}
              </button>

              <AuthMessageModal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                type={modal.type}

                onClose={() =>
                  setModal({
                    ...modal,
                    open: false
                  })
                }
              />

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}