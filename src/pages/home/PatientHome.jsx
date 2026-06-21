import React from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Clock,
  FileText,
  Upload,
  Heart,
  Stethoscope,
  Baby,
  Activity,
  Pill,
  User
} from 'lucide-react';
import { useState } from "react";
import Navbar from "../../components/layout/UserNavbar";
import Footer from '../../components/layout/Footer';
import DoctorCard from '../../components/ui/DoctorCard';
import AppointmentsSection from "../../components/ui/AppointmentsSection";
import MedicalFilesSection from "../../components/ui/MedicalFilesSection"; import { Button } from "../../components/ui/button";
import rafiqHeartRobot from "../../assets/rafiq-heart.png";

import DrTaha from "../../assets/Dr.taha.png";
import DrMalek from "../../assets/Dr.Malek.png";
import DrAhmed from "../../assets/Dr.Ahmed.png";
import article1 from "../../assets/article1.png";
import article2 from "../../assets/article2.png";
import article3 from "../../assets/article3.png";




// Mock Data
const specialties = [
  { id: 1, name: 'باطنة', icon: Stethoscope, color: 'bg-blue-100 text-blue-600', borderColor: 'border-blue-100', hoverBg: 'hover:bg-blue-100' },
  { id: 2, name: 'أطفال', icon: Baby, color: 'bg-green-100 text-green-600', borderColor: 'border-green-100', hoverBg: 'hover:bg-green-100' },
  { id: 3, name: 'جلدية', icon: Activity, color: 'bg-purple-100 text-purple-600', borderColor: 'border-purple-100', hoverBg: 'hover:bg-purple-100' },
  { id: 4, name: 'نساء وتوليد', icon: User, color: 'bg-pink-100 text-pink-600', borderColor: 'border-pink-100', hoverBg: 'hover:bg-pink-100' },
  { id: 5, name: 'قلب', icon: Heart, color: 'bg-red-100 text-red-600', borderColor: 'border-red-100', hoverBg: 'hover:bg-red-100' },
];


const doctors = [
  {
    id: 1,
    name: "د. عبدالرحمن طه",
    specialty: "أخصائي أنف وأذن",
    rating: 4.8,
    reviews: 210,
    location: "القاهرة – مدينة نصر",
    price: "200 جنيه",
    image: DrTaha,
  },
  {
    id: 2,
    name: "د. مالك محمد حماد",
    specialty: "أخصائي عظام",
    rating: 4.9,
    reviews: 320,
    location: "طنطا – أول شارع البحر",
    price: "150 جنيه",
    image: DrMalek,
  },
  {
    id: 3,
    name: "د. أحمد علي",
    specialty: "أخصائي أسنان",
    rating: 4.7,
    reviews: 180,
    location: "المنصورة – شارع الجمهورية",
    price: "120 جنيه",
    image: DrAhmed,
  },
];


const articles = [
  {
    id: 1,
    title: 'نصائح للحفاظ على صحة القلب',
    excerpt: 'اكتشف أهم الطرق للحفاظ على صحة قلبك وتجنب الأمراض القلبية',
    image: article1,
    time: 'منذ يومين'
  },
  {
    id: 2,
    title: 'التغذية السليمة للأطفال',
    excerpt: 'دليلك الشامل لتغذية طفلك بشكل صحي ومتوازن',
    image: article2,
    time: 'منذ 3 ايام'
  },
  {
    id: 3,
    title: 'إدارة مرض السكري',
    excerpt: 'كيفية إدارة مرض السكري بطريقة صحيحة والحفاظ على مستوى السكر في الدم',
    image: article3,
    time: 'منذ 5 ايام'
  }
];

