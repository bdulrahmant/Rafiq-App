import { useState } from "react";
import { patients } from '../../../utils/Patients.data.js';
import searchh from '../../../assets/images/Home/Doctor/icon/search.png'

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

// filter
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  //  pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6 text-right">
        <h1 className="text-3xl mb-0.5 font-bold text-blue-600">المرضى</h1>
        <p className="text-gray-500 font-bold text-sm">
              عدد المرضى: {filteredPatients.length}
          </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 flex justify-between items-center">
        <div className="flex gap-3">
          <button className="bg-gray-100 px-4 py-2 rounded-full text-sm">
            آخر زيارة: الكل
          </button>

          <button className="bg-gray-100 px-4 py-2 rounded-full text-sm">
            الحالة: نشط
          </button>
        </div>

       <div className="relative w-64">

  <input
    type="text"
    placeholder="البحث عن مريض"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    className="w-full font-bold bg-gray-100 pr-10 pl-4 py-3 rounded-full text-sm outline-none text-right placeholder:text-right"
  />

  {/* أيقونة البحث */}
  <span className="absolute right-3 top-1/2 -translate-y-1/2">
  <img src={searchh} alt="search" className="w-6 h-6 opacity-60" />
</span>

</div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-5 font-bold bg-gray-50 text-gray-500 text-sm text-right p-5">
          <div>الإجراءات</div>
          <div>الحالة</div>
          <div>عدد الزيارات</div>
          <div>آخر موعد</div>
          <div>اسم المريض</div>
        </div>

        {/* Rows */}
        {currentPatients.map((patient) => (
          <div
            key={patient.id}
            className="grid grid-cols-5 items-center text-right p-3 border-t hover:bg-gray-50 transition"
          >

            <div className="text-blue-500 cursor-pointer hover:underline">
              فتح الملف
            </div>

            <div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                {patient.status}
              </span>
            </div>

            <div>{patient.visits} زيارات</div>

            <div>{patient.lastVisit}</div>

            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="font-semibold">{patient.name}</p>
                <p className="text-xs text-gray-400">ID: {patient.id}</p>
              </div>

              <img
                src={patient.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
 <div className="bg-white rounded-b-2xl shadow px-6 py-4 flex items-center justify-between">

  {/* النص (يمين) */}
  <p className="text-sm text-gray-500">
    عرض {filteredPatients.length === 0 ? 0 : startIndex + 1} إلى{" "}
    {Math.min(startIndex + itemsPerPage, filteredPatients.length)} من{" "}
    {filteredPatients.length} مريض
  </p>

  {/* الأزرار (شمال) */}
  <div className="flex items-center gap-2">

    {/* السابق */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      className="flex items-center gap-1 px-4 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>السابق</span>
      <span>›</span>
    </button>

    {/* التالي */}
    <button
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() =>
        setCurrentPage((p) => Math.min(p + 1, totalPages))
      }
      className="flex items-center gap-1 px-4 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>‹</span>
      <span>التالي</span>
    </button>

  </div>

</div>
    </div>
  );
}