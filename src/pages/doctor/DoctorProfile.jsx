import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";

import { getDoctorDetails } from "../../api/doctors.api";
import { mapDoctorProfile } from "../../utils/bookingMappers";

const DEFAULT_SCHEDULE = [
  { dayName: "السبت", timeRange: "10:00 ص - 4:00 م", isClosed: false },
  { dayName: "الأحد", timeRange: "10:00 ص - 4:00 م", isClosed: false },
  { dayName: "الاثنين", timeRange: "10:00 ص - 4:00 م", isClosed: false },
  { dayName: "الثلاثاء", timeRange: "10:00 ص - 4:00 م", isClosed: false },
  { dayName: "الأربعاء", timeRange: "10:00 ص - 4:00 م", isClosed: false },
  { dayName: "الخميس والجمعة", timeRange: "مغلق", isClosed: true },
];

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllSchedule, setShowAllSchedule] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const data = await getDoctorDetails(id);
        setDoctor(mapDoctorProfile(data));
      } catch (error) {
        console.log(error);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 font-cairo">
        <UserNavbar showAuthButtons={false} />
        <p className="text-center py-20 text-gray-500">جاري التحميل...</p>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Doctor Not Found
      </div>
    );
  }

  const schedule =
    doctor.weeklySchedule.length > 0
      ? doctor.weeklySchedule
      : DEFAULT_SCHEDULE;


  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-cairo">
      <UserNavbar showAuthButtons={false} />

      <div className="py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
            <div className="absolute top-6 left-6 bg-[#E6FBF3] text-[#1BC5A3] px-3 py-1 rounded-full text-xs font-semibold">
              متوفر الآن
            </div>

            <div className="flex items-start gap-5">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-28 h-28 rounded-full object-cover"
              />

              <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900">
                  {doctor.name}
                </h1>

                <p className="text-[#3B82F6] font-semibold text-base mt-1">
                  {doctor.specialty}
                </p>

                <div className="flex items-center gap-1 mt-2 text-sm">
                  <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                  <span className="font-semibold text-gray-800">
                    {doctor.rating}
                  </span>
                  <span className="text-gray-400">
                    ({doctor.reviews} مراجعة)
                  </span>
                </div>

                <div className="flex flex-row gap-7 mt-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-[#3B82F6] text-xs"></i>
                    <span>{doctor.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-wallet text-[#3B82F6] text-xs"></i>
                    <span>{doctor.price} جنيه</span>
                  </div>

                  <div className="flex items-center gap-1 mr-auto">
                    <span className="text-[#3B82F6] font-semibold">
                      {doctor.experience}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${doctor.id}`)}
              className="w-full mt-5 bg-[#3B82F6] hover:bg-blue-600 text-white py-3 rounded-xl font-[Cairo] text-sm flex items-center justify-center gap-2 transition"
            >
              <i className="fa-regular fa-calendar-check"></i>
              احجز الآن
            </button>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 font-[Cairo]"
            dir="rtl"
          >
            <div className="md:col-span-2 space-y-6 order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold mb-3 text-gray-800 flex items-center gap-2">
                  <i className="fa-regular fa-user text-[#3B82F6]"></i>
                  نبذة عن الطبيب
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {doctor.about}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <i className="fa-solid fa-hand-holding-medical text-[#3B82F6]"></i>
                  الخدمات
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {doctor.services.map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white text-xs">
                        +
                      </div>

                      <span className="text-sm font-semibold text-gray-700">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <i className="fa-regular fa-comment-dots text-blue-500"></i>
                  آراء المرضى
                </h3>

                <div className="space-y-4">
                  {doctor.reviews_list.length > 0 ? (
                    doctor.reviews_list.map((review, r) => (
                      <div key={r} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

                          <div>
                            <h4 className="text-sm font-bold">
                              {review.patientName || "مريض"}
                            </h4>

                            <div className="flex text-yellow-400 text-xs">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">
                          {review.comment || review.text || "تقييم إيجابي"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 text-sm py-4">
                      لا توجد مراجعات حالياً
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <i className="fa-regular fa-clock text-blue-500"></i>
                  مواعيد العمل
                </h3>

                <div className="space-y-3 text-sm">
                  {/* {schedule.map((slot, index) => ( */}
                  {(showAllSchedule
                    ? schedule
                    : schedule.slice(0, 5)
                  ).map((slot, index) => (
                    <div
                      key={`${slot.dayName}-${index}`}
                      className="flex justify-between border-b border-gray-100 pb-2"
                    >
                      <span className="text-gray-600">{slot.dayName}</span>

                      <span
                        className={`font-medium ${slot.isClosed
                          ? "text-red-500"
                          : "text-[#3B82F6]"
                          }`}
                      >
                        {slot.timeRange}
                      </span>
                    </div>
                  ))}
                  {schedule.length > 5 && (
                    <button
                      onClick={() => setShowAllSchedule(!showAllSchedule)}
                      className="w-full mt-3 text-[#3B82F6] font-semibold text-sm hover:text-blue-700 transition"
                    >
                      {showAllSchedule ? "عرض أقل" : "عرض المزيد"}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <i className="fa-solid fa-briefcase text-blue-500"></i>
                  الملفات المهنية
                </h3>

                <div className="space-y-3">
                  {[
                    "شهادة التخصص",
                    "ترخيص مزاولة المهنة",
                    "صور العيادة",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                    >
                      <span className="text-sm">{item}</span>
                      <i className="fa-regular fa-eye text-gray-400"></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorProfile;
