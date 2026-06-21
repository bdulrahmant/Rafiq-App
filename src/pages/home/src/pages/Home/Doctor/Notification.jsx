import {  useState } from "react";
import {
  CalendarDays,
  BookOpen,
  Wallet,
  User,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";


export default function Notification() {

const [activeTab, setActiveTab] = useState("الكل");

const [notifications] = useState([
  {
    id: 1,
    type: "المواعيد",
    title: "موعد جديد",
    desc: "تم حجز موعد جديد مع المريض أحمد محمد",
    time: "منذ 5 دقائق",
  },
  {
    id: 2,
    type: "المقالات",
    title: "تم نشر مقال",
    desc: "تم نشر مقالك الطبي بنجاح",
    time: "منذ ساعة",
  },
  {
    id: 3,
    type: "الأرباح",
    title: "تم إضافة أرباح",
    desc: "تم تحويل 1500 جنيه إلى حسابك",
    time: "منذ ساعتين",
  },
  {
    id: 4,
    type: "النظام",
    title: "تحديث النظام",
    desc: "تم تحديث النظام وإضافة تحسينات جديدة",
    time: "منذ 3 ساعات",
  },
  {
    id: 5,
    type: "المواعيد",
    title: "إلغاء موعد",
    desc: "قام المريض محمد علي بإلغاء الحجز",
    time: "أمس",
  },
  {
    id: 6,
    type: "الأرباح",
    title: "دفعة جديدة",
    desc: "تم إضافة 800 جنيه إلى رصيدك",
    time: "أمس",
  },
]);
  const tabs = [
    "الكل",
    "المواعيد",
    "المقالات",
    "الأرباح",
    "النظام",
  ];

  const filteredNotifications =
    activeTab === "الكل"
      ? notifications
      : notifications.filter(
          (item) => item.type === activeTab
        );

  const getIcon = (type) => {

    switch (type) {

      case "المواعيد":
        return CalendarDays;

      case "المقالات":
        return BookOpen;

      case "الأرباح":
        return Wallet;

      default:
        return User;
    }
  };

  const getStyles = (type) => {

    switch (type) {

      case "المواعيد":
        return {
          bg: "bg-blue-50",
          color: "text-blue-500",
        };

      case "المقالات":
        return {
          bg: "bg-purple-50",
          color: "text-purple-500",
        };

      case "الأرباح":
        return {
          bg: "bg-emerald-50",
          color: "text-emerald-500",
        };

      default:
        return {
          bg: "bg-slate-100",
          color: "text-slate-500",
        };
    }
  };

  return (
    <div dir="rtl" className="bg-blue-50 min-h-screen text-slate-800">

      {/* Header */}
      <div className="bg-white shadow-sm mb-5">

        <div className="max-w-5xl mx-auto px-8 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Link
              to="/doctor"
              className="
                p-2
                rounded-xl
                hover:bg-[#EEF2F7]
                transition
              "
            >
              <ArrowRight
                className="text-[#4B8EF7]"
                size={24}
              />
            </Link>

            <h1 className="font-bold text-[30px] text-slate-800">
              الاشعارات
            </h1>

          </div>

          <span
            className="
              bg-[#EEF2F7]
              text-[#4B8EF7]
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
            "
          >
            {filteredNotifications.length} إشعار
          </span>

        </div>

      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-8">

        <div className="bg-white rounded-[28px] p-8">

          {/* Tabs */}
          <div className="flex gap-3 mb-8 flex-wrap">

            {tabs.map((tab) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6
                  h-10.5
                  rounded-xl
                  text-sm
                  transition-all

                  ${
                    activeTab === tab
                      ? "bg-[#4B8EF7] text-white"
                      : "bg-[#F8FAFC] text-slate-500"
                  }
                `}
              >
                {tab}
              </button>
            ))}

          </div>

          {/* Notifications */}
          <div className="space-y-5">

            {filteredNotifications.map((item) => {

              const Icon = getIcon(item.type);

              const styles = getStyles(item.type);

              return (
                <div
                  key={item.id}
                  className="
                    bg-[#F8FAFC]
                    rounded-3xl
                    px-6
                    py-5
                    flex
                    justify-between
                    items-center
                    hover:shadow-md
                    transition-all
                  "
                >

                  <div className="flex items-center gap-5">

                    <div
                      className={`
                        w-14
                        h-14
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${styles.bg}
                      `}
                    >
                      <Icon
                        size={22}
                        className={styles.color}
                      />
                    </div>

                    <div>

                      <h3 className="font-bold text-[17px] mb-1">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 text-sm">
                        {item.desc}
                      </p>

                    </div>

                  </div>

                  <span
                    className="
                      text-[#4B8EF7]
                      text-sm
                      whitespace-nowrap
                    "
                  >
                    {item.time}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}