import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import JotFormAgent from '../../../jotform-agent';

function Viewtrip() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(()=>{
        tripId && GetTripData();
    }, [tripId]);

    // Used to get trip data from firebase 

    const GetTripData = async ()=>{
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document: ", docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document!");
            toast("No trip found...");
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <InfoSection trip={trip}/>
        <Hotels trip={trip}/>
        <PlacesToVisit trip={trip}/>
        {/* <JotFormAgent /> */}
        <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip