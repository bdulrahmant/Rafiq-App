
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";

import DrTaha from "../../assets/Dr.taha.png";
import { getAppointments } from "../../api/appointments.api";

const USE_API = false; // 👈 غيرها true لما تربط بالباك

const mockAppointments = [
  {
    id: 1,
    doctor: "د. عبدالرحمن طه",
    title: "أخصائي أنف وأذن",
    date: "الأحد , 10 ديسمبر 2025",
    time: "10 صباحا",
    location: "القاهرة – مدينة نصر",
    image: DrTaha,
  },
];

const AppointmentsSection = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (USE_API) {
          const data = await getAppointments();

          setAppointments(data);
        } else {
          // 👇 mock data
          setAppointments(mockAppointments);
        }
      } catch (err) {
        console.error(err);

        // fallback
        setAppointments(mockAppointments);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      // 👇 هنا بعدين هنربط delete API

      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/appointments/edit/${id}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        جاري التحميل...
      </p>
    );
  }

  return (
    <section className="w-full px-[100px] py-[32px] mb-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-[32px]">

        <h3 className="text-[28px] font-changa font-semibold text-[#5B5B5B]">
          مواعيدي القادمة
        </h3>

        <button
          onClick={() => navigate("/my-bookings")}
          className="text-[#468EEC] font-semibold hover:underline"
        >
          عرض الكل
        </button>

      </div>

      {/* EMPTY STATE */}
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          لا توجد مواعيد حالياً
        </p>
      ) : (
        appointments.map((apt) => (
          <div
            key={apt.id}
            className="w-full px-[100px] py-[32px] rounded-[16px] flex justify-between items-center mb-4 flex-row-reverse"
            style={{
              background:
                "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)",
            }}
          >

            {/* BUTTONS */}
            <div className="flex flex-col gap-4 w-[142px]">

              <button
                onClick={() => handleEdit(apt.id)}
                className="h-[42px] bg-white border border-[#468EEC] rounded-[8px] text-[#468EEC] font-semibold"
              >
                تعديل
              </button>

              <button
                onClick={() => handleCancel(apt.id)}
                className="h-[42px] bg-red-500 rounded-[8px] text-white font-semibold"
              >
                الغاء
              </button>

            </div>

            {/* INFO */}
            <div className="flex items-center gap-6">

              <img
                src={apt.image}
                alt={apt.doctor}
                className="w-[84px] h-[84px] rounded-full object-cover"
              />

              <div className="flex flex-col items-end text-right gap-4">

                {/* NAME + TITLE */}
                <div className="flex flex-col items-end gap-2">

                  <p className="text-[18px] font-semibold text-white">
                    {apt.doctor}
                  </p>

                  <p className="text-[20px] font-bold text-white">
                    {apt.title}
                  </p>

                </div>

                {/* DATE + TIME */}
                <div className="flex items-center gap-4">

                  <div className="flex items-center gap-1">

                    <span className="text-[20px] text-white font-semibold">
                      {apt.time}
                    </span>

                    <Clock
                      size={18}
                      className="text-white"
                    />

                  </div>

                  <div className="flex items-center gap-1">

                    <span className="text-[20px] text-white font-semibold">
                      {apt.date}
                    </span>

                    <Calendar
                      size={18}
                      className="text-white"
                    />

                  </div>

                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-1">

                  <span className="text-[20px] text-white font-semibold">
                    {apt.location}
                  </span>

                  <MapPin
                    size={18}
                    className="text-white"
                  />

                </div>

              </div>

            </div>

          </div>
        ))
      )}
    </section>
  );
};

export default AppointmentsSection;