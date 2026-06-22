import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Info, Check } from "lucide-react";
import Footer from "../../components/layout/Footer";
// import { Button } from "../../components/ui/button";
import { Button } from "../../components/ui/Button";
import SuccessModal from "../../components/ui/SuccessModal";
import { changePassword } from "../../api/patient.api";
import AuthMessageModal from "../../components/ui/AuthMessageModal";

function getNewPasswordChecks(password) {
  const lenOk = password.length >= 8;
  const upperOk = /[A-Z]/.test(password);
  const digitOk = /[0-9]/.test(password);
  return { lenOk, upperOk, digitOk, allOk: lenOk && upperOk && digitOk };
}

const RuleRow = ({ ok, children }) => (
  <div
    className={`flex items-start justify-end gap-2 text-sm leading-relaxed ${ok ? "font-semibold text-[#468EEC]" : "text-gray-600"
      }`}
  >
    <span className="text-right">{children}</span>
    {ok ? (
      <Check
        className="mt-0.5 h-4 w-4 shrink-0 text-[#468EEC]"
        strokeWidth={3}
      />
    ) : (
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
    )}
  </div>
);

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [modal, setModal] = useState({ open: false, title: "", message: "", type: "error", });

  const checks = getNewPasswordChecks(newPassword);

  const clearError = (key) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e) => {

    e?.preventDefault?.();

    const next = {
      current: "",
      new: "",
      confirm: "",
    };

    let invalid = false;

    if (!currentPassword.trim()) {

      next.current =
        "يرجى إدخال كلمة المرور الحالية";

      invalid = true;
    }

    if (!newPassword) {

      next.new =
        "يرجى إدخال كلمة المرور الجديدة";

      invalid = true;
    }

    else if (!checks.allOk) {

      next.new =
        "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، ورقم واحد على الأقل";

      invalid = true;
    }

    if (!confirmPassword) {

      next.confirm =
        "يرجى تأكيد كلمة المرور";

      invalid = true;
    }

    else if (
      confirmPassword !==
      newPassword
    ) {

      next.confirm =
        "كلمة التأكيد غير مطابقة لكلمة المرور الجديدة";

      invalid = true;
    }

    setErrors(next);

    if (invalid) return;

    try {

      const passwordData = {

        currentPassword,

        newPassword,

        confirmPassword,
      };

      const response =
        await changePassword(
          passwordData
        );

      console.log(
        "Password Updated:",
        response
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setModal({

        open: true,

        title:
          "تم بنجاح",

        message:
          response?.message ||
          "تم تحديث كلمة المرور بنجاح",

        type:
          "success",
      });

    }

    catch (error) {

      console.log(
        error?.response?.data ||
        error
      );

      setModal({

        open: true,

        title:
          "فشل التحديث",

        message:

          error?.response
            ?.data?.message ||

          "فشل تغيير كلمة المرور",

        type:
          "error",
      });
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-right outline-none transition-all focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20";

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7FBFF] font-cairo flex flex-col"
    >
      <main className="flex-1 w-full">
        <div className="w-full border-gray-200/80">
          <div className="container mx-auto flex justify-between max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
            <div className="flex items-center  justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">
                تغيير كلمة المرور
              </h1>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#468EEC] transition-colors hover:bg-[#3A7AD9]"
                aria-label="رجوع"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <form
            id="change-password-form"
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8 lg:p-10"
            noValidate
          >
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="cp-current"
                  className="mb-2 block text-right text-sm font-semibold text-gray-800"
                >
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    id="cp-current"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      clearError("current");
                    }}
                    autoComplete="current-password"
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showCurrent ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                    }
                  >
                    {showCurrent ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.current && (
                  <p className="mt-2 text-right text-sm text-red-600">
                    {errors.current}
                  </p>
                )}
                <div className="mt-3 text-right">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-[#468EEC] hover:underline"
                  >
                    هل نسيت كلمة السر؟
                  </Link>
                </div>
              </div>

              <div>
                <label
                  htmlFor="cp-new"
                  className="mb-2 block text-right text-sm font-semibold text-gray-800"
                >
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    id="cp-new"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      clearError("new");
                    }}
                    autoComplete="new-password"
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showNew ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                    }
                  >
                    {showNew ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.new && (
                  <p className="mt-2 text-right text-sm text-red-600">
                    {errors.new}
                  </p>
                )}

                <div className="mt-4 rounded-2xl border border-[#468EEC]/25 bg-[#468EEC]/5 p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-end gap-2">
                    <span className="text-sm font-bold text-[#468EEC]">
                      متطلبات كلمة المرور
                    </span>
                    <Info
                      className="h-5 w-5 shrink-0 text-[#468EEC]"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <div className="space-y-2.5">
                    <RuleRow ok={checks.lenOk}>8 أحرف على الأقل</RuleRow>
                    <RuleRow ok={checks.upperOk}>
                      حرف كبير واحد على الأقل (A-Z)
                    </RuleRow>
                    <RuleRow ok={checks.digitOk}>
                      رقم واحد على الأقل (0-9)
                    </RuleRow>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="cp-confirm"
                  className="mb-2 block text-right text-sm font-semibold text-gray-800"
                >
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    id="cp-confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearError("confirm");
                    }}
                    autoComplete="new-password"
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showConfirm ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                    }
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirm && (
                  <p className="mt-2 text-right text-sm text-red-600">
                    {errors.confirm}
                  </p>
                )}
              </div>
            </div>
          </form>

          <div className="mt-8 flex justify-center pb-4 sm:pb-6">
            <Button
              type="submit"
              form="change-password-form"
              variant="primary"
              className="w-full max-w-2xl py-4 text-lg font-bold shadow-md rounded-2xl"
            >
              تحديث كلمة المرور
            </Button>
          </div>
          <AuthMessageModal
            open={modal.open}
            title={modal.title}
            message={modal.message}
            type={modal.type}
            onClose={() => {

              setModal({
                ...modal,
                open: false,
              });

              if (
                modal.type ===
                "success"
              ) {

                navigate("/profile");
              }
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
