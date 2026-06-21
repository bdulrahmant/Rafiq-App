import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import DrMalek from "../../assets/Dr.Malek.png";
import { bookDoctor } from "../../api/doctors.api";

export default function CardPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // استقبال بيانات الحجز الممررة من صفحة الـ Booking
  const bookingData = location.state;

  // Validate required booking data
  React.useEffect(() => {
    if (!bookingData) {
      navigate("/", { replace: true });
    }
  }, [bookingData, navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async () => {
    // التحقق من إدخال البيانات
    if (!cardData.cardName || !cardData.cardNumber || !cardData.expiryDate || !cardData.cvv) {
      setError("يرجى ملء جميع بيانات البطاقة.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // التحقق من وجود بيانات الحجز
      if (!bookingData) {
        console.error("❌ بيانات الحجز مفقودة");
        setError("بيانات الحجز غير متاحة. يرجى العودة والمحاولة مرة أخرى.");
        setLoading(false);
        return;
      }

      if (!bookingData.doctorId || !bookingData.slotId) {
        console.error("❌ بيانات الحجز غير مكتملة:", bookingData);
        setError("بيانات الحجز غير مكتملة.");
        setLoading(false);
        return;
      }

      // فحص حرج: منع الـ fallback slots
      if (typeof bookingData.slotId === 'string' && bookingData.slotId.startsWith('fallback')) {
        console.error("❌ CardPayment: محاولة حجز بـ fallback slot!");
        setError("الفترة الزمنية المختارة غير صحيحة. يرجى العودة واختيار فترة صحيحة.");
        setLoading(false);
        return;
      }

      // التحقق من نوع slotId
      if (typeof bookingData.slotId !== 'number') {
        console.error("❌ CardPayment: نوع slotId خاطئ:", typeof bookingData.slotId);
        setError("خطأ في بيانات الفترة الزمنية.");
        setLoading(false);
        return;
      }

      console.log("📤 إرسال طلب الحجز بدفع بطاقة...");
      console.log("🔍 تفاصيل الحجز:", JSON.stringify(bookingData, null, 2));

      const response = await bookDoctor({
        DoctorId: bookingData.doctorId,
        SlotId: bookingData.slotId,
      });

      console.log("📥 الرد من API:", response);

      const appointmentId = response?.data?.appointmentId ||
        response?.appointmentId ||
        response?.data?.id ||
        response?.id;

      const successfulBooking = {
        ...bookingData,
        paymentMethod: "card",
        appointmentId: appointmentId || null,
      };

      console.log("✅ الحجز نجح:", successfulBooking);

      navigate("/booking-success", { state: successfulBooking });
    } catch (err) {
      console.error("❌ خطأ في الحجز:", err);
      console.error("📋 تفاصيل الخطأ:");
      console.table({
        status: err.response?.status,
        statusText: err.response?.statusText,
        errorMessage: err.response?.data?.message,
        errorData: JSON.stringify(err.response?.data, null, 2),
        axiosMessage: err.message,
      });
      setError(
        err.response?.data?.message ||
        err?.message ||
        "فشل الحجز. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7F9FC]">
      <UserNavbar showAuthButtons={false} />

      <div className="font-[Cairo] px-4 py-8">
        <div className="max-w-8xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-end gap-3 mb-8" dir="ltr">
            <h2 className="text-3xl font-bold text-gray-800">
              بيانات البطاقة
            </h2>

            <button onClick={() => navigate(-1)} className="text-[#468EEC] text-2xl"
            >
              →
            </button>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm font-bold flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>{error}</p>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 items-start">

            {/* البطاقة */}
            <div className="order-2 lg:order-1 flex justify-center lg:items-center mt-16">
              <div className="w-full max-w-2md h-56 rounded-3xl bg-gradient-to-br from-[#468EEC] to-[#2563EB] p-6 text-white shadow-2xl relative overflow-hidden">

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-white/10 rounded-full"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">

                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">بطاقة الدفع</h3>
                    <i className="fa-brands fa-cc-visa text-4xl"></i>
                  </div>

                  <div className="text-2xl tracking-[4px] font-semibold text-center">
                    {cardData.cardNumber || "**** **** **** ****"}
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80">تاريخ الانتهاء</p>
                      <p>{cardData.expiryDate || "MM/YY"}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs opacity-80">اسم صاحب البطاقة</p>
                      <p className="font-bold">
                        {cardData.cardName || "CARD HOLDER"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* الفورم */}
            <div className="order-1 lg:order-2 bg-white rounded-3xl shadow-lg border border-blue-50 p-8">

              <h3 className="text-[#468EEC] text-xl font-bold mb-6">
                بيانات البطاقة البنكية
              </h3>

              <div className="space-y-5">

                <div>
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    اسم صاحب البطاقة
                  </label>

                  <div className="relative">
                    <i className="fa-regular fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                    <input
                      type="text"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      placeholder="الاسم كما هو على البطاقة"
                      className="w-full pr-12 p-4 rounded-2xl border border-blue-100 focus:border-[#468EEC] focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    رقم البطاقة
                  </label>

                  <div className="relative">
                    <i className="fa-regular fa-credit-card absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      maxLength="19"
                      placeholder="0000 0000 0000 0000"
                      dir="ltr"
                      className="w-full pr-12 pl-4 p-4 rounded-2xl border border-blue-100 focus:border-[#468EEC] focus:ring-4 focus:ring-blue-100 outline-none transition text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      تاريخ الانتهاء
                    </label>

                    <input
                      type="text"
                      name="expiryDate"
                      value={cardData.expiryDate}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      dir="ltr"
                      className="w-full p-4 rounded-2xl border border-blue-100 focus:border-[#468EEC] focus:ring-4 focus:ring-blue-100 outline-none text-center"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      CVV
                    </label>

                    <input
                      type="password"
                      name="cvv"
                      value={cardData.cvv}
                      onChange={handleCardInputChange}
                      placeholder="***"
                      maxLength="3"
                      dir="ltr"
                      className="w-full p-4 rounded-2xl border border-blue-100 focus:border-[#468EEC] focus:ring-4 focus:ring-blue-100 outline-none text-center"
                    />
                  </div>

                </div>

                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-green-700 text-sm text-center">
                  <i className="fa-solid fa-shield-halved ml-2"></i>
                  جميع بيانات الدفع محمية ومشفرة
                </div>

                <button
                  onClick={handlePaymentSubmit}
                  disabled={loading}
                  className={`w-full h-14 rounded-2xl font-bold text-lg transition-all ${loading
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-[#468EEC] to-[#2563EB] text-white hover:scale-[1.02] shadow-lg"
                    }`}
                >
                  {loading ? "جاري معالجة الدفع..." : "تأكيد الحجز"}
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}