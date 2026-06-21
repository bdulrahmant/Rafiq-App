import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import doc from "../../../../assets/doc.png";
import DonePopup from "../../../../components/Home/DonePopup.jsx";
import { updateDoctorProfile } from "../../../../../../../api/doctors.api.js";

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    name: "مالك محمد",
    email: "Malekmohammed@gmail.com",
    phone: "+20 01159463174",
    bio: "طبيب جراح قلوب الناس اداويها",
  });

  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("FullName", form.name);
    formData.append("Email", form.email);
    formData.append("Phone", form.phone);
    formData.append("Bio", form.bio);

    if (selectedImage) {
      formData.append("Image", selectedImage);
    }

    await updateDoctorProfile(formData);

    setShowPopup(true);

  } catch (error) {
    console.log("Update Profile Error:", error);

    alert(
      error?.response?.data?.message ||
      "حدث خطأ أثناء تحديث البيانات"
    );
  }
};

  return (
    <div className="bg-[#eef2f7] min-h-screen">

      {/* 🔹 الهيدر */}
      <div className="bg-white shadow-md p-2">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-end items-center gap-2">
          <span className="font-bold text-2xl">تعديل الملف الشخصي</span>
          <Link to="/doctor/settings">
            <ArrowRight className="text-blue-500" size={26} />
          </Link>
        </div>
      </div>

      {/* 🔹 الكونتينر */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 🔹 كارت الصورة */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-end gap-6 items-center">
          <div className="text-right">
  <p className="text-blue-600 font-semibold">
    الصورة الشخصية
  </p>

  <p className="text-sm text-gray-400 mt-1">
    JPG أو PNG بحجم أقصى 800KB
  </p>

  <input
    id="profile-image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => setSelectedImage(e.target.files[0])}
  />

  <label
    htmlFor="profile-image"
    className="mt-3 border border-blue-500 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-50 cursor-pointer inline-block"
  >
    رفع صورة
  </label>
</div>
          <div className="w-20 h-20 rounded-full bg-blue-100 overflow-hidden">
            <img src={doc} alt="doctor" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 🔹 الفورم */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-right font-semibold text-lg mb-6">
            المعلومات الشخصية
          </h3>

          <div className="space-y-5">

            <div className="text-right">
              <label className="text-sm font-medium">
                الاسم بالكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={form.name}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div className="text-right">
              <label className="text-sm font-medium">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder={form.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div className="text-right">
              <label className="text-sm font-medium">
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder={form.phone}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div className="text-right">
              <label className="text-sm font-medium">النبذة</label>
              <textarea
                name="bio"
                placeholder={form.bio}
                onChange={handleChange}
                rows="4"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none"
              />
            </div>

          </div>

          {/* زر submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#468EEC] text-white px-12 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
            >
              حفظ التعديلات
            </button>
          </div>
        </form>

      </div>

      {/* 🔥 Popup */}
      <DonePopup
        message="تم تعديل البيانات بنجاح"
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />

    </div>
  );
}