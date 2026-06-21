import { useState, useRef } from "react";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  ArrowRight,
} from "lucide-react";
import DonePopup from "../../../../components/Home/DonePopup.jsx";
import { updateClinicInfo } from "../../../../../../../api/clinic.api.js";
import { Link } from "react-router-dom";

export default function EditClinic() {
  const [form, setForm] = useState({
    licenseNumber: "5264545646",
    clinicName: "عيادة دكتور مالك",
    address: "15 شارع المتحف طنطا",
    from: "09:00",
    to: "05:00",
    price: "150",
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
      medicalLicense: form.licenseNumber,
      clinicName: form.clinicName,
      address: form.address,
      workHours: `${form.from} - ${form.to}`,
      price: Number(form.price),
    };

    await updateClinicInfo(payload);

    setShowPopup(true);

  } catch (error) {
    console.log("Update Clinic Error:", error);

    alert(
      error?.response?.data?.message ||
      "حدث خطأ أثناء حفظ بيانات العيادة"
    );
  }
};

  return (
    <div>
      {/* 🔹 الهيدر */}
      <div className="bg-white mb-4 shadow-md p-2">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-end items-center gap-2">
          <span className="font-bold text-2xl">تعديل معلومات العياده</span>
          <Link to="/doctor/settings">
            <ArrowRight className="text-blue-500" size={26} />
          </Link>
        </div>
      </div>

      {/* الكارد */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto px-6 py-8 space-y-6 bg-white rounded-2xl"
      >
        <h2 className="text-right text-xl font-semibold text-gray-700 mb-2">
          معلومات العيادة
        </h2>

        {/* رقم الترخيص */}
        <div className="space-y-1">
          <label className="text-sm text-right block">
            رقم الترخيص الطبي *
          </label>

          <div className="relative">
            <input
              required
              type="text"
              name="licenseNumber"
              placeholder={form.licenseNumber}
              onChange={handleChange}
              className="w-full bg-gray-50 border rounded-xl p-3 pr-10 text-right"
            />
            <FileText className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* اسم العيادة */}
        <div className="space-y-1">
          <label className="text-sm text-right block">
            المستشفى / العيادة *
          </label>

          <div className="relative">
            <input
              required
              type="text"
              name="clinicName"
              placeholder={form.clinicName}
              onChange={handleChange}
              className="w-full bg-gray-50 border rounded-xl p-3 pr-10 text-right"
            />
            <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* العنوان */}
        <div className="space-y-1">
          <label className="text-sm text-right block">العنوان *</label>

          <div className="relative">
            <input
              required
              type="text"
              name="address"
              placeholder={form.address}
              onChange={handleChange}
              className="w-full bg-gray-50 border rounded-xl p-3 pr-10 text-right"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* مواعيد العمل */}
        <div className="space-y-1">
          <label className="text-sm text-right block">مواعيد العمل *</label>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                required
                type="text"
                name="from"
                placeholder={form.from}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl p-3 pr-10 text-right"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="relative">
              <input
                required
                type="text"
                name="to"
                placeholder={form.to}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl p-3 pr-10 text-right"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {/* سعر الكشف */}
        <div className="space-y-1">
          <label className="text-sm text-right block">سعر الكشف *</label>

          <div className="relative">
            <input
              required
              type="number"
              name="price"
              placeholder={form.price}
              onChange={handleChange}
              className="w-full bg-gray-50 border rounded-xl p-3 pr-10 text-right"
            />
            <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* زرار */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-2 rounded-xl shadow hover:bg-blue-600 transition"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>

      {/* Popup */}
      <DonePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="تم حفظ التعديلات بنجاح"
        color="blue"
      />
    </div>
  );
}