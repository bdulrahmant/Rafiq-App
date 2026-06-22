import {
  Search,
  MapPin,
  Clock,
  Stethoscope,
  Baby,
  Heart,
  Eye,
  Activity,
  HandMetal,
  Users,
} from "lucide-react";
import drTaha from "../../assets/Dr.taha.png";
import drMalek from "../../assets/Dr.Malek.png";
import drAhmed from "../../assets/Dr.Ahmed.png";
import rafiqHeart from "../../assets/rafiq-heart.png";
import Doctors from "../../assets/Doctors.png";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
// import { Button } from "../../components/ui/button";
import DoctorCard from "../../components/ui/DoctorCard";
import SpecialtyBadge from "../../components/ui/SpecialtyBadge";
import FAQItem from "../../components/ui/FAQItem";

// import { useNavigate } from "react-router-dom";




export default function Landing() {
  // const navigate = useNavigate();


  const doctors = [
    {
      id: 1,
      name: "د. عبدالرحمن طه",
      specialty: "أخصائي أنف وأذن",
      rating: 4.8,
      reviews: 210,
      location: "القاهرة – مدينة نصر",
      price: "200 جنيه",
      image: drTaha,
    },
    {
      id: 2,
      name: "د. مالك محمد حماد",
      specialty: "أخصائي عظام",
      rating: 4.9,
      reviews: 320,
      location: "طنطا – أول شارع البحر",
      price: "150 جنيه",
      image: drMalek,
    },
    {
      id: 3,
      name: "د. أحمد علي",
      specialty: "أخصائي أسنان",
      rating: 4.7,
      reviews: 180,
      location: "المنصورة – شارع الجمهورية",
      price: "120 جنيه",
      image: drAhmed,
    },
  ];


  const specialties = [
    { icon: <Activity />, label: "باطنة" },
    { icon: <Stethoscope />, label: "أسنان" },
    { icon: <Baby />, label: "أطفال" },
    { icon: <Heart />, label: "قلب" },
    { icon: <Users />, label: "أنف وأذن" },
    { icon: <Eye />, label: "رمد" },
    { icon: <Users />, label: "نساء وتوليد" },
    {
      icon: <HandMetal />,
      label: "جلدية",
      href:
        "https://www.figma.com/design/e8D4AKIrGCyGL3yDPdLru2/Untitled?node-id=40-10008&t=XrqsbZO6Bmz70g7q-4",
    },
  ];

  const faqs = [
    {
      question: "ما هي تكلفة استخدام منصة رفيق؟",
      answer:
        "الخدمة مجانية تمامًا للمستخدم، وقد تختلف أسعار الكشف حسب كل طبيب.",
    },
    {
      question: "هل يمكن تعديل أو إلغاء موعد الحجز؟",
      answer:
        "نعم، يمكنك تعديل أو إلغاء موعدك من خلال حسابك على المنصة.",
    },
    {
      question: "هل الأطباء موثوقون؟",
      answer:
        "جميع الأطباء على المنصة معتمدون ومرخصون من وزارة الصحة.",
    },
    {
      question: "كيف يحدد رفيق التخصص المناسب؟",
      answer:
        "من خلال الذكاء الاصطناعي المتقدم الذي يحلل أعراضك ويوجهك للتخصص المناسب.",
    },
    {
      question: "هل أحتاج لتثبيت تطبيق؟",
      answer:
        "لا، يمكنك استخدام المنصة مباشرة من خلال المتصفح.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFF]">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">

        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#468EEC]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#1DA1F2]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="text-right space-y-8">
              <h1 className="font-changa text-7xl font-semibold text-[#468EEC] leading-tight">
                مرحبا بك في منصة رفيق
              </h1>

              <div className="space-y-6">
                <h2 className="font-changa text-5xl font-semibold text-[#121212]">
                  ابدأ رحلتك الصحية بسهولة
                </h2>
                <p className="text-xl font-cairo text-gray-600 leading-relaxed">
                  منصّة رفيق تسهّل عليك حجز مواعيد الأطباء في أي وقت وبخطوات بسيطة.
                  وبوت ذكي يساعدك تفهم أعراضك ويختار لك التخصص المناسب بسرعة.
                </p>
              </div>

              <div className="flex gap-10">
                <button variant="primary" size="lg" className="px-12">
                  احجز الموعد
                </button>
                <button variant="outline" size="lg" className="px-12">
                  تصفح الاطباء
                </button>
              </div>
            </div>

            <div className="relative h-[500px]">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[380px] z-20">
                <img
                  src={drTaha}
                  className="w-full object-cover"
                />

                {/* Fade effect */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F7FBFF] to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* rafiq */}
      <section
        id="assistant"
        className="w-full py-20 px-6 md:px-12 lg:px-20"
        style={{
          background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* rafiq IMAGE */}
          <div className="w-[260px] md:w-[340px] lg:w-[400px]">
            <img
              src={rafiqHeart}
              alt="rafiq"
              className="w-full object-contain"
            />
          </div>

          {/*  TEXT */}
          <div className="text-white text-right max-w-xl">

            <h2 className="text-3xl md:text-5xl font-changa font-bold leading-[1.4] mb-6">
              اعرف حالتك... خطوة<br />
              بخطوة مع رفيقك الصحي
            </h2>

            <p className="text-sm md:text-base font-cairo leading-7 opacity-90 mb-8">
              منصة رفيق تسهّل عليك حجز مواعيد الأطباء في أي وقت وبخطوات بسيطة، وبوت ذكي يساعدك
              رفيقك الصحي هيساعدك تفهم الأعراض اللي بتحس بيها، ويعرّفك التخصص المناسب لحالتك،
              ويقدّم لك إرشادات أولية تساعدك تاخد القرار الصح.
            </p>

            <div className="flex gap-4 justify-end flex-wrap">

              <button className="bg-[#5C8DF6] hover:opacity-90 text-white px-6 py-3 rounded-lg font-cairo">
                ابدأ التجربة الآن
              </button>

              <button className="bg-white text-[#468EEC] px-6 py-3 rounded-lg font-cairo border">
                كيف يعمل رفيقك الصحي؟
              </button>

            </div>
          </div>

        </div>
      </section>




      {/* Booking */}
      <section id="booking" className="py-20">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="font-changa text-6xl font-semibold text-[#468EEC] mb-4">
              احجز موعد مع طبيبك
            </h2>
            <p className="text-xl font-cairo text-gray-600">
              ابحث عن التخصص أو الطبيب وحدد الوقت المناسب لك
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                <Stethoscope className="w-6 h-6 text-[#468EEC]" />
                <span className="font-cairo text-gray-600">التخصص</span>
              </div>

              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                <MapPin className="w-6 h-6 text-[#468EEC]" />
                <span className="font-cairo text-gray-600">المكان</span>
              </div>

              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                <Clock className="w-6 h-6 text-[#468EEC]" />
                <span className="font-cairo text-gray-600">الوقت</span>
              </div>

            </div>

            <button variant="primary" size="lg" className="w-full">
              <Search className="w-5 h-5" />
              البحث
            </button>

          </div>
        </div>
      </section>


      {/* Popular Doctors */}
      <section
        dir="rtl"
        className="w-full px-[100px] py-[32px] bg-[#F7FBFF] rounded-[16px] mb-12"
      >

        {/* HEADER */}
        {/* <div
          dir="rtl"
          className="flex justify-between items-center mb-[40px]"
        >

          <h3 className="text-[28px] font-changa font-semibold text-[#5B5B5B] text-right">
            الأطباء الأكثر شهرة
          </h3>

          <button
            onClick={() => navigate("/login")}
            className="text-[#468EEC] text-sm font-semibold hover:underline"
          >
            عرض الكل
          </button>

        </div> */}
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="font-changa text-6xl font-semibold text-[#468EEC] mb-4">
            الأطباء الأكثر شهرة
            </h2>
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

      {/* Specialties */}
      <section id="specialties" className="py-20 bg-white">
        <div className="container mx-auto px-4">

          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="font-changa text-6xl font-semibold text-[#468EEC] mb-4">
              اختر التخصص الطبي
            </h2>
            <p className="text-xl font-cairo text-gray-600">
              اختر التخصص للوصول لأفضل الأطباء في مجالك
            </p>
          </div>

          {/* 🔍 Search Bar */}
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-[726px] relative">

              <input
                type="text"
                placeholder="البحث"
                className="w-full h-[58px] pr-12 pl-4 border border-[#468EEC] rounded-[16px] outline-none font-cairo text-right"
              />

              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#468EEC]" />

            </div>
          </div>

          {/* Specialties Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">

            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="w-[292px] h-[187px] bg-white border border-[#468EEC] rounded-[24px] flex flex-col items-center justify-center gap-4 hover:shadow-md transition"
              >

                {/* Icon */}
                <div className="text-[#468EEC] text-5xl">
                  {specialty.icon}
                </div>

                {/* Text */}
                <p className="font-changa text-[32px] font-semibold text-[#468EEC] text-center">
                  {specialty.label}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>




      {/*  CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">

          <div
            className="w-full rounded-[24px] px-[40px] md:px-[73px] py-[37px] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg"
            style={{
              background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.25)"
            }}
          >

            {/*  IMAGE */}
            <div className="w-[250px] md:w-[320px]">
              <img
                src={rafiqHeart}
                alt="rafiq"
                className="w-full object-contain drop-shadow-lg"
              />
            </div>

            {/* 🧠 TEXT */}
            <div className="text-white text-right max-w-xl">

              <h2 className="font-changa text-3xl md:text-5xl font-semibold leading-[1.4] mb-6">
                مش عارف تختار التخصص؟<br />
                رفيق يساعدك!
              </h2>

              <p className="font-cairo text-sm md:text-base opacity-90 mb-8">
                احكي لرفيق أعراضك، وهو يرشح لك التخصص المناسب
              </p>

              <button className="bg-white text-[#468EEC] px-6 py-3 rounded-lg font-cairo hover:opacity-90 transition">
                ابدأ التشخيص المبدئي
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="font-changa text-6xl font-semibold text-[#468EEC] mb-4">
              أسئلة شائعة
            </h2>
            <p className="text-xl font-cairo text-gray-600">
              إجابات لأهم الأسئلة التي قد تحتاج معرفتها قبل استخدام منصة رفيق.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
