import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GoogleApi';
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all hover:shadow-md rounded-xl'>
        <img src={photoUrl? photoUrl: '/placeholder.webp'} className="w-[180px] h-[180px] rounded-xl object-cover"/>
        <div>
            <h2 className='font-medium text-lg text-black p-1'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-800 p-1'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCard