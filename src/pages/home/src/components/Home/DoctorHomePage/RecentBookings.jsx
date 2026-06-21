import { CalendarDays } from "lucide-react";

export default function RecentBookings({ bookings }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">

      {/* Header */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <h2 className="font-bold text-xl text-gray-500">آخر الحجوزات</h2>
        <CalendarDays size={20} className="text-blue-500" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-center text-gray-500 border-b pb-3 text-md">
        <span>الحالة</span>
        <span>النوع</span>
        <span>الموعد</span>
        <span>اسم المريض</span>
      </div>

      {/* Rows */}
      <div>
        {bookings.map((b, i) => (
          <div
            key={i}
            className="grid grid-cols-4 text-center border-b py-4 text-md text-gray-600 items-center 
            hover:bg-gray-50 transition"
          >
            <span>{b.status}</span>
            <span>{b.type}</span>
            <span>{b.time}</span>
            <span className="text-gray-800">{b.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}