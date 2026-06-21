import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import DrMalek from "../../assets/Dr.Malek.png";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // البيانات الجاية من Payment مباشرة
  const bookingData = location.state || {
    doctorId: 2,
    doctorName: "د. مالك محمد حماد",
    specialty: "أخصائي عظام",
    date: "15 نوفمبر 2025",
    time: "01:00 م",
    location: "طنطا - أول شارع البحر",
    status: "مؤكد",
    image: DrMalek,
    paymentMethod: "cash",
  };

  // const handleViewDetails = () => {
  //   const targetId = bookingData.appointmentId || "recent";
  //   navigate(`/booking-details/${targetId}`, {
  //     state: { fallbackData: bookingData },
  //   });
  // };

  const handleViewDetails = () => {
    navigate("/my-bookings");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7FBFF]"
    >
      <UserNavbar showAuthButtons={false} />

      <div className="flex-grow flex flex-col items-center py-12 px-4 font-[Cairo]">

        {/* Success Icon */}
        <div className="flex flex-col items-center mb-10 text-center">

          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6 border border-blue-100">

            <div className="w-16 h-16 rounded-full border-4 border-[#468EEC] flex items-center justify-center">

              <span className="text-[#468EEC] text-4xl font-bold">
                ✓
              </span>

            </div>

          </div>

          <h1 className="text-3xl font-bold text-[#468EEC] mb-2">
            تم تأكيد حجزك بنجاح
          </h1>

          <p className="text-[#5B5B5B] text-base">
            يمكنك متابعة تفاصيل الموعد من صفحة حجوزاتي
          </p>

        </div>

        {/* Booking Card */}
        <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden mb-10">

          <div className="bg-[#4A90E2] text-white px-6 py-4 flex items-center justify-end gap-3">

            <span>
              تفاصيل الحجز
            </span>

            <i className="fa-solid fa-file-invoice text-2xl"></i>

          </div>

          <div className="p-8 md:p-10">

            {/* Doctor */}
            <div className="flex flex-row-reverse items-center gap-5 mb-12" dir="ltr">

              <img
                src={bookingData.image || DrMalek}
                onError={(e) => (e.target.src = DrMalek)}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />

              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-800">
                  {bookingData.doctorName}
                </h2>

                <p className="text-[#4a90e2] font-bold">
                  {bookingData.specialty}
                </p>

                <div className="flex items-center justify-end gap-1 text-xs mt-1">
                  <span className="text-gray-400 font-medium">
                    (320 مراجعة)
                  </span>

                  <i className="fa-solid fa-star text-yellow-400"></i>

                  <span className="text-gray-800 font-bold">
                    4.9
                  </span>
                </div>
              </div>


            </div>

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <InfoBox
                label="التاريخ"
                value={bookingData.date}
                icon="fa-calendar-days"
                color="blue"
              />

              <InfoBox
                label="الوقت"
                value={bookingData.time}
                icon="fa-clock"
                color="blue"
              />

              <InfoBox
                label="العنوان"
                value={bookingData.location}
                icon="fa-location-dot"
                color="green"
              />

              <InfoBox
                label="طريقة الدفع"
                value={
                  bookingData.paymentMethod === "card"
                    ? "بطاقة بنكية"
                    : "الدفع عند الوصول"
                }
                icon="fa-money-bill-wave"
                color="green"
              />

            </div>

            {/* Note */}
            <div className="mt-10 p-5 bg-[#fffdf0] rounded-2xl border border-[#fef3c7] flex items-center justify-center gap-3 text-sm text-gray-600">

              <i className="fa-solid fa-circle-info text-yellow-500 text-lg"></i>

              <p className="font-medium">
                يرجى الحضور قبل الموعد بـ 15 دقيقة
              </p>

            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-3xl font-bold">
          {/* <button
            onClick={handleViewDetails}
            className="flex-1 bg-[#4a90e2] text-white py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all"
          >
            عرض تفاصيل الحجز
          </button> */}
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-[#4a90e2] text-white py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all"
          >
            عرض حجوزاتي
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-white text-[#4a90e2] border-2 border-[#4a90e2] py-4 rounded-xl hover:bg-blue-50 transition-all"
          >
            العودة للرئيسية
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}

function InfoBox({ label, value, icon, color }) {
  const styles =
    color === "blue"
      ? "bg-blue-50/50 border-blue-100 text-[#4a90e2]"
      : "bg-green-50/50 border-green-100 text-green-500";

  return (
    <div
      className={`h-36 p-6 rounded-3xl border flex flex-col items-center justify-center shadow-md ${styles}`}    >

      <div className="flex items-center gap-2 mb-2 font-bold">

        <i className={`fa-solid ${icon}`}></i>

        <span className="text-sm">
          {label}
        </span>

      </div>

      <p className="text-[#4A90E2] font-bold text-xl text-center">
        {value}
      </p>

    </div>
  );
}