import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthMessageModal from "../../components/ui/AuthMessageModal";


import pattern from "../../assets/balto.png";
import logo from "../../assets/rafiq-white-logo.png";
import { registerUser } from "../../api/auth.api.js";

export default function DoctorSignup() {
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        role: "Doctor",

        gender: "Male",
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
        data.role || "Doctor"
      );

      setModal({
        open: true,
        title: "تم بنجاح",
        message: "تم إنشاء حساب الطبيب بنجاح",
        type: "success",
      });

      setTimeout(() => {
        navigate(
          "/complete-profile/doctor"
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
      className="min-h-screen bg-[#F7FBFF] flex items-center justify-center p-4 md:p-0"
      dir="rtl"
    >
      <div className="w-full flex flex-col lg:flex-row rounded-none overflow-hidden shadow-2xl min-h-screen">

        {/* RIGHT SIDE (الصورة) */}
        <div className="w-full lg:w-1/2 bg-gradient-to-b from-[#003B88] to-[#1DA1F2] flex flex-col items-center justify-center p-8 lg:p-16 gap-8 shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">

          {/* LOGO */}
          <img
            src={logo}
            alt="rafiq-logo"
            className="w-[240px] h-[140px] object-contain"
          />

          {/* IMAGE */}
          <div className="w-72 h-72 lg:w-[500px] lg:h-[500px] flex items-center justify-center">
            <img
              src={pattern}
              alt="doctor"
              className="w-full h-full object-contain"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>

        </div>

        {/* LEFT SIDE (الفورم) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
          <div className="w-full max-w-[503px] flex flex-col gap-6">

            {/* Header */}
            <div className="text-center mb-2">
              <h1 className="text-3xl lg:text-[36px] font-changa font-semibold text-[#468EEC] mb-4">
                أهلاً بك! لنبدأ رحلتك معنا
              </h1>

              <h2 className="text-2xl lg:text-[28px] font-changa font-semibold text-[#5B5B5B]">
                أنشئ حسابك بسهولة وابدأ الاستخدام فورًا
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-4"
            >
              <h2 className="font-changa font-semibold text-[22px] text-[#5B5B5B] text-right">
                المعلومات الشخصية
              </h2>

              {/* Full name */}
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
                  className="w-full h-11 px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
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
                  className="w-full h-11 px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                  style={{ direction: "ltr", textAlign: "right" }}
                />
              </div>

              {/* Phone */}
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
                  className="w-full h-11 px-3 border border-[#C7C7C7] rounded-lg text-left focus:ring-2 focus:ring-[#468EEC]"
                  style={{ direction: "ltr" }}
                />
              </div>

              {/* Passwords */}
              <div className="flex gap-4">

                {/* Confirm */}
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
                      minLength={8}
                      className="w-full h-11 px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password */}
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
                      className="w-full h-11 px-3 border border-[#C7C7C7] rounded-lg text-right focus:ring-2 focus:ring-[#468EEC]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {/* Submit */}
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="w-[170px] h-[48px] bg-[#468EEC] text-white rounded-lg font-semibold shadow hover:bg-[#357bd8]"
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

              {/* Login */}
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