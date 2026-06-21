import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import DrMalek from "../../assets/Dr.Malek.png";
import {
  getPatientBookings,
  cancelAppointment,
} from "../../api/appointments.api";
import {
  mapPatientBooking,
  mapUiTabToApiStatus,
} from "../../utils/bookingMappers";

export default function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const status = mapUiTabToApiStatus(activeTab);
        console.log(`📋 جلب الحجوزات: ${status}`);
        
        const data = await getPatientBookings(status);
        console.log(`📊 عدد الحجوزات: ${(data || []).length}`);
        
        setBookings((data || []).map(mapPatientBooking));
      } catch (error) {
        console.error("❌ خطأ في جلب الحجوزات:", {
          status: error?.response?.status,
          data: error?.response?.data,
          message: error?.message,
        });
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [activeTab]);

  const handleConfirmCancel = async () => {
    try {
      await cancelAppointment(selectedBookingId);

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBookingId
            ? {
                ...booking,
                status: "ملغي",
                reason: "تم الإلغاء بناءً على طلب المستخدم",
              }
            : booking,
        ),
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ خطأ في إلغاء الحجز:", {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f0f4f9]">
      <UserNavbar showAuthButtons={false} />

      <div className="py-10 px-4 font-[Cairo]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end gap-3 mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-lg font-bold shadow-md transition ${
                activeTab === "upcoming"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              القادمة
            </button>

            <button
              onClick={() => setActiveTab("previous")}
              className={`px-6 py-2 rounded-lg font-bold shadow-md transition ${
                activeTab === "previous"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              السابقة
            </button>

            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-6 py-2 rounded-lg font-bold shadow-md transition ${
                activeTab === "cancelled"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              الملغاة
            </button>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="bg-white rounded-3xl p-10 text-center text-gray-400 font-bold shadow-sm">
                جاري التحميل...
              </div>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 relative overflow-hidden"
                >
                  <div className="absolute top-6 left-6">
                    <span
                      className={`px-4 py-1 rounded-full text-[10px] font-bold ${
                        booking.status === "مؤكد"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-6">
                    <img
                      src={booking.image || DrMalek}
                      alt="Doctor"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-50"
                    />

                    <div className="flex-grow text-right mt-1">
                      <h3 className="font-bold text-lg text-gray-800">
                        {booking.doctorName}
                      </h3>

                      <p className="text-[#4a90e2] font-bold text-sm mb-4">
                        {booking.specialty}
                      </p>

                      <div className="flex items-center justify-start gap-6 text-gray-400 text-xs font-medium">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <i className="fa-regular fa-calendar text-[#4a90e2]"></i>
                          <span>{booking.date}</span>
                        </div>

                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <i className="fa-regular fa-clock text-[#4a90e2]"></i>
                          <span>{booking.time}</span>
                        </div>

                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <i className="fa-solid fa-location-dot text-[#4a90e2]"></i>
                          <span>{booking.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50">
                    {booking.status === "ملغي" ? (
                      <div className="p-3 bg-white border border-red-200 rounded-xl text-center text-red-500 text-xs font-bold shadow-inner">
                        {booking.reason}
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            navigate(`/booking-details/${booking.id}`)
                          }
                          className="flex-[2] bg-[#4a90e2] text-white py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-600 transition"
                        >
                          عرض التفاصيل
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/booking/${booking.id}`, {
                              state: { isEdit: true },
                            })
                          }
                          className="flex-[1] border border-blue-100 text-[#4a90e2] py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition"
                        >
                          تعديل موعد
                        </button>

                        <button
                          onClick={() => {
                            setSelectedBookingId(booking.id);
                            setIsModalOpen(true);
                          }}
                          className="flex-[1] border border-red-100 text-red-400 py-3 rounded-xl text-sm font-bold hover:bg-red-50 transition"
                        >
                          إلغاء
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center text-gray-400 font-bold shadow-sm">
                لا توجد حجوزات حالياً
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-4xl"></i>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-[#A00505] mb-6">
              هل أنت متأكد أنك تريد إلغاء هذا الحجز؟
            </h3>

            <p className="text-gray-500 text-xl mb-12">
              لن تتمكن من استرجاعه بعد الإلغاء.
            </p>

            <div className="flex flex-row-reverse gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-[#468EEC] text-white py-4 rounded-xl font-bold text-xl shadow-lg"
              >
                رجوع
              </button>

              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-white text-[#468EEC] border border-[#468EEC] py-4 rounded-xl font-bold text-xl"
              >
                تأكيد الإلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
