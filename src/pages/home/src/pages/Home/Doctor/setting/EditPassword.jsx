import { useState, useRef, useEffect } from "react";
import { ArrowRight, Eye, EyeOff, Info } from "lucide-react";
import { Link } from "react-router-dom";
import DonePopup from "../../../../components/Home/DonePopup.jsx";
import { changePassword } from "../../../../../../../api/changePassword.api.js";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const formRef = useRef();
  const hintRef = useRef();
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.newPassword !== formData.confirmPassword) {
    toast.error("كلمة المرور غير متطابقة");
    return;
  }

  try {
    setLoading(true);

    await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });

    setShowPopup(true);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "فشل تغيير كلمة المرور"
    );
  } finally {
    setLoading(false);
  }
};
  // 👇 يقفل الـ hint لو ضغط برا
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hintRef.current && !hintRef.current.contains(e.target)) {
        setShowHint(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#eef2f7] min-h-screen">

      {/* 🔹 Header */}
      <div className="bg-white shadow-md p-2 mb-4">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-end items-center gap-2">
          <span className="font-bold text-2xl">تغيير كلمة المرور</span>
          <Link to="/doctor/settings">
            <ArrowRight className="text-blue-500" size={26} />
          </Link>
        </div>
      </div>

      {/* 🔹 Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5"
      >

        {/* كلمة المرور الحالية */}
        <div className="text-right">
          <label className="text-sm block">كلمة المرور الحالية</label>

          <div className="relative mt-2">
<input
  name="currentPassword"
  value={formData.currentPassword}
  onChange={handleChange}
  type={showOld ? "text" : "password"}
  placeholder="*************"
  className="w-full p-3 pr-10 border rounded-xl bg-gray-50"
  required
/>

            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="text-xs text-blue-500 mt-1 cursor-pointer">
            هل نسيت كلمة السر؟
          </p>
        </div>

        {/* كلمة المرور الجديدة */}
        <div className="text-right" ref={hintRef}>
          <label className="text-sm block">كلمة المرور الجديدة</label>

          <div className="relative mt-2">
<input
  name="newPassword"
  value={formData.newPassword}
  onChange={handleChange}
  type={showNew ? "text" : "password"}
  placeholder="*************"
  className="w-full p-3 pr-10 pl-10 border rounded-xl bg-gray-50"
  required
/>

            {/* 👁️ */}
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* ℹ️ */}
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
            >
              <Info size={18} />
            </button>
          </div>

          {/* 💡 Hint */}
          {showHint && (
            <div className="bg-blue-100 text-blue-600 text-xs p-3 rounded-xl mt-2 shadow">
              8 أحرف على الأقل <br />
              حرف واحد على الأقل (A-Z) <br />
              رقم واحد على الأقل (0-9)
            </div>
          )}
        </div>

        {/* تأكيد كلمة المرور */}
        <div className="text-right">
          <label className="text-sm block">تأكيد كلمة المرور</label>

          <div className="relative mt-2">
<input
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  type={showConfirm ? "text" : "password"}
  placeholder="*************"
  className="w-full p-3 pr-10 border rounded-xl bg-gray-50"
  required
/>

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* زرار */}
        <div className="flex justify-center pt-3">
<button
  type="submit"
  disabled={loading}
  className="bg-blue-500 text-white px-10 py-2 rounded-xl shadow hover:bg-blue-600 disabled:opacity-50"
>
  {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
</button>
        </div>

      </form>

      {/* Popup */}
      <DonePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="تم تحديث كلمة المرور بنجاح"
        color="blue"
      />
    </div>
  );
}