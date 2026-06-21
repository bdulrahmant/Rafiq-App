export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 
          transition-all duration-300 
          hover:-translate-y-1 hover:shadow-xl "
        >

          <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
            <img src={stat.icon} className="w-6 h-6 opacity-80" />
          </div>

          <div className="text-right flex-1">
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <h2 className="text-xl font-bold">{stat.value}</h2>
          </div>

        </div>
      ))}

    </div>
  );
}