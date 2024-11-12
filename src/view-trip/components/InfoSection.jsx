import React from "react";
import { Button } from "../../components/ui/button";
import { FaShare } from "react-icons/fa";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="\placeholder.webp"
        alt="Aidventure"
        className="h-[340px] w-full object-cover rounded-sm"
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
