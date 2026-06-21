import { useState } from "react";


import RecentBookings from "../../../components/Home/DoctorHomePage/RecentBookings.jsx";
import StatsCards from "../../../components/Home/DoctorHomePage/StatsCards.jsx";
import QuickActions from "../../../components/Home/DoctorHomePage/QuickActions.jsx";
import ArticlesSection from "../../../components/Home/DoctorHomePage/ArticlesSection.jsx";
import TodaySchedule from "../../../components/Home/DoctorHomePage/TodaySchedule.jsx";

import appointments from "../../../assets/images/Home/Doctor/icon/appointments.png";
import articles from "../../../assets/images/Home/Doctor/icon/articles.png";
import money from "../../../assets/images/Home/Doctor/icon/money.png";
import rate from "../../../assets/images/Home/Doctor/icon/rate.png";


function DoctorHome() {
  const [ setOpenModal] = useState(false);

  const fullDate = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleOpenModal = () => setOpenModal(true);

  const stats = [
    {
      title: "أرباح الشهر",
      value: "12,000 جنيه",
      icon: money,
      bgColor: "bg-green-100",
    },
    {
      title: "تقييمك",
      value: 4.9,
      icon: rate,
      bgColor: "bg-yellow-100",
    },
    {
      title: "مواعيد الأسبوع",
      value: 45,
      icon: appointments,
      bgColor: "bg-purple-100",
    },
    {
      title: "حجوزات اليوم",
      value: 12,
      icon: articles,
      bgColor: "bg-blue-100",
    },
  ];

  const todaySchedule = [
    { time: "10:00 - 10:30 صباحا", name: "سارة حسن" },
    { time: "11:30 - 12:00 مساء", name: "عبدالرحمن طه" },
    { time: "1:00 - 1:30 مساء", name: "احمد علي" },
  ];

  const bookings = [
    { name: "سمير احمد", time: "1:30 - 2:00 مساء", type: "ذكر", status: "تمت" },
    { name: "محمد مدحت", time: "3:30 - 4:00 مساء", type: "ذكر", status: "تمت" },
    { name: "ندى ابراهيم", time: "4:30 - 5:00 مساء", type: "أنثى", status: "الغيت" },
  ];

  return (
    <div className="space-y-8 bg-blue-50 p-6">

      {/* Header */}
      <div className="text-right">
        <h1 className="text-3xl font-bold text-blue-500">
          اهلاً بك دكتور مالك محمد
        </h1>

        <p className="text-gray-500 mt-2">
          إليك ملخص نشاطاتك اليوم :
          <span className="text-blue-500 font-semibold"> {fullDate}</span>
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Main */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          <TodaySchedule schedule={todaySchedule} />

          
          

          {/* Actions */}
          <QuickActions onOpenModal={handleOpenModal} />

        </div>

        {/* RIGHT */}
        <div className="col-span-2 flex flex-col gap-6">

          <ArticlesSection />

          <RecentBookings bookings={bookings} />

        </div>

      </div>

    </div>
  );
}

export default DoctorHome;