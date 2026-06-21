import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import DrMalek from "../../assets/Dr.Malek.png";
import { getDoctorDetails, getAvailableSlots } from "../../api/doctors.api";
import {
  getAppointmentDetails,
  getMyAppointments,
  updateBooking,
} from "../../api/appointments.api";
import {
  mapDoctorForBooking,
  mapSlotToTimeOption,
  formatDateForApi,
  formatBookingDateLabel,
} from "../../utils/bookingMappers";

const FALLBACK_DOCTOR = {
  id: null,
  name: "طبيب",
  specialty: "تخصص عام",
  rating: 0,
  reviews: 0,
  location: "غير محدد",
  price: 0,
  experience: "خبرة متميزة",
  image: DrMalek,
};

const FALLBACK_TIMES = [
  "10:00 ص",
  "10:30 ص",
  "11:00 ص",
  "11:30 ص",
  "12:00 م",
  "12:30 م",
  "01:00 م",
  "01:30 م",
  "02:00 م",
  "02:30 م",
  "03:00 م",
  "03:30 م",
];

export default function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [doctorData, setDoctorData] = useState(FALLBACK_DOCTOR);
  const [isEditMode, setIsEditMode] = useState(
    Boolean(location.state?.isEdit),
  );
  const [appointmentId, setAppointmentId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [pageLoading, setPageLoading] = useState(Boolean(id));

  // 🛠️ تحديث الـ State ليحتفظ باليوم والشهر والسنة بديناميكية كاملة
  const [bookingData, setBookingData] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    time: "",
    slotId: null,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /**
   * 🧠 خوارزمية توليد التقويم الذكي ومطابقته مع أيام الأسبوع:
   */
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();

    const jsDay = today.getDay();
    const satOffset = (jsDay + 1) % 7;

    const calendarStart = new Date(today);
    calendarStart.setDate(today.getDate() - satOffset);

    for (let i = 0; i < 21; i++) {
      const currentGridDate = new Date(calendarStart);
      currentGridDate.setDate(calendarStart.getDate() + i);

      const todayZero = new Date();
      todayZero.setHours(0, 0, 0, 0);
      const gridDateZero = new Date(currentGridDate);
      gridDateZero.setHours(0, 0, 0, 0);

      days.push({
        id: `${currentGridDate.getFullYear()}-${currentGridDate.getMonth()}-${currentGridDate.getDate()}`,
        dayNumber: currentGridDate.getDate(),
        month: currentGridDate.getMonth(),
        year: currentGridDate.getFullYear(),
        isPast: gridDateZero < todayZero,
      });
    }
    return days;
  }, []);

  const updateBookingData = (key, value) => {
    setBookingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!id) {
      setPageLoading(false);
      return;
    }

    const loadPage = async () => {
      try {
        if (location.state?.isEdit) {
          const appointment = await getAppointmentDetails(id);
          setIsEditMode(true);
          setAppointmentId(appointment.id);

          const appointments = await getMyAppointments();
          
console.log("appointments =", appointments);
console.log("first appointment =", appointments?.[0]);
          
          const match = appointments.find(
            (item) => item.id.toString() === id.toString(),
          );
          

          const resolvedDoctorId = match?.doctorId;
          
          setDoctorId(resolvedDoctorId);

          if (resolvedDoctorId) {
            const doctor = await getDoctorDetails(resolvedDoctorId);
            setDoctorData(mapDoctorForBooking(doctor));
          } else {
            setDoctorData({
              id: appointment.id,
              name: appointment.doctorName,
              specialty: appointment.specialization,
              rating: appointment.rate,
              reviews: appointment.reviewsCount,
              location: appointment.location,
              price: appointment.consultationPrice,
              experience: "خبرة متميزة",
              image: appointment.imagePath,
            });
          }
        }
        else {
          const doctor = await getDoctorDetails(id);
          setDoctorId(doctor.id);  // ← هنا
          setDoctorData(mapDoctorForBooking(doctor));
        }
      } catch (error) {
        console.error("❌ خطأ في تحميل بيانات الطبيب:", error);
      } finally {
        setPageLoading(false);
      }
    };

    loadPage();
  }, [id, location.state?.isEdit]);

  // 🔄 الاستماع إلى أي تغيير في التاريخ لجلب المواعيد الصحيحة
  useEffect(() => {
    if (!doctorId || !bookingData.day) return;

    const fetchSlots = async () => {
      try {
        const date = formatDateForApi(
          bookingData.year,
          bookingData.month,
          bookingData.day,
        );
        const slots = await getAvailableSlots(doctorId, date);
        const mapped = (slots || []).map(mapSlotToTimeOption);
        setTimeSlots(mapped);

        if (mapped.length > 0) {
          setBookingData((prev) => ({
            ...prev,
            time: mapped[0].label,
            slotId: mapped[0].id,
          }));
        } else {
          setBookingData((prev) => ({
            ...prev,
            time: "",
            slotId: null,
          }));
        }
      } catch (error) {
        console.error("❌ خطأ في جلب الفترات الزمنية.");
        setTimeSlots([]);
        setBookingData((prev) => ({
          ...prev,
          time: "",
          slotId: null,
        }));
      }
    };

    fetchSlots();
  }, [doctorId, bookingData.day, bookingData.month, bookingData.year]);

  const handleTimeSelect = (slot) => {
    setBookingData((prev) => ({
      ...prev,
      time: slot.label,
      slotId: slot.id,
    }));
  };

  const handleSubmit = async () => {
    if (!bookingData.slotId) {
      console.error("❌ Booking: لا يوجد slot محدد");
      return;
    }

    try {
      setLoading(true);

      const finalSlotId = Number(bookingData.slotId);

      if (isEditMode && appointmentId) {
        await updateBooking({
          appointmentId,
          SlotId: finalSlotId,
        });

        setShowModal(true);
        setTimeout(() => {
          navigate("/my-bookings");
        }, 1500);
        return;
      }

      // الانتقال لصفحة الدفع (سواء بموعد حقيقي أو تجريبي للتست)
      setShowModal(true);

      setTimeout(() => {
        const paymentState = {
          doctorId: doctorId || doctorData.id,
          slotId: finalSlotId,
          doctorName: doctorData.name,
          specialty: doctorData.specialty,
          date: formatBookingDateLabel(bookingData.day, bookingData.month, bookingData.year),
          time: bookingData.time,
          location: doctorData.location,
          image: doctorData.image,
          status: "مؤكد",
          notes: bookingData.notes,
        };

        navigate("/payment", {
          state: paymentState,
        });
      }, 1500);
    } catch (error) {
      console.error("❌ خطأ في معالجة الحجز:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayTimes = timeSlots;

  if (pageLoading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 font-cairo">
        <UserNavbar showAuthButtons={false} />
        <p className="text-center py-20 text-gray-500">جاري التحميل...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-cairo">
      <UserNavbar showAuthButtons={false} />

      <div className="relative py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative mb-6">
          <div className="absolute top-4 left-4 bg-[#E6FBF3] text-[#1BC5A3] px-3 py-1 rounded-full text-xs font-semibold">
            متوفر الآن
          </div>

          <div className="flex items-start gap-5">
            <img
              src={doctorData.image}
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover"
            />

            <div className="flex-1 text-right">
              <h3 className="text-lg font-bold text-gray-900">
                {doctorData.name}
              </h3>

              <p className="text-[#3B82F6] font-semibold mt-1">
                {doctorData.specialty}
              </p>

              <div className="flex items-center gap-1 mt-2 text-sm">
                <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                <span className="font-semibold text-gray-800">
                  {doctorData.rating}
                </span>
                <span className="text-gray-400">
                  ({doctorData.reviews} مراجعة)
                </span>
              </div>

              <div className="flex flex-row gap-6 mt-3 text-sm text-gray-700">
                <div className="flex items-center justify-end gap-2">
                  <i className="fa-solid fa-location-dot text-[#3B82F6] text-xs"></i>
                  <span>{doctorData.location}</span>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <i className="fa-solid fa-wallet text-[#3B82F6] text-xs"></i>
                  <span>{doctorData.price} جنيه</span>
                </div>

                <div className="flex items-center mr-auto gap-2">
                  <span className="text-[#3B82F6] font-semibold">
                    {doctorData.experience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-lg font-bold mb-6 text-gray-700">
                <i className="fa-regular fa-calendar text-[#468EEC]"></i>
                اختر اليوم
              </div>

              <div className="grid grid-cols-7 text-center text-sm">
                {[
                  "السبت",
                  "الأحد",
                  "الإثنين",
                  "الثلاثاء",
                  "الأربعاء",
                  "الخميس",
                  "الجمعة",
                ].map((day) => (
                  <div
                    key={day}
                    className="text-gray-400 font-medium pb-2 border-b mb-2"
                  >
                    {day}
                  </div>
                ))}

                {calendarDays.map((item) => {
                  const isSelected =
                    bookingData.day === item.dayNumber &&
                    bookingData.month === item.month &&
                    bookingData.year === item.year;

                  return (
                    <button
                      key={item.id}
                      disabled={item.isPast}
                      onClick={() => {
                        setBookingData((prev) => ({
                          ...prev,
                          day: item.dayNumber,
                          month: item.month,
                          year: item.year,
                        }));
                      }}
                      className={`p-2 rounded-lg transition-all text-center focus:outline-none ${isSelected
                          ? "bg-[#468EEC] text-white font-bold shadow-sm"
                          : item.isPast
                            ? "text-gray-200 cursor-not-allowed pointer-events-none"
                            : "hover:bg-blue-50 text-gray-600 font-medium"
                        }`}
                    >
                      {item.dayNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-lg font-bold mb-6 text-gray-700">
                <i className="fa-regular fa-clock text-[#468EEC]"></i>
                اختر الوقت
              </div>

              <h4 className="text-[#468EEC] font-bold mb-6">
                يوم {formatBookingDateLabel(bookingData.day, bookingData.month, bookingData.year)}
              </h4>

              {displayTimes.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  لا توجد مواعيد متاحة في هذا اليوم
                </p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {displayTimes.map((slot) => (
                  <button
                    key={`${slot.id}-${slot.label}`}
                    onClick={() => handleTimeSelect(slot)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${bookingData.time === slot.label
                        ? "bg-[#468EEC] text-white border-[#468EEC]"
                        : "border-blue-100 text-[#468EEC] hover:bg-blue-50"
                      }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
              <div className="flex items-center gap-2 text-lg font-bold mb-4 text-gray-700">
                <i className="fa-solid fa-pen-to-square text-[#468EEC]"></i>
                ملاحظات
              </div>

              <textarea
                value={bookingData.notes}
                onChange={(e) => updateBookingData("notes", e.target.value)}
                placeholder="أدخل أي ملاحظات للطبيب (اختياري)"
                className="w-full h-64 border border-dashed border-blue-200 rounded-xl p-4 resize-none focus:outline-none focus:border-[#468EEC] bg-blue-50/20 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading || !bookingData.slotId}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-95 ${loading || !bookingData.slotId
                ? "bg-gray-300 cursor-not-allowed text-white"
                : "bg-[#468EEC] hover:bg-blue-600 text-white"
              }`}
          >
            {loading
              ? "جاري تأكيد الحجز..."
              : isEditMode
                ? "تعديل الموعد"
                : "تأكيد الحجز الانتقال للدفع"}
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 border-4 border-[#468EEC] rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-check text-[#468EEC] text-2xl"></i>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode
                  ? "تم تعديل الموعد بنجاح"
                  : "جاري الانتقال لصفحة الدفع..."}
              </h2>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}