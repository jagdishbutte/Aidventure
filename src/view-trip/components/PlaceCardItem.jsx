import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GoogleApi";

function PlaceCardItem({place}) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(()=>{
        place && GetPlacePhoto();
    },[place])

    const data = {
        textQuery:place.placeName
    }

    const GetPlacePhoto = async()=>{
        const result = await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data.places[0].photos[3].name)

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[5].name)
            setPhotoUrl(photoUrl)
        })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ place?.placeName} target="_blank">
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img src={photoUrl? photoUrl:'/placeholder.webp'} className="w-[130px] h-[130px] rounded-xl object-cover" />
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
