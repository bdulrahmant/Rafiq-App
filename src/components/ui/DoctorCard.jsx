

import { MapPin, Star, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "./button";

export default function DoctorCard({
  // id,
  name,
  specialty,
  rating,
  reviews,
  location,
  price,
  image,
  available = true,
}) {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] py-4 flex flex-col items-center gap-3">

      {/* TOP */}
      <div className="w-full px-[33px] flex items-center justify-start gap-4">

        {/* IMAGE */}
        <img
          src={image}
          alt={name}
          className="w-[84px] h-[84px] rounded-full object-cover"
        />

        {/* TEXT */}
        <div className="flex flex-col items-start text-left gap-2">

          <p className="text-[18px] font-semibold text-[#121212]">
            {name}
          </p>

          <p className="text-[20px] font-bold text-[#468EEC]">
            {specialty}
          </p>

        </div>

      </div>

      {/* RATING */}
      <div className="flex items-center gap-1">

        <span className="text-[18px] font-semibold text-[#121212]">
          {rating} ({reviews} مراجعة)
        </span>

        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

      </div>

      {/* LOCATION + PRICE */}
      <div className="w-full px-[33px] flex items-center justify-between">

        {/* LOCATION */}
        <div className="flex items-center gap-1">

          <MapPin className="w-5 h-5 text-[#468EEC]" />

          <span className="text-[18px] font-semibold text-[#121212]">
            {location}
          </span>

        </div>

        {/* PRICE */}
        <div className="flex items-center gap-1">

          <Wallet className="w-5 h-5 text-[#468EEC]" />

          <span className="text-[20px] font-bold text-[#121212]">
            {price}
          </span>

        </div>

      </div>

      {/* BUTTON */}
      <div className="w-full px-4">

        <Button
          variant="primary"
          size="md"
          disabled={!available}
          // onClick={() => navigate(`/doctor/${id}`)}
          onClick={() => navigate(`/listing`)}
          className={`w-full h-[42px] rounded-[8px] font-semibold transition ${
            available
              ? "bg-[#468EEC] hover:bg-blue-600 text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {available ? "احجز الآن" : "غير متاح"}
        </Button>

      </div>

    </div>
  );
}