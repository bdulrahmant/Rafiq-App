import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import Footer from "../../components/layout/Footer";
import DoctorCardListing from "../../components/ui/DoctorCardLisiting.jsx";
import { getDoctorsForListing } from "../../api/doctors.api";
import { mapDoctorListing } from "../../utils/bookingMappers";

const normalizeDoctorsList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export default function Listing() {
  const navigate = useNavigate();

  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("nearest");


useEffect(() => {
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setDoctorsData([]);
        setError("auth"); 
        setLoading(false);
        return; 
      }

      const data = await getDoctorsForListing(search.trim());
      const normalized = normalizeDoctorsList(data);
      
      setDoctorsData(normalized.map(mapDoctorListing));
      setVisibleCount(2);
    } catch (err) {
      console.error("❌ خطأ في جلب الأطباء:", err);
      setDoctorsData([]);

      if (err.response?.status === 401) {
        setError("auth");
      } else {
        setError("fetch");
      }
    } finally {
      setLoading(false);
    }
  };

  const timer = setTimeout(fetchDoctors, 400);
  return () => clearTimeout(timer);
}, [search]);

  const filteredDoctors = useMemo(() => {
    let result = [...doctorsData];

    if (filter === "top") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (filter === "price") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    if (filter === "available") {
      result = result.filter((doc) => doc.available || doc.hasAvailableSlots);
    }

    return result;
  }, [doctorsData, filter]);

  const showMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-cairo">
      <UserNavbar showAuthButtons={false} />

      <div className="px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setFilter("nearest")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium ${
              filter === "nearest" ? "bg-blue-500 text-white" : "bg-white border text-gray-600"
            }`}
          >
            الأقرب
          </button>

          <button
            onClick={() => setFilter("top")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium ${
              filter === "top" ? "bg-blue-500 text-white" : "bg-white border text-gray-600"
            }`}
          >
            الأعلى تقييماً
          </button>

          <button
            onClick={() => setFilter("price")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium ${
              filter === "price" ? "bg-blue-500 text-white" : "bg-white border text-gray-600"
            }`}
          >
            السعر
          </button>

          <button
            onClick={() => setFilter("available")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium ${
              filter === "available" ? "bg-blue-500 text-white" : "bg-white border text-gray-600"
            }`}
          >
            المتاح اليوم
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <i className="fa-solid fa-magnifying-glass absolute right-4 top-3.5 text-blue-400"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بـ اسم طبيب او تخصص"
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Doctors List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-gray-500 py-8">جاري التحميل...</p>
          ) : error === "auth" ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-gray-500">انتهت صلاحية الجلسة، يجب تسجيل الدخول كمريض لعرض الأطباء</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
              >
                تسجيل الدخول
              </button>
            </div>
          ) : error === "fetch" ? (
            <p className="text-center text-gray-500 py-8">حدث خطأ أثناء تحميل الأطباء، حاول مرة أخرى</p>
          ) : filteredDoctors.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {filter === "available" ? "لا يوجد أطباء متاحين اليوم" : "لا يوجد أطباء متطابقين مع البحث"}
            </p>
          ) : (
            filteredDoctors
              .slice(0, visibleCount)
              .map((doctor) => <DoctorCardListing key={doctor.id} doctor={doctor} />)
          )}
        </div>

        {/* Load More */}
        {visibleCount < filteredDoctors.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={showMore}
              className="bg-white border border-blue-200 text-blue-500 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
            >
              عرض المزيد من الأطباء
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}