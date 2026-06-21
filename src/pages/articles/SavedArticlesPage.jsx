
import { useEffect, useState } from "react";
import { Bookmark, Clock, ArrowLeft } from "lucide-react";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";

export default function SavedArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSavedArticles = async () => {
    const mockData = [
      {
        id: 1,
        title: "التغذية السليمة للأطفال",
        category: "تغذية",
        categoryColor: "bg-teal-100 text-teal-700",
        time: "منذ يومين",
        image:
          "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=120&h=100&fit=crop",
      },
      {
        id: 2,
        title: "إدارة مرض السكري",
        category: "نصائح عامة",
        categoryColor: "bg-blue-100 text-blue-700",
        time: "منذ يومين",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&h=100&fit=crop",
      },
    ];

    setTimeout(() => {
      setArticles(mockData);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FBFF] font-cairo flex flex-col text-[#121212]" dir="rtl">

      {/* Header */}
      <div className="w-full lg:w-[1000px] flex flex-col gap-3 shrink-0 ">
        <div className="container mx-auto flex justify-between max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">
              المقالات المحفوظة
            </h1>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-lg bg-[#468EEC] flex items-center justify-center  hover:bg-[#3A7AD9] transition-colors shrink-0"
              aria-label="رجوع"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col gap-4">

        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="w-full bg-white rounded-2xl shadow-sm flex items-center gap-4 px-4 py-3 hover:shadow-md transition"
            >

              {/* Image (يمين) */}
              <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="w-full h-full">
                <h3 className="font-bold text-base md:text-lg">
                  {article.title}
                </h3>

                <div className="flex items-center gap-2 flex-wrap justify-end">

                  <span
                    className={`px-3 py-0.5 rounded-md text-xs font-semibold ${article.categoryColor}`}
                  >
                    {article.category}
                  </span>

                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs md:text-sm">
                      {article.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bookmark (شمال) */}
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Bookmark className="text-[#468EEC] fill-[#468EEC] w-5 h-5" />
              </div>

            </div>
          ))
        )}

      </div>

      <Footer />
    </div>
  );
}