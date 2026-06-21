import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorCardListing({ doctor }) {
  const navigate = useNavigate();

  // دالة الفحص وحماية مسار الحجز
  const handleBookingClick = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // 1️⃣ الفحص الأول المتأمن: لو التوكن مش موجود، أو قيمته النصية "null" أو "undefined"
    if (!token || token === "null" || token === "undefined") {
      alert("عذراً، يجب تسجيل الدخول كمريض أولاً لتتمكن من حجز موعد ورؤية تفاصيل المرضى.");
      navigate("/login");
      return;
    }

    // 2️⃣ الفحص الثاني: لو طبيب
    if (userRole === "Doctor" || userRole === "doctor") {
      alert("خطأ: حسابك الحالي هو (طبيب). يجب تسجيل الدخول بحساب مريض لتتمكن من حجز المواعيد.");
      return;
    }

    // 3️⃣ لو مريض تمام ومسجل فعلاً
    navigate(`/doctor/${doctor.id}`);
  };
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">

      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src={doctor.image}
          alt="Doctor"
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold text-lg">
            {doctor.name}
          </h3>

          <p className="text-[#468EEC] text-sm font-medium">
            {doctor.specialty}
          </p>

          <div className="flex items-center gap-1 text-xs mt-1 text-black">
            ⭐ {doctor.rating} ({doctor.reviews} مراجعة)
          </div>

          <div className="flex items-center gap-8 text-xs mt-1 text-black">

            <div>
              <i className="fa-solid fa-location-dot text-[#4a90e2]"></i>
              {" "}
              {doctor.location}
            </div>

            <div className="font-bold">
              <i className="fa-solid fa-wallet text-[#4a90e2]"></i>
              {" "}
              {doctor.price} جنيه
            </div>

          </div>
        </div>
      </div>

      <div className="text-[#468EEC] font-medium text-sm md:text-base hidden md:block">
        {doctor.experience}
      </div>

      <div className="flex flex-col items-center md:items-end w-full md:w-auto gap-3">

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${doctor.available
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-600"
            }`}
        >
          {doctor.available ? "متوفر الآن" : "متاح غداً"}
        </span>

        {/* تعديل الـ onClick هنا لتشغيل دالة الحماية */}
        <button
          onClick={handleBookingClick} // اتأكدي إن مكتوب هنا الاسم ده بالظبط
          className="w-full md:w-32 py-2 rounded-lg text-sm font-medium transition bg-blue-500 hover:bg-blue-600 text-white"
        >
          احجز الآن
        </button>

      </div>
    </div>
  );
}