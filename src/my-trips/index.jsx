import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { db } from "../service/firebaseConfig";
import { useNavigation } from 'react-router-dom';
import UserTripCard from "./components/UserTripCard";

function MyTrip() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])

        // Used to get all user trips 
        const GetUserTrips=async()=>{
            const user = JSON.parse(localStorage.getItem('user'));
            if(!user){
                navigation('/');
                return ; 
            }
            
            const q = query(collection(db, 'AITrips' ), where('userEmail','==',user?.email))
            const querySnapshot = await getDocs(q);
            setUserTrips([]);
            querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()]);
        });
    }
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-2xl">My Trips</h2>
            <div className='grid grid-cols-2 mt-5 md:grid-cols-3 gap-5 rounded-lg'>
                {userTrips?.length>0? userTrips.map((trip, index)=>(
                    <UserTripCard key={index} trip={trip} />
                    
                ))
                :[1, 2, 3, 4, 5, 6, 7, 8].map((item, index)=>(
                    <div key={index} className="h-[180px] w-[180px] bg-slate-200 animate-pulse rounded-xl">

                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default MyTrip