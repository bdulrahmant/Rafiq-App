import { useNavigate } from "react-router-dom";
import { FileText, SquarePen } from "lucide-react";
import { FilePenLine } from "lucide-react";
import vitmin from '../../../assets/images/Home/Doctor/img/vitamins.png'

export default function ArticlesSection() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "التغذية السليمة للأطفال",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    },
    {
      id: 2,
      title: "أهمية الفيتامينات في الشتاء",
      image: vitmin,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <div className="flex gap-2">
          <button className="border border-blue-400 text-blue-500 px-4 py-1 cursor-pointer rounded-xl text-md hover:bg-blue-50 transition">
            + إضافة مقال
          </button>

          <button
            onClick={() => navigate("/doctor/articles")}
            className="bg-blue-500 text-white px-4 py-1 rounded-xl cursor-pointer text-md hover:bg-blue-600 transition"
          >
            عرض مقالاتي
          </button>
        </div>

        <h2 className="font-bold text-lg flex items-center gap-2">
  المقالات الطبية
  <FileText className='text-blue-600' size={20} strokeWidth={1.8} />
</h2>
      </div>

      <hr className="mb-4 text-gray-500 " />

      {/* Stats */}
      <div className="bg-gray-100 rounded-2xl p-4 flex justify-between text-center mb-4">

        <div className="flex-1">
          <p className="text-gray-500 text-sm">مقالات منشورة</p>
          <p className="font-bold text-lg">12</p>
        </div>

        <div className="w-px bg-gray-300 mx-4"></div>

        <div className="flex-1">
          <p className="text-gray-500 text-sm">قراءات الشهر</p>
          <p className="font-bold text-lg">1205</p>
        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">

        {articles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-500 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition"
          >

            {/* Text */}
            <div className="text-right">
              <p className="font-medium mb-2">
                {article.title}
              </p>

              <button
  onClick={() => navigate(`/doctor/articles/${article.id}`)}
  className="text-blue-500 text-sm flex items-center gap-1 hover:underline"
>
  تعديل
  <SquarePen size={16} />
</button>
            </div>

            {/* Image */}
            <img
              src={article.image}
              className="w-16 h-16 rounded-xl object-cover"
            />

          </div>
        ))}

      </div>

    </div>
  );
}