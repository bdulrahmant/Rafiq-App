import appointments from "../../../assets/images/Home/Doctor/icon/appointments.png";

export default function TodaySchedule({ schedule }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">

      <div className="flex justify-end items-center mb-4 gap-2">
        <h2 className="font-bold">جدول اليوم</h2>
        <img src={appointments} className="w-6 h-6 opacity-80" />
      </div>

      <div className="space-y-5 relative">

        {/* الخط */}
        <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        {schedule.map((item, i) => (
          <div key={i} className="relative pr-6">

            {/* الوقت */}
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-sm text-gray-600">
                {item.time}
              </span>

              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            </div>

            {/* الكارت */}
            <div className="bg-blue-50 p-3 rounded-2xl shadow-md text-right border-r-4 border-blue-500">
              {item.name}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}