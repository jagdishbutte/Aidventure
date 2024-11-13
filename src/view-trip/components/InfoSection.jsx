import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaShare } from "react-icons/fa";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GoogleApi";

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(()=>{
        trip && GetPlacePhoto();
    },[trip])

    const data = {
        textQuery:trip?.userSelection?.location?.label
    }
    const GetPlacePhoto = async()=>{
        const result = await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data.places[0].photos[3].name)

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[5].name)
            setPhotoUrl(photoUrl)
        })
    }

  return (
    <div>
      <img
        src={photoUrl? photoUrl: '/placeholder.webp'}
        alt="Aidventure"
        className="h-[340px] w-full object-cover rounded-lg"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-base">
              🗓️ {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-base">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-base">
              🥂 No of Travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button><FaShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
