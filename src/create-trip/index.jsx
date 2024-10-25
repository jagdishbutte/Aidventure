import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';



function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange=(name, value)=>{

    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })

  const onGenerateTrip=async()=>{

    const GetUserProfile=(tokenInfo)=>{
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers:{
          Authorization:`Bearer ${tokenInfo?.access_token}`,
          Accept:'Application/json'
        }
      }).then((resp)=>{
        console.log(resp);
      })
    }

    const user = localStorage.getItem('users');

    if(!user){
      setOpenDialog(true);
      return;
    }

    if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData?.traveler){
      toast("Please fill all details...")
      return ;
    }
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)
    
    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT)

    console.log(result?.response?.text())
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location',v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input placeholder={"Ex. 3"} type="number" 
            onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                  ${formData?.budget==item.title && 'shadow-lg border-black'}`
                }
                onClick={()=>handleInputChange('budget',item.title)}
              >
                <h2 className="text-xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Who do you want to travel with on your next Adventure?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                  ${formData?.traveler==item.people && 'shadow-lg border-black'}`}
                onClick={()=>handleInputChange('traveler',item.people)}
              >
                <h2 className="text-xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-50 justify-end flex">
          <Button onClick={onGenerateTrip}>Generate Trip</Button> 
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                
                <img src="./logo.svg"/>
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <div>Sign in to the App with Google Authentication securly.</div>

                <Button 
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className="h-7 w-7"/>
                  Sign In With Google
                </Button>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
    </div>
  );
}

export default CreateTrip;
