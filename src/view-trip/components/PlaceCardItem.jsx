import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ place?.placeName} target="_blank">
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img src="\placeholder.webp" className="w-[130px] h-[130px] rounded-xl" />
      <div>
        <h2 className="font-bold text-lg text-black">{place.placeName}</h2>
        <p className="text-sm text-gray-800">{place.placeDetails}</p>
        <div className="flex justify-between">
        <h2 className="mt-2 text-black">🕙 {place.timeToTravel}</h2>
        <Button className='size-7 mt-3'><FaMapLocationDot /></Button>
        </div>
        
      </div>
    </div>
    </Link>
  );
}

export default PlaceCardItem;