const PatientHome = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-cairo">
      {/* Header */}
      <Navbar showAuthButtons={false} />

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/edit-profile")}
            className="text-sm font-semibold text-[#468EEC] hover:underline"
          >
            تعديل الملف الشخصي
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="w-full"
        style={{
          background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)",
          boxShadow: "0px 8px 4px rgba(0,0,0,0.25)",
        }}
      >
        <div className="container mx-auto px-[73px] py-[37px] flex flex-row-reverse items-center justify-between gap-[76px]">

          {/* LEFT SIDE (LOGO + IMAGE) */}
          <div className="flex flex-col items-center gap-1 w-[500px]">


            {/* Main Image */}
            <img
              src={rafiqHeartRobot}
              alt="robot"
              className="w-[500px] h-[500px] object-contain drop-shadow-[0px_8px_4px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end text-right gap-8 w-[454px]">

            {/* TEXT */}
            <div className="flex flex-col gap-2 w-full">

              <h2 className="text-[#F5F5F5] text-[48px] font-changa font-bold leading-[57.6px]">
                رعاية صحية ذكية في متناول يدك
              </h2>

              <p className="text-[#F5F5F5] text-[18px] font-semibold leading-[27px]">
                ابحث عن طبيب أو تخصص
              </p>
            </div>

            {/* SEARCH + BUTTON */}
            <div className="flex flex-col items-center gap-10 w-full">

              {/* SEARCH INPUT */}
              <div className="w-[422px] h-[60px] px-4 flex items-center justify-between border border-[#F5F5F5] rounded-[16px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">

                {/* LEFT ICON */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <Search className="text-white" size={18} />
                </div>

                {/* INPUT */}
                <input
                  type="text"
                  placeholder="البحث"
                  className="flex-1 bg-transparent text-white text-right outline-none placeholder-white"
                />

                {/* RIGHT ICON */}
                <Search className="text-white" size={20} />
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate("/chatbot")}
                className="w-[180px] h-[52px] bg-white rounded-[8px] border border-[#468EEC] flex items-center justify-center text-[#468EEC] font-semibold"
              >
                ابدأ التشخيص المبدئي
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="w-full px-[100px] py-[32px]">

        <div className="flex justify-between items-center mb-[40px]">

          <h3 className="text-[28px] font-changa font-semibold text-[#5B5B5B] text-right">
            التخصصات الشائعة
          </h3>

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#468EEC] text-sm font-semibold hover:underline"
          >
            {showAll ? "عرض أقل" : "عرض الكل"}
          </button>

        </div>

        <div className="flex flex-wrap gap-4 justify-start w-full">

          {(showAll ? specialties : specialties.slice(0, 3)).map((sp) => {
            const Icon = sp.icon;

            return (
              <button
                key={sp.id}
                className={`flex items-center gap-2 px-6 py-3 
          ${sp.color.split(' ')[0]} ${sp.color.split(' ')[1]} 
          rounded-full border ${sp.borderColor} ${sp.hoverBg} 
          transition-colors font-semibold`}
              >
                <Icon size={20} />
                <span>{sp.name}</span>
              </button>
            );
          })}

        </div>

      </section>

      {/* Suggested Doctors */}
      <section className="w-full px-[100px] py-[32px] bg-[#F7FBFF] rounded-[16px] mb-12">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-[40px]">

          <h3 className="text-[28px] font-changa font-semibold text-[#5B5B5B] text-right">
            أطباء مقترحون
          </h3>

          <button
            onClick={() => navigate("/listing")}
            className="text-[#468EEC] text-sm font-semibold hover:underline"
          >
            عرض الكل
          </button>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              rating={doctor.rating}
              reviews={doctor.reviews}
              location={doctor.location}
              price={doctor.price}
              image={doctor.image}
            />
          ))}

        </div>

      </section>



      {/* Upcoming Appointments */}

      <AppointmentsSection />


      {/* Medical Files */}
      <MedicalFilesSection />

      {/* Articles */}
      <section className="py-12 container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-changa font-bold text-gray-800">المقالات</h3>
          <a href="/articles" className="text-[#468EEC] text-sm hover:underline font-semibold">عرض الكل</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 line-clamp-1">{article.title}</h4>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <a href="/articles" className="text-[#468EEC] text-sm font-bold hover:underline">اقرأ المزيد</a>
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                    <Clock size={12} />
                    <span>{article.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default PatientHome;