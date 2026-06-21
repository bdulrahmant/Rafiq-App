import { useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import rafiqWhiteLogo from "../../assets/rafiq-white-logo.png";
import signupIllustration from "../../assets/signup-illustration.png";
import balto from "../../assets/balto.png";
import { loginUser } from "../../api/auth.api.js";
import AuthMessageModal from "../../components/ui/AuthMessageModal";


export default function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({ open: false, title: "", message: "", type: "error", });

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      setModal({
        open: true,
        title: "بيانات غير مكتملة",
        message:
          "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        type: "error",
      });

      return;
    }

    try {

      setLoading(true);

      const data =
        await loginUser({

          email,

          password,

          role: userType,

        });

      console.log(
        "Login Response:",
        data
      );

      const decoded =
        jwtDecode(
          data.token
        );

      const tokenRole =

        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
          ?.toLowerCase();

      const selectedRole =

        userType ===
          "doctor"

          ?

          "doctor"

          :

          "patient";


      if (
        tokenRole !==
        selectedRole
      ) {

        setModal({

          open: true,

          title:
            "نوع الحساب غير صحيح",

          message:

            selectedRole ===
              "doctor"

              ?

              "هذا الحساب مسجل كمريض وليس كطبيب"

              :

              "هذا الحساب مسجل كطبيب وليس كمريض",

          type:
            "error",
        });

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        tokenRole
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data,
          role:
            tokenRole,
        })
      );

      setModal({

        open: true,

        title:
          "تم بنجاح",

        message:
          "تم تسجيل الدخول بنجاح",

        type:
          "success",
      });

      setTimeout(() => {

        navigate(

          tokenRole ===
            "doctor"

            ?

            "/doctor"

            :

            "/patient-home"

        );

      }, 1200);

    }

    catch (err) {

      console.error(
        err
      );

      setModal({

        open: true,

        title:
          "فشل تسجيل الدخول",

        message:

          err?.response
            ?.data
            ?.message ||

          "البريد أو كلمة المرور غير صحيحة",

        type:
          "error",
      });
    }

    finally {

      setLoading(false);
    }
  };
  
  return (
    <div
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-4 md:p-0"
      dir="rtl"
    >
      <div className="w-full flex flex-col lg:flex-row-reverse rounded-none overflow-hidden shadow-2xl min-h-screen">

        {/* Left side */}
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
              src={userType === "doctor" ? balto : signupIllustration}
              alt="Mascot Character"
              className="w-full h-full object-contain drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]"
            />
          </div>

        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">

          <div className="w-full max-w-md flex flex-col gap-6">

            <div className="text-center mb-2">

              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-changa font-semibold text-[#468EEC] leading-[120%] mb-6">
                يسعدني رؤيتك مجددًا!
              </h1>

              <h2 className="text-2xl md:text-3xl lg:text-[32px] font-changa font-semibold text-[#5B5B5B] leading-[120%]">
                سجّل الدخول للمتابعة إلى حسابك
              </h2>

            </div>

            {/* اختيار نوع الدخول */}
            <div className="flex items-center gap-2 border border-[#C7C7C7] rounded-2xl p-2 mt-4">

              <button
                type="button"
                onClick={() => setUserType("user")}
                className={`flex-1 py-2.5 rounded-xl font-cairo font-semibold transition-all
                  ${userType === "user"
                    ? "bg-[#468EEC] text-white"
                    : "bg-transparent text-[#121212]"}`}
              >
                مستخدم
              </button>

              <button
                type="button"
                onClick={() => setUserType("doctor")}
                className={`flex-1 py-2.5 rounded-xl font-cairo font-semibold transition-all
                  ${userType === "doctor"
                    ? "bg-[#468EEC] text-white"
                    : "bg-transparent text-[#121212]"}`}
              >
                طبيب
              </button>

            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-6">

              <div className="flex flex-col gap-2 items-end">

                <label className="text-[#121212] font-cairo font-semibold text-lg text-right w-full">
                  البريد الالكتروني او اسم المستخدم
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full h-12 px-3 py-2 border border-[#C7C7C7] rounded-lg text-right"

                />

              </div>

              <div className="flex flex-col gap-2 items-end">

                <label className="text-[#121212] font-cairo font-semibold text-lg text-right w-full">
                  كلمة المرور
                </label>

                <div className="relative w-full">

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*************"
                    className="w-full h-12 px-3 py-2 pr-12 border border-[#C7C7C7] rounded-lg text-right"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Eye className="w-6 h-6" />
                  </button>

                </div>

              </div>
              <div className="w-full flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[16px] font-cairo font-semibold text-[#135BB9]"
                >
                  هل نسيت كلمة السر ؟
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-[180px] h-[52px] mx-auto mt-2 bg-[#468EEC] text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
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

            <div className="text-center mt-4">
              <span>ليس لديك حساب؟ </span>

              <button
                onClick={() => navigate("/signup")}
                className="text-[#6DA5ED]"
              >
                أنشئ حسابًا الآن
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}