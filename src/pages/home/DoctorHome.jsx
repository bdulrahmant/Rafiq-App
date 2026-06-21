import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function DoctorHome() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-cairo" dir="rtl">
      <Navbar showAuthButtons={false} />
      
      <main className="grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-lg w-full">
          <h1 className="text-3xl font-changa font-bold text-[#468EEC] mb-4">
            لوحة تحكم الطبيب
          </h1>
          <p className="text-gray-600 text-lg">
            مرحباً بك في منصة رفيق. هذه الصفحة تحت الإنشاء وسيتم إضافة ميزات الطبيب قريباً.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
