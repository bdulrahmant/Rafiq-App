import { useState } from "react";
import {
  Calendar,
  Copy,
  BookOpen,
  User,
  ArrowLeft,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer";

const notificationsData = [
  {
    id: 1,
    title: "تم الغاء موعدك مع د. احمد علي",
    description:
      "تم الغاء الموعد بسبب انشغال الدكتور في عملية واليك كود خصم تعويض عن الالغاء كود الخصم : Free30",
    time: "قبل عشر دقائق",
    category: "المواعيد",
  },
  {
    id: 2,
    title: "تم رفع ملف جديد بنجاح",
    description: "تم اضافه التحليل الى ملفك الطبي",
    time: "قبل يوم",
    category: "الملفات",
  },
  {
    id: 3,
    title: "مقال جديد قد يهمك",
    description: "تم اضافه مقال جديد افتح صفحه المقالات الان",
    time: "قبل يومين",
    category: "المقالات",
  },
  {
    id: 4,
    title: "تم تحديث بيانات الملف الشُخصي",
    description: "تم تعديل رقم الهاتف بنجاح",
    time: "قبل يومين",
    category: "النظام",
  },
];

const filters = ["الكل", "المواعيد", "الملفات", "المقالات", "النظام"];

const getCategoryStyles = (category) => {
  switch (category) {
    case "المواعيد":
      return { icon: <Calendar size={20} strokeWidth={1.5} />, bg: "bg-blue-100 text-blue-600" };
    case "الملفات":
      return { icon: <Copy size={20} strokeWidth={1.5} />, bg: "bg-green-100 text-green-600" };
    case "المقالات":
      return { icon: <BookOpen size={20} strokeWidth={1.5} />, bg: "bg-purple-100 text-purple-600" };
    case "النظام":
      return { icon: <User size={20} strokeWidth={1.5} />, bg: "bg-gray-100 text-gray-500" };
    default:
      return { icon: <Bell size={20} strokeWidth={1.5} />, bg: "bg-gray-100 text-gray-500" };
  }
};

const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const navigate = useNavigate();

  const filteredNotifications =
    activeFilter === "الكل"
      ? notificationsData
      : notificationsData.filter((n) => n.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">

      {/* Header */}
      <div className="w-full px-6 md:px-16 py-6 flex justify-start items-center max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">
            الاشعارات
          </h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-lg bg-[#468EEC] flex items-center justify-center  hover:bg-[#3A7AD9] transition-colors shrink-0"
            aria-label="رجوع"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="w-full bg-muted/30  px-6 md:px-16 py-4 flex">
        <div className="flex flex-wrap gap-4 justify-start max-w-[1200px] mx-auto w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all ${activeFilter === filter
                ? "bg-[#468EEC] border-[#468EEC] text-white"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 md:px-16 py-8 flex flex-col gap-6 max-w-[1200px] mx-auto w-full">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => {
            const { icon, bg } = getCategoryStyles(notif.category);
            return (
              <div
                key={notif.id}
                className="bg-card shadow-sm rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${bg}`}
                >
                  {icon}
                </div>

                {/* Text */}
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-lg text-foreground">
                    {notif.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {notif.description}
                  </p>
                </div>

                {/* Time */}
                <span className="text-sm text-primary font-semibold whitespace-nowrap shrink-0">
                  {notif.time}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Bell size={48} className="mb-4 opacity-20" />
            <p className="text-lg">لا توجد إشعارات في هذا القسم</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotificationsPage;




