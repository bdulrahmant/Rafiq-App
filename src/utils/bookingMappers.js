import DrMalek from "../assets/Dr.Malek.png";

// استخراج رابط الأصل للسيرفر (Origin) بدون كلمة /api في النهاية للتعامل مع الصور
const API_ORIGIN = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") || "";

export const resolveImageUrl = (imagePath, fallback = DrMalek) => {
  if (
    !imagePath ||
    imagePath === "https://localhost:7239" ||
    imagePath === "http://localhost:7239" ||
    imagePath === "https://rafiqapp.runasp.net" ||
    imagePath === "http://rafiqapp.runasp.net"
  ) {
    return fallback;
  }

  if (imagePath.startsWith("https://localhost:7239")) {
    return imagePath.replace("https://localhost:7239", API_ORIGIN);
  }

  if (imagePath.startsWith("http://localhost:7239")) {
    return imagePath.replace("http://localhost:7239", API_ORIGIN);
  }

  if (imagePath.startsWith("/") && !imagePath.startsWith("//")) {
    return `${API_ORIGIN}${imagePath}`;
  }

  return imagePath;
};

export const mapApiStatusToUi = (status) => {
  const normalized = (status || "").toLowerCase();

  if (normalized === "cancelled" || normalized === "canceled") {
    return "ملغي";
  }

  if (
    normalized === "completed" ||
    normalized === "done" ||
    normalized === "finished"
  ) {
    return "منتهي";
  }

  return "مؤكد";
};

export const mapUiTabToApiStatus = (tab) => {
  if (tab === "cancelled") return "Cancelled";
  if (tab === "previous") return "Completed";
  return "Pending";
};

export const formatTimeArabic = (timeStr) => {
  if (!timeStr) return "";

  const parts = timeStr.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  const period = hours < 12 ? "ص" : "م";
  const hour12 = hours % 12 || 12;

  return `${String(hour12).padStart(2, "0")}:${minutes} ${period}`;
};

/**
 * 🛠️ تحديث ذكي: إصلاح مشكلة تدوير الأيام وتجنب أخطاء السيرفر (مثل 31 يونيو)
 */
export const formatDateForApi = (year, month, day) => {
  // استخدام كائن السيرفر الأصلي لتدوير التاريخ تلقائياً وعلمياً حسب التقويم
  const safeDate = new Date(year, month, day);
  
  const correctYear = safeDate.getFullYear();
  const correctMonthStr = String(safeDate.getMonth() + 1).padStart(2, "0");
  const correctDayStr = String(safeDate.getDate()).padStart(2, "0");
  
  const formatted = `${correctYear}-${correctMonthStr}-${correctDayStr}`;
  
  console.log("📅 تنسيق التاريخ الآمن والمصحح للـ API:");
  console.table({
    "التاريخ المدخل بالواجهة": `${year}-${month + 1}-${day}`,
    "التاريخ الفعلي بعد التصحيح": formatted,
    "حالة معالجة الشهر": safeDate.getMonth() !== month ? "🔄 تم التدوير للشهر التالي تلقائياً" : "✅ التاريخ سليم"
  });
  
  return formatted;
};

export const mapDoctorListing = (doctor) => ({
  id: doctor.id,
  name: doctor.fullName || doctor.name || "طبيب",
  specialty: doctor.specialization || "تخصص عام",
  rating: doctor.rate ?? 0,
  reviews: doctor.reviewsCount ?? 0,
  location: doctor.address || "غير محدد",
  experience: doctor.yearsOfExperience
    ? `${doctor.yearsOfExperience} سنوات خبرة`
    : "خبرة متميزة",
  price: doctor.price ?? 0,
  available: doctor.isAvailableToday ?? true,
  image: resolveImageUrl(doctor.imagePath),
});

export const mapDoctorProfile = (doctor) => ({
  id: doctor.id,
  name: doctor.fullName || "طبيب",
  specialty: doctor.specialization || "تخصص عام",
  rating: doctor.rate ?? 0,
  reviews: doctor.reviewsCount ?? 0,
  location: doctor.address || "غير محدد",
  price: doctor.price ?? 0,
  image: resolveImageUrl(doctor.imagePath),
  experience: doctor.yearsOfExperience
    ? `${doctor.yearsOfExperience} سنوات خبرة`
    : "خبرة متميزة",
  about: doctor.bio || "لا توجد نبذة متاحة حالياً.",
  services: doctor.specialization ? [doctor.specialization] : ["كشف عام"],
  weeklySchedule: doctor.weeklySchedule || [],
  reviews_list: doctor.reviews || [],
});

export const mapPatientBooking = (booking) => {
  const dateObj = booking.date ? new Date(booking.date) : null;
  
  return {
    id: booking.id,
    status: mapApiStatusToUi(booking.status),
    date: booking.appointmentDate || (dateObj ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}` : "غير محدد"),
    time: booking.appointmentTime || (dateObj ? dateObj.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }) : "غير محدد"),
    doctorName: booking.doctorName,
    specialty: booking.doctorSpecialization || booking.specialization || "تخصص عام",
    location: booking.location || "غير محدد",
    image: resolveImageUrl(booking.imagePath),
    price: booking.price,
    reason:
      booking.status?.toLowerCase() === "cancelled"
        ? "تم الإلغاء بناءً على طلب المستخدم"
        : undefined,
  };
};

export const mapSlotToTimeOption = (slot) => {
  const mapped = {
    id: slot.id,
    label: formatTimeArabic(slot.time || slot.fromTime),
    fromTime: slot.time || slot.fromTime,
    toTime: slot.toTime,
  };
  
  console.log("🕐 Slot من API:");
  console.table({
    id: mapped.id,
    idType: typeof mapped.id,
    label: mapped.label,
    fromTime: slot.fromTime,
    toTime: slot.toTime,
  });
  
  return mapped;
};

export const mapAppointmentDetails = (details) => ({
  id: details.id,
  doctorName: details.doctorName,
  specialty: details.specialization || "تخصص عام",
  image: resolveImageUrl(details.imagePath),
  location: details.location || "غير محدد",
  date: details.date,
  time: details.time,
  status: mapApiStatusToUi(details.status),
  rating: details.rate ?? 0,
  reviews: details.reviewsCount ?? 0,
  consultationPrice: details.consultationPrice,
  discount: details.discount,
  totalAmount: details.totalAmount,
  patientName: details.patientName,
  patientAge: details.patientAge,
  patientGender: details.patientGender,
  chronicDiseases: details.chronicDiseases,
  notes: details.notes,
  paymentMethod: details.paymentMethod,
});

export const mapDoctorForBooking = (doctor) => ({
  id: doctor.id,
  name: doctor.fullName || "طبيب",
  specialty: doctor.specialization || "تخصص عام",
  rating: doctor.rate ?? 0,
  reviews: doctor.reviewsCount ?? 0,
  location: doctor.address || "غير محدد",
  price: doctor.price ?? 0,
  experience: doctor.yearsOfExperience
    ? `${doctor.yearsOfExperience} سنوات خبرة`
    : "خبرة متميزة",
  image: resolveImageUrl(doctor.imagePath),
});

const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const formatBookingDateLabel = (day, month = new Date().getMonth(), year = new Date().getFullYear()) => {
  // حماية وتصحيح العرض النصي لاسم الشهر واليوم في شريط الاختيارات
  const safeDate = new Date(year, month, day);
  return `${safeDate.getDate()} ${AR_MONTHS[safeDate.getMonth()]} ${safeDate.getFullYear()}`;
};