import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import AddAppointmentModal from "../../../components/Home/DoctorAppointmentsPage/AddAppointment.jsx";
import DonePopup from "../../../components/Home/DonePopup.jsx";

const days = [
  { name: "السبت", date: 12 },
  { name: "الاحد", date: 13, active: true },
  { name: "الاثنين", date: 14 },
  { name: "الثلاثاء", date: 15 },
  { name: "الاربعاء", date: 16 },
  { name: "الخميس", date: 17 },
  { name: "الجمعة", date: 18 },
];

const timeSlots = [
  "09:00 - 09:30",
  "09:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "14:00 - 14:30",
  "14:30 - 15:00",
  "15:00 - 15:30",
  "15:30 - 16:00",
];
const statusStyles = {
  done: "bg-green-600 text-white",
  working: "bg-blue-500 text-white",
  cancel: "border border-red-400 text-red-500 bg-white",
  closed: "bg-gray-300 text-white",
};

const statusText = {
  done: "تمت",
  working: "قيد العمل",
  cancel: "ملغي",
  closed: "مغلق",
};

function AppointmentCard({ item }) {
  return (
    <div
      className={`
        rounded-2xl
        h-18.5
        flex
        flex-col
        justify-center
        px-3
        text-sm
        font-medium
        ${statusStyles[item.status]}
      `}
    >
      <span className="text-xs mb-1">
        {statusText[item.status]}
      </span>

      <span>{item.name}</span>
    </div>
  );
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState({
    "0-1": {
      name: "أحمد محمد",
      status: "working",
    },
    "1-2": {
      name: "سارة علي",
      status: "done",
    },
    "2-4": {
      name: "محمد حسن",
      status: "cancel",
    },
    "4-5": {
      name: "ندى إبراهيم",
      status: "working",
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const [showDonePopup, setShowDonePopup] = useState(false);

const handleConfirmAppointment = (formData) => {
  let emptyKey = null;

  for (let row = 0; row < timeSlots.length; row++) {
    for (let col = 0; col < days.length; col++) {
      const key = `${row}-${col}`;

      if (!appointments[key]) {
        emptyKey = key;
        break;
      }
    }

    if (emptyKey) break;
  }

  if (!emptyKey) {
    alert("لا توجد مواعيد متاحة");
    return;
  }

  setAppointments((prev) => ({
    ...prev,
    [emptyKey]: {
      name: formData.patientName,
      status: "working",
    },
  }));

  setOpenModal(false);
  setShowDonePopup(true);
};

  return (
    <div dir="rtl" className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl font-bold text-[#4A84E8]">
            مواعيد هذا الاسبوع
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenModal(true)}
              className="
                bg-[#4A84E8]
                text-white
                cursor-pointer
                rounded-xl
                px-6
                py-3
                font-medium
                hover:opacity-90
                transition
              "
            >
              + اضافه موعد متاح
            </button>

            <button
              className="
                border
                border-[#4A84E8]
                text-[#4A84E8]
                rounded-xl
                px-6
                py-3
                font-medium
                hover:bg-blue-50
                transition
              "
            >
              نسخ للاسبوع القادم
            </button>
          </div>
        </div>

        {/* top header */}
        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            mb-6
            flex
            items-center
            justify-between
          "
        >
          <button
            className="
              border
              border-red-500
              cursor-pointer
              text-red-500
              rounded-xl
              px-6
              py-2
              font-medium
              hover:bg-red-50
              transition
            "
          >
            اغلاق يوم كامل
          </button>

          <div className="flex items-center gap-8">
            <button
              className="
                w-10
                h-10
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
              "
            >
              <ChevronRight size={18} />
            </button>

            <div className="text-center">
              <h2 className="font-semibold text-lg">
                18 - 12 مارس 2026
              </h2>

              <p className="text-gray-500">
                هذا الاسبوع
              </p>
            </div>

            <button
              className="
                w-10
                h-10
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
              "
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* add modal */}
        <AddAppointmentModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleConfirmAppointment}
        />

        {/* done popup */}
        <DonePopup
          isOpen={showDonePopup}
          onClose={() => setShowDonePopup(false)}
          message="تم اضافه موعد بنجاح"
          color="blue"
        />

        {/* table */}
        <div
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            border
            border-gray-200
          "
        >
          {/* days */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div></div>

            {days.map((day, index) => (
              <div
                key={index}
                className={`
                  text-center
                  py-4
                  border-r
                  border-gray-200
                  font-semibold
                  ${day.active ? "bg-[#eef2ff]" : ""}
                `}
              >
                <p>{day.name}</p>

                <p className="text-sm text-gray-600">
                  {day.date}
                </p>
              </div>
            ))}
          </div>

          {/* rows */}
          {timeSlots.map((time, rowIndex) => (
            <div
              key={rowIndex}
              className="
                grid
                grid-cols-8
                min-h-27.5
                border-b
                border-gray-200
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  text-sm
                  text-gray-700
                  border-l
                  border-gray-200
                "
              >
                {time}
              </div>

              {days.map((day, colIndex) => {
                const item =
                  appointments[
                    `${rowIndex}-${colIndex}`
                  ];

                return (
                  <div
                    key={colIndex}
                    className={`
                      p-2
                      border-r
                      border-gray-200
                      ${day.active ? "bg-[#eef2ff]" : ""}
                    `}
                  >
                    {item && (
                      <AppointmentCard item={item} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}