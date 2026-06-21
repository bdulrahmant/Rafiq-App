import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthMessageModal from "../../components/ui/AuthMessageModal";

import rafiqLogo from "../../assets/rafiq-white-logo.png";
import robot from "../../assets/signup-illustration.png";

import { registerUser } from "../../api/auth.api";

export default function UserSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "error",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      setModal({
        open: true,
        title: "فشل إنشاء الحساب",
        message: "كلمتا المرور غير متطابقتين",
        type: "error",
      });

      return;
    }

    try {

      const payload = {
        email: formData.email,
        name: formData.fullName,
        password: formData.password,
        role: "Patient",
      };

      const data =
        await registerUser(
          payload
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role || "Patient"
      );

      setModal({
        open: true,
        title: "تم بنجاح",
        message: "تم إنشاء الحساب بنجاح",
        type: "success",
      });

      setTimeout(() => {
        navigate(
          "/complete-profile"
        );
      }, 1500);

    } catch (error) {

      console.log(error);

      setModal({
        open: true,
        title: "فشل إنشاء الحساب",

        message:
          error?.response?.data?.message ||
          "حدث خطأ أثناء التسجيل",

        type: "error",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-0"
      dir="rtl"
    >
      <div className="w-full flex flex-col lg:flex-row overflow-hidden min-h-screen">

        {/* RIGHT SIDE (BLUE) */}
        <div
          className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
          style={{
            background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)",
          }}
        >
          {/* LOGO */}
          <div className="absolute top-10 flex justify-center w-full">
            <img
              src={rafiqLogo}
              alt="rafiq"
              className="w-[240px] h-[140px] object-contain"
            />
          </div>

          {/* ROBOT */}
          <img
            src={robot}
            alt="robot"
            // className="w-[420px] object-contain mt-20 scale-x-[-1]
            //            drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]"
            className="w-[500px] h-[500px] object-contain mt-20 scale-x-[-1]
           drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]"
          />
        </div>

        {/* LEFT SIDE (FORM) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
          <div className="w-full max-w-[503px] flex flex-col gap-6">

            {/* TITLES */}
            <div className="text-right">
              <h1 className="font-changa font-bold text-[40px] leading-[110%] text-[#468EEC] mb-4">
                أهلاً بك! لنبدأ رحلتك معنا
              </h1>

              <h2 className="font-changa font-semibold text-[32px] leading-[120%] text-[#1F2937]">
                أنشئ حسابك بسهولة وابدأ الاستخدام فورًا
              </h2>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[16px] p-[36px] flex flex-col gap-[18px]"
              style={{
                boxShadow: "0px 6px 4px rgba(0,0,0,0.25)",
              }}
            >
              <h2 className="font-changa font-semibold text-[22px] text-[#5B5B5B] text-right">
                المعلومات الشخصية
              </h2>

              {/* FULL NAME */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold">
                  الاسم بالكامل <span className="text-[#A00505]">*</span>
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="مثال: أحمد محمد علي"
                  className="w-full h-12 px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2 ">
                <label className="text-[16px] font-semibold">
                  البريد الالكتروني <span className="text-[#A00505]">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="example@mail.com"
                  className="w-full h-[48px] px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                  style={{ direction: "ltr", textAlign: "right" }}
                />
              </div>

              {/* PHONE */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold">
                  رقم الهاتف <span className="text-[#A00505]">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  required
                  placeholder="+20 0XX XXXXX XXX"
                  className="w-full h-[48px] px-3 border border-[#C7C7C7] rounded-lg text-left focus:ring-2 focus:ring-[#468EEC]"
                  style={{ direction: "ltr" }}
                />
              </div>

              {/* PASSWORDS */}
              <div className="flex gap-4">

                {/* CONFIRM */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[14px] font-semibold">
                    تأكيد كلمة المرور <span className="text-[#A00505]">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="w-full h-[48px] px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[14px] font-semibold">
                    كلمة المرور <span className="text-[#A00505]">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      className="w-full h-[48px] px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

              </div>

              {/* BUTTON */}


              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-[180px] h-[52px] bg-[#468EEC] text-white rounded-lg font-semibold shadow hover:bg-[#357bd8]"
                >
                  سجل الآن
                </button>
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

              {/* LOGIN */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-[#135BB9] font-semibold text-[13px]"
                >
                  لديك حساب بالفعل؟ تسجيل الدخول
                </Link>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}






