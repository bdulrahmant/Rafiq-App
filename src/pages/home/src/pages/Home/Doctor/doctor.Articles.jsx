import { useState } from "react";
import { articlesData } from "../../../utils/articlesData.js";
import {
  Trash2,
  Pencil,
  Send,
  Eye,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function Articles() {
  const [filter, setFilter] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // 🔹 Stats
  const publishedCount = articlesData.filter(
    (a) => a.status === "منشور"
  ).length;

  const draftCount = articlesData.filter(
    (a) => a.status === "مسودة"
  ).length;

  // 🔹 Filter
  const filteredArticles =
    filter === "الكل"
      ? articlesData
      : articlesData.filter((a) => a.status === filter);

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="border border-blue-500 text-blue-500 hover:bg-blue-500  hover:text-white px-4 py-2 rounded-full cursor-pointer">
          + إضافة مقال
        </button>

        <div className="text-right">
          <h1 className="text-2xl font-bold text-blue-500">
            المقالات الطبية
          </h1>
          <p className="text-gray-500 text-sm">
            إدارة وتحرير المحتوى الطبي الخاص بك
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 ">
        <StatCard title="قراءات الشهر" value="1,240" icon={<Eye size={18} />} color="blue" />
        <StatCard title="مسودات" value={draftCount} icon={<FileText size={18} />} color="yellow" />
        <StatCard title="مقالات منشورة" value={publishedCount} icon={<CheckCircle size={18} />} color="green" />
      </div>

      {/* Filter */}
      <div className="flex justify-end gap-2 mb-4 cursor-po">
        {["الكل", "منشور", "مسودة"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-full border cursor-pointer ${
              filter === f
                ? "bg-blue-500 text-white"
                : "text-blue-500 border-blue-500"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 text-right bg-gray-50 p-4 text-gray-500 text-sm">
          <span>الإجراءات</span>
          <span>الحالة</span>
          <span>التاريخ</span>
          <span>العنوان</span>
          <span>صورة</span>
        </div>

        {/* Rows */}
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article) => (
            <div
              key={article.id}
              className="grid grid-cols-5 items-center text-right p-4 border-t hover:bg-gray-50 transition"
            >
              {/* Actions */}
              <div className="flex justify-center gap-2">
                <button className="bg-red-100 text-red-500 p-2 rounded-full">
                  <Trash2 size={16} />
                </button>

                <button className="bg-blue-100 text-blue-500 p-2 rounded-full">
                  <Pencil size={16} />
                </button>

                <button className="bg-green-100 text-green-500 p-2 rounded-full">
                  <Send size={16} />
                </button>
              </div>

              {/* Status */}
              <span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    article.status === "منشور"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {article.status}
                </span>
              </span>

              {/* Date */}
              <span className="text-gray-600">{article.date}</span>

              {/* Title */}
              <span className="font-medium">{article.title}</span>

              {/* Image */}
              <img
                src = {article.image}
                
                className="w-12 h-12 rounded-lg object-cover justify-self-end"
              />
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            لا توجد مقالات
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-100 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          السابق
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg border cursor-pointer ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "text-blue-500"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-100 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          التالي
        </button>
      </div>
    </div>
  );
}

// 🔹 Stat Card Component
function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-500",
    yellow: "bg-yellow-100 text-yellow-500",
    green: "bg-green-100 text-green-500",
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md 
    flex flex-row-reverse items-center gap-5
    transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Icon (يمين) */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>

      {/* Text جنبها */}
      <div className="text-right">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>

    </div>
  );
}