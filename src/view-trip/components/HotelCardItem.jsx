import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GoogleApi";

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(()=>{
        hotel && GetPlacePhoto();
    },[hotel])

    const data = {
        textQuery:hotel?.hotelName
    }
    const GetPlacePhoto = async()=>{
        const result = await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data.places[0].photos[3].name)

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[5].name)
            setPhotoUrl(photoUrl)
        })
    }

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        ", " +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl? photoUrl: '/placeholder.webp'} className="rounded-xl h-[180px] w-full object-cover" />
        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium text-black">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-800">📍{hotel?.hotelAddress}</h2>
          <h2 className="text-sm  text-black">💵 {hotel?.price}</h2>
          <h2 className="text-sm  text-black">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
