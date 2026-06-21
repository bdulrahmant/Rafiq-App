import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { transactions } from "../../../../utils/transactions.data.js"; // 

export default function Earnings() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // 🔍 filter + search
  const filteredTransactions = transactions.filter((t) => {
    const matchSearch =
      t.type.includes(search) ||
      t.amount.includes(search) ||
      t.status.includes(search);

    const transactionDate = new Date(t.date);
    const now = new Date();

    const isThisMonth =
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear();

    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());

    const isThisWeek = transactionDate >= startOfWeek;

    if (filter === "month") return matchSearch && isThisMonth;
    if (filter === "week") return matchSearch && isThisWeek;

    return matchSearch;
  });

  // 📊 stats
  const totalEarnings = filteredTransactions.reduce((acc, t) => {
    return acc + parseInt(t.amount);
  }, 0);

  const totalOperations = filteredTransactions.length;

  const lastTransaction = filteredTransactions[0]?.amount || "0 جنيه";

  const now = new Date();
  const monthlyEarnings = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((acc, t) => acc + parseInt(t.amount), 0);

  const stats = [
    { title: "آخر تحويل", value: lastTransaction },
    { title: "عدد العمليات", value: totalOperations + " عملية" },
    { title: "إجمالي الأرباح", value: totalEarnings + " جنيه" },
    { title: "أرباح الشهر", value: monthlyEarnings + " جنيه" },
  ];

  // 📄 pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 📅 format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusColors = {
    مكتمل: "bg-green-100 text-green-600",
    "تم التحويل": "bg-blue-100 text-blue-600",
    "قيد المراجعة": "bg-orange-100 text-orange-600",
    مرفوض: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-blue-50 min-h-screen">

      {/* 🔹 Header */}
      <div className="bg-white shadow-md p-2 mb-4">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end items-center gap-2">
          <span className="font-bold text-2xl">الدفع والأرباح</span>
          <Link to="/doctor/settings">
            <ArrowRight className="text-blue-500" size={26} />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* 🔹 Title */}
        <div className="text-right">
          <h2 className="text-2xl font-bold text-blue-600">الدفع والأرباح</h2>
          <p className="text-gray-400 text-sm">
            عرض وإدارة سجل المعاملات المالية والمستحقات
          </p>
        </div>

        {/* 🔹 Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm text-right transition-all duration-300 
              hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-gray-400 text-sm">{item.title}</p>
              <p className="font-bold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* 🔹 Table */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          {/* search + filters */}
          <div className="flex justify-between items-center mb-4">

            {/* search */}
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="ابحث في المعاملات..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 pr-10 border rounded-lg"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* filters */}
            <div className="flex gap-2">
              {[
                { label: "الكل", value: "all" },
                { label: "هذا الشهر", value: "month" },
                { label: "هذا الأسبوع", value: "week" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    setFilter(f.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1 rounded-full text-sm cursor-pointer ${
                    filter === f.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

          </div>

          {/* table */}
          <table className="w-full text-right">
            <thead className="text-gray-400 text-sm border-b">
              <tr>
                <th className="py-3">التاريخ</th>
                <th>نوع العملية</th>
                <th>المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.map((t) => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div>
                      <p>{formatDate(t.date)}</p>
                      <p className="text-xs text-gray-400">{t.time}</p>
                    </div>
                  </td>

                  <td>{t.type}</td>
                  <td>{t.amount}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColors[t.status]}`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* empty */}
          {paginatedTransactions.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              لا توجد نتائج
            </p>
          )}

          {/* pagination */}
          <div className="flex justify-center mt-4 gap-2">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-100 rounded cursor-pointer"
            >
              السابق
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  currentPage === p
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-100 rounded cursor-pointer"
            >
              التالي
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}