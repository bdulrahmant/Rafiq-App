import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import DrMalek from "../../assets/Dr.Malek.png";
import {
    getAppointmentDetails,
    cancelAppointment,
} from "../../api/appointments.api";
import { mapAppointmentDetails } from "../../utils/bookingMappers";

export default function BookingDetails() {
    const [isCancelModalOpen, setIsCancelModalOpen] =
        useState(false);

    const [isSuccessModalOpen, setIsSuccessModalOpen] =
        useState(false);

    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (id === "recent" && location.state?.fallbackData) {
                    setBookingData({
                        ...location.state.fallbackData,
                        id: "recent"
                    });
                    setLoading(false);
                    return;
                }
                const data = await getAppointmentDetails(id);
                setBookingData(mapAppointmentDetails(data));
            } catch (error) {
                console.error("❌ خطأ في جلب تفاصيل الحجز:", {
                    status: error?.response?.status,
                    data: error?.response?.data,
                    message: error?.message,
                });
                setBookingData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, location]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0F4F9]">
                <UserNavbar showAuthButtons={false} />
                <div className="min-h-[70vh] flex items-center justify-center text-gray-500 font-[Cairo]">
                    جاري التحميل...
                </div>
                <Footer />
            </div>
        );
    }

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-[#F0F4F9]">

                <UserNavbar showAuthButtons={false} />

                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-[Cairo]">

                    <h1 className="text-2xl font-bold text-red-500 mb-4">
                        عفواً، لم يتم العثور على الحجز
                    </h1>

                    <button
                        onClick={() => navigate("/my-bookings")}
                        className="bg-[#468EEC] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-600 transition"
                    >
                        العودة لصفحة الحجوزات
                    </button>

                </div>

                <Footer />

            </div>
        );
    }
    console.log("bookingData =", bookingData);
    const handleCancelBooking = async () => {
        try {
            await cancelAppointment(id);

            setIsCancelModalOpen(false);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("❌ خطأ في إلغاء الحجز:", {
                status: error?.response?.status,
                data: error?.response?.data,
                message: error?.message,
            });
        }
    };

    return (
        <>
            <div
                className="bg-[#F0F4F9] min-h-screen"
                dir="rtl"
            >
                <UserNavbar showAuthButtons={false} />

                <div className="py-10 px-4 md:px-10 font-[Cairo]">

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Sidebar */}
                        <div
                            className="lg:col-span-4 space-y-6"
                            dir="rtl"
                        >

                            {/* Payment */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">

                                <div className="flex gap-2 mb-6 border-b pb-4">

                                    <h3 className="font-bold text-gray-700 text-lg">
                                        الدفع
                                    </h3>

                                    <i className="fa-solid fa-wallet text-[#468EEC] text-xl"></i>

                                </div>

                                <div className="space-y-4">

                                    <PaymentRow
                                        label="سعر الكشف"
                                        value={`${bookingData.consultationPrice ?? 150} جنية`}
                                        isBlue
                                    />

                                    <hr />

                                    <PaymentRow
                                        label="طريقة الدفع"
                                        value={
                                            bookingData.paymentMethod ===
                                                "card"
                                                ? "بطاقة بنكية"
                                                : "عند الزيارة"
                                        }
                                        isBlue
                                    />

                                    <hr />

                                    <PaymentRow
                                        label="عربون التأكيد"
                                        value={`${bookingData.discount ?? 20} جنية`}
                                        isBlue
                                    />

                                    <hr />

                                    <div className="pt-4 border-t border-dashed flex justify-between items-center">

                                        <span className="text-gray-500">
                                            اجمالي المتبقي
                                        </span>

                                        <span className="text-[#468EEC] font-extrabold text-xl font-mono">
                                            {bookingData.totalAmount ?? 130} جنية
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Actions */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">

                                {/* <button
                                    onClick={() =>
                                        navigate(
                                            `/booking/${bookingData.id}`,
                                            { state: { isEdit: true } },
                                        )
                                    }
                                    className="w-full bg-[#468EEC] text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                                >
                                    تعديل الموعد
                                </button> */}
                                onClick={() =>
                                    navigate(
                                        `/booking/${bookingData.id}`,
                                        {
                                            state: {
                                                isEdit: true,
                                                bookingData,
                                            },
                                        },
                                    )
                                }

                                <button className="w-full bg-[#D1D5DB] text-gray-500 py-4 rounded-xl font-bold cursor-not-allowed">
                                    اضافة الى التقويم
                                </button>

                                <button className="w-full bg-[#D1D5DB] text-gray-500 py-4 rounded-xl font-bold cursor-not-allowed">
                                    الاتجاه الى العيادة
                                </button>

                                <button
                                    className="w-full border-2 border-red-200 text-red-500 py-4 rounded-xl font-bold hover:bg-red-50 transition-all"
                                    onClick={() =>
                                        setIsCancelModalOpen(true)
                                    }
                                >
                                    الغاء الحجز
                                </button>

                            </div>

                            {/* Contact */}
                            <div className="bg-[#E9F3FF] rounded-2xl p-8 border border-blue-100">

                                <h3 className="font-bold text-[#468EEC] mb-6 text-right text-lg">
                                    تواصل مع العيادة
                                </h3>

                                <div className="space-y-4 text-right">

                                    <ContactInfo
                                        icon="fa-location-dot"
                                        text={
                                            bookingData.location ||
                                            "طنطا - أول شارع البحر"
                                        }
                                    />

                                    <ContactInfo
                                        icon="fa-phone"
                                        text="010 00000 000"
                                    />

                                    <ContactInfo
                                        icon="fa-envelope"
                                        text="Clinic@email.com"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Main */}
                        <div
                            className="lg:col-span-8 space-y-6"
                            dir="rtl"
                        >

                            {/* Doctor Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">

                                <img
                                    src={
                                        bookingData.image || DrMalek
                                    }
                                    alt="Doctor"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-[#F0F4F9]"
                                />

                                <div className="text-center md:text-right">

                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {bookingData.doctorName}
                                    </h2>

                                    <p className="text-[#468EEC] font-bold text-lg mb-2">
                                        {bookingData.specialty ||
                                            "أخصائي عظام"}
                                    </p>

                                    <div className="flex items-center justify-center md:justify-start gap-2">

                                        <div className="flex-col items-center gap-1">

                                            <div>

                                                <i className="fa-solid fa-star text-yellow-400"></i>

                                                <span className="text-gray-800 font-bold">
                                                    {bookingData.rating}
                                                </span>

                                                <span className="text-gray-400 text-sm">
                                                    ({bookingData.reviews} مراجعة)
                                                </span>

                                            </div>

                                            <div>

                                                <i className="fa-solid fa-location-dot text-[#468EEC] text-xs"></i>

                                                <span className="text-gray-700 text-sm">
                                                    {bookingData.location ||
                                                        "طنطا - أول شارع البحر"}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Appointment */}
                            <div className="bg-white rounded-2xl p-10 shadow-sm">

                                <h3 className="font-bold text-xl text-gray-800 mb-8">
                                    موعدك
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <DateDetailBox
                                        icon="fa-calendar-days"
                                        label="التاريخ"
                                        value={bookingData.date}
                                    />

                                    <DateDetailBox
                                        icon="fa-clock"
                                        label="الوقت"
                                        value={bookingData.time}
                                    />

                                    <DateDetailBox
                                        icon="fa-stopwatch"
                                        label="المدة"
                                        value="30 دقيقة"
                                    />

                                    <DateDetailBox
                                        icon="fa-circle-check"
                                        label="الحالة"
                                        value={
                                            bookingData.status ||
                                            "مؤكد"
                                        }
                                        isStatus
                                    />

                                </div>

                            </div>

                            {/* Patient */}
                            <div className="bg-white rounded-2xl p-10 shadow-sm">

                                <div className="flex items-center gap-3 mb-8">

                                    <i className="fa-solid fa-user-pen text-[#468EEC] text-xl"></i>

                                    <h3 className="font-bold text-gray-800 text-xl">
                                        بيانات المريض
                                    </h3>

                                </div>

                                <div className="grid grid-cols-1 gap-4">

                                    <PatientDataRow
                                        label="الاسم"
                                        value={
                                            bookingData.patientName ||
                                            "أحمد محمد علي"
                                        }
                                    />

                                    <hr />

                                    <PatientDataRow
                                        label="العمر"
                                        value={bookingData.patientAge || "غير محدد"}
                                    />

                                    <hr />

                                    <PatientDataRow
                                        label="الجنس"
                                        value={bookingData.patientGender || "غير محدد"}
                                    />

                                    <hr />

                                    <PatientDataRow
                                        label="الامراض المزمنة"
                                        value={bookingData.chronicDiseases || "لا يوجد"}
                                    />

                                </div>

                                {/* Notes */}
                                <div className="mt-8 bg-[#F0F6FF] p-8 rounded-[2rem] border border-blue-50 text-center">

                                    <div className="flex items-center justify-center gap-2 mb-4 text-[#468EEC] font-bold">

                                        <i className="fa-solid fa-circle-info"></i>

                                        <span>
                                            ملاحظات اضافية
                                        </span>

                                    </div>

                                    <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">

                                        {bookingData.notes ||
                                            "لا توجد ملاحظات اضافية"}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Cancel Modal */}
            {isCancelModalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
                    dir="rtl"
                >

                    <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center shadow-2xl">

                        <div className="flex justify-center mb-4">

                            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">

                                <i className="fa-solid fa-triangle-exclamation text-[#A00505] text-4xl"></i>

                            </div>

                        </div>

                        <h3 className="text-2xl font-semibold text-[#A00505] mb-6">
                            هل أنت متأكد أنك تريد إلغاء هذا الحجز؟
                        </h3>

                        <p className="text-gray-500 text-xl mb-12">
                            لن تتمكن من استرجاعه بعد الإلغاء.
                        </p>

                        <div className="flex gap-4">

                            <button
                                onClick={() =>
                                    setIsCancelModalOpen(false)
                                }
                                className="flex-1 bg-[#468EEC] text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-blue-600 transition"
                            >
                                رجوع
                            </button>

                            <button
                                onClick={handleCancelBooking}
                                className="flex-1 bg-white text-[#468EEC] border border-[#468EEC] py-4 rounded-xl font-bold text-xl hover:bg-blue-50 transition"
                            >
                                تأكيد الإلغاء
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] p-4"
                    dir="rtl"
                >

                    <div className="bg-white rounded-[2rem] p-12 max-w-sm w-full text-center shadow-2xl">

                        <div className="w-20 h-20 bg-blue-50 border-2 border-[#468EEC] rounded-full flex items-center justify-center mx-auto mb-6">

                            <i className="fa-solid fa-check text-[#468EEC] text-3xl"></i>

                        </div>

                        <h2 className="text-xl font-bold text-[#468EEC] mb-10">
                            تم الإلغاء بنجاح
                        </h2>

                        <div className="flex flex-row gap-3">

                            <button
                                onClick={() =>
                                    navigate("/booking")
                                }
                                className="w-full bg-[#468EEC] text-white py-4 rounded-xl font-bold"
                            >
                                حجز موعد جديد
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/my-bookings")
                                }
                                className="w-full bg-white text-[#468EEC] border border-[#468EEC] py-4 rounded-xl font-bold"
                            >
                                عرض حجوزاتي
                            </button>

                        </div>

                    </div>

                </div>
            )}

            <Footer />
        </>
    );
}

// Components
function PaymentRow({
    label,
    value,
    isBlue,
}) {
    return (
        <div className="flex justify-between items-center text-sm">

            <span className="text-gray-400 font-medium">
                {label}
            </span>

            <span
                className={`${isBlue
                    ? "text-[#468EEC]"
                    : "text-gray-700"
                    } font-bold`}
            >
                {value}
            </span>

        </div>
    );
}

function ContactInfo({
    icon,
    text,
}) {
    return (
        <div className="flex items-center gap-3 text-gray-600 mb-4 justify-start">

            <i
                className={`fa-solid ${icon} text-[#468EEC] w-5`}
            ></i>

            <span className="font-medium text-sm">
                {text}
            </span>

        </div>
    );
}

function DateDetailBox({
    icon,
    label,
    value,
    isStatus,
}) {
    const bgClass = isStatus
        ? "bg-[#EAF9F1]"
        : "bg-[#F1F7FF]";

    const textClass = isStatus
        ? "text-[#22C55E]"
        : "text-[#468EEC]";

    return (
        <div
            className={`${bgClass} p-6 rounded-[2rem] flex flex-col items-center justify-center shadow-sm`}
        >

            <div
                className={`flex items-center gap-2 mb-2 font-bold ${textClass}`}
            >

                <i className={`fa-solid ${icon}`}></i>

                <span className="text-xs">
                    {label}
                </span>

            </div>

            <p className="text-gray-800 font-bold text-lg">
                {value}
            </p>

        </div>
    );
}

function PatientDataRow({
    label,
    value,
}) {
    return (
        <div className="flex justify-between items-center py-1">

            <span className="text-gray-600 font-bold">
                {label}
            </span>

            <span className="text-[#468EEC] font-medium">
                {value}
            </span>

        </div>
    );
}