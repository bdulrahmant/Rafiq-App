import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DonePopup from "../../../../components/Home/DonePopup.jsx";
import { updatePaymentInfo } from "../../../../../../../api/payment.api.js";

export default function PaymentSettings() {
  const [form, setForm] = useState({
    name: "مالك محمد",
    bank: "بنك مصر",
    iban: "SA00 0000 0000 0000 0000",
    cycle: "monthly",
  });

  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      accountHolderName: form.name,
      accountNumber: form.iban,
      bankName: form.bank,
      iban: form.iban,
      transferPeriod: form.cycle,
    };

    await updatePaymentInfo(payload);

    setShowPopup(true);

  } catch (error) {
    console.log("Update Payment Error:", error);

    alert(
      error?.response?.data?.message ||
      "حدث خطأ أثناء حفظ بيانات الدفع"
    );
  }
};

  return (
    <div className="bg-[#eef2f7] min-h-screen">

      {/* 🔹 Header */}
      <div className="bg-white shadow-md p-2 mb-4">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-end items-center gap-2">
          <span className="font-bold text-2xl">بيانات الدفع</span>
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
        <div className="flex flex-row-reverse justify-between items-center">
          <h2 className="font-semibold text-lg text-right">
            بيانات التحويل البنكي
          </h2>

          <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
            بيانات مشفرة وآمنة
          </span>
        </div>

        {/* الاسم */}
        <div className="text-right">
          <label className="text-sm block">
            مالك الحساب *
          </label>
          <input
            type="text"
            name="name"
            placeholder={form.name}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        {/* البنك */}
        <div className="text-right">
          <label className="text-sm block">
            البنك الخاص بك *
          </label>
          <input
            type="text"
            name="bank"
            placeholder={form.bank}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        {/* IBAN */}
        <div className="text-right">
          <label className="text-sm block">
            رقم الحساب / IBAN *
          </label>
          <input
            type="text"
            name="iban"
            placeholder={form.iban}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
          />

          <p className="text-xs text-blue-500 mt-1">
            يرجى التأكد من كتابة IBAN بشكل صحيح (يبدأ بـ SA)
          </p>
        </div>

        {/* cycle */}
        <div className="text-right">
          <label className="text-sm block mb-2">
            دورة التحويل
          </label>

          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setForm({ ...form, cycle: "weekly" })}
              className={`py-2 rounded-xl ${
                form.cycle === "weekly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
            >
              أسبوعي
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, cycle: "monthly" })}
              className={`py-2 rounded-xl ${
                form.cycle === "monthly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
            >
              شهري
            </button>
          </div>
        </div>

        {/* note */}
        <p className="text-xs text-gray-400 text-center">
          بمجرد الحفظ سيتم التحقق من البيانات قبل تفعيل التحويلات التلقائية
        </p>

        {/* زرار */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-10 py-2 rounded-xl shadow hover:bg-blue-600"
          >
            حفظ بيانات الدفع
          </button>
        </div>
      </form>

      {/* Popup */}
      <DonePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="تم حفظ بيانات الدفع بنجاح"
        color="blue"
      />
    </div>
  );
}