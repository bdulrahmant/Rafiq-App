import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import DrMalek from "../../assets/Dr.Malek.png";
import { bookDoctor } from "../../api/doctors.api";

import AuthMessageModal from "../../components/ui/AuthMessageModal";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state;

  // Validate required booking data
  React.useEffect(() => {
    if (!bookingData) {
      console.error("❌ Payment: بيانات الحجز مفقودة تماماً");
      navigate("/", { replace: true });
    } else {
      console.log("✅ Payment: بيانات الحجز استقبلت بنجاح");
      console.table({
        doctorId: bookingData.doctorId,
        doctorIdType: typeof bookingData.doctorId,
        slotId: bookingData.slotId,
        slotIdType: typeof bookingData.slotId,
        doctorName: bookingData.doctorName,
        date: bookingData.date,
      });
    }
  }, [bookingData, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "error",
  });

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (!bookingData) {
        console.error("❌ لم يتم تمرير بيانات الحجز");

        setModal({
          open: true,
          title: "خطأ",
          message: "بيانات الحجز مفقودة، يرجى العودة والمحاولة مرة أخرى",
          type: "error",
        });

        setLoading(false);
        return;
      }

      if (!bookingData.doctorId) {
        console.error("❌ معرف الطبيب مفقود", bookingData);

        setModal({
          open: true,
          title: "خطأ",
          message: "معرف الطبيب مفقود",
          type: "error",
        });

        setLoading(false);
        return;
      }

      if (!bookingData.slotId) {
        console.error("❌ الفترة الزمنية مفقودة", bookingData);

        setModal({
          open: true,
          title: "خطأ",
          message: "يرجى اختيار فترة زمنية متاحة",
          type: "error",
        });

        setLoading(false);
        return;
      }

      // منع الـ fallback slots القديمة
      if (
        typeof bookingData.slotId === "string" &&
        bookingData.slotId.startsWith("fallback")
      ) {
        console.error(
          "❌ Payment: محاولة حجز بـ fallback slot غير صحيح!"
        );

        setModal({
          open: true,
          title: "موعد غير صالح",
          message: "يرجى العودة واختيار موعد متاح من القائمة",
          type: "error",
        });

        setLoading(false);
        return;
      }

      // الدفع بالبطاقة
      if (paymentMethod === "card") {
        navigate("/card-payment", {
          state: bookingData,
        });
        return;
      }

      const payload = {
        DoctorId: Number(bookingData.doctorId),
        SlotId: Number(bookingData.slotId),
      };

      console.log(
        "📤 بيانات الـ Payload المستهدفة:",
        JSON.stringify(payload, null, 2)
      );

      // حالة التست القديمة
      
      // الحجز الحقيقي
      const response = await bookDoctor(payload);

      console.log(
        "📥 الرد الفعلي والناجح من الـ API:",
        response
      );

      const appointmentId =
        response?.data?.appointmentId ||
        response?.appointmentId ||
        response?.data?.id ||
        response?.id;

      setModal({
        open: true,
        title: "تم الحجز بنجاح",
        message: "تم تأكيد موعدك بنجاح",
        type: "success",
      });

      setTimeout(() => {
        navigate("/booking-success", {
          state: {
            ...bookingData,
            paymentMethod,
            appointmentId: appointmentId || null,
          },
        });
      }, 1500);

    } catch (error) {
      console.error(
        "❌ خطأ في عملية الحجز الفعلي:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "فشل الحجز. يرجى المحاولة مرة أخرى.";

      setModal({
        open: true,
        title: "فشل الحجز",
        message: errorMessage,
        type: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="container mx-auto px-4 py-8" dir="rtl" >
        <div className="max-w- mx-auto">

  {/* Header */}
 <div className="flex items-center justify-end mb-8" dir="ltr">
  <div className="flex items-center gap-2">
    <h2 className="text-2xl font-bold text-gray-800">
      طرق الدفع
    </h2>

    <button
      onClick={() => navigate(-1)}
      className="text-[#468EEC] text-2xl"
    >
      →
    </button>
  </div>
</div>
  <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mb-6">
    <div className="flex items-start gap-3">
      <i className="fa-solid fa-circle-info text-[#468EEC] text-xl mt-1"></i>

      <div>
        <h3 className="font-bold text-[#468EEC] text-xl mb-2">
          اختر طريقة الدفع المناسبة لك
        </h3>

        <p className="text-gray-600 leading-8">
          لضمان موعدك بالكامل ننصح بالدفع الإلكتروني لتأكيد الحجز.
          الحجوزات بالدفع عند الوصول قد تتأثر بأولوية المواعيد المؤكدة.
        </p>
      </div>
    </div>
  </div>

  {/* طرق الدفع */}
  <div className="space-y-5">

    <label
      className={`flex items-center justify-between p-6 bg-white rounded-2xl border cursor-pointer transition-all ${
        paymentMethod === "card"
          ? "border-[#468EEC] bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <i className="fa-regular fa-credit-card text-3xl"></i>

        <span className="font-bold text-xl">
          بطاقة بنكية
        </span>
      </div>

      <input
        type="radio"
        checked={paymentMethod === "card"}
        onChange={() => setPaymentMethod("card")}
      />
    </label>

    <label
      className={`flex items-center justify-between p-6 bg-white rounded-2xl border cursor-pointer transition-all ${
        paymentMethod === "cash"
          ? "border-[#468EEC] bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <i className="fa-solid fa-money-bill-wave text-3xl"></i>

        <span className="font-bold text-xl">
          الدفع عند الوصول
        </span>
      </div>

      <input
        type="radio"
        checked={paymentMethod === "cash"}
        onChange={() => setPaymentMethod("cash")}
      />
    </label>

  </div>

  <div className="flex justify-center mt-10">
    <button
      onClick={handleConfirm}
      disabled={loading}
      className={`w-full max-w-md h-14 rounded-2xl text-lg font-bold transition ${
        loading
          ? "bg-gray-300 text-white"
          : "bg-[#468EEC] hover:bg-blue-600 text-white shadow-lg"
      }`}
    >
      {loading ? "جاري التأكيد..." : "إتمام الدفع"}
    </button>
  </div>

</div>
        <AuthMessageModal
          open={modal.open}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={() =>
            setModal((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />
      </div>
      <Footer />
    </div>
  );
}