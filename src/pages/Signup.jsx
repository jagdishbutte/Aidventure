import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

function Signup() {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  return (
    <div className="min-h-screen bg-[url('travel.jpg')] bg-no-repeat bg-cover">
      <div className="flex flex-col items-center justify-center pt-8 ">
        <span className="text-2xl font-semibold text-teal-400">
          Welcome to Aidventure
        </span>
        <span className="text-lg font-semibold text-teal-200">
          Signup now to start your journey!
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col m-4 border p-6 rounded-md shadow-lg w-80 md:w-72 bg-teal-100">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter your first name"
            className="bg-white border p-1 rounded-md  focus:border-red-400"
          />

          <label htmlFor="lasttName" className="mt-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter your last name"
            className="bg-white border p-1 rounded-md  focus:border-red-400"
          />

          <label htmlFor="email" className="mt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="bg-white border p-1 rounded-md  focus:border-red-400"
          />

          <label htmlFor="mobile" className="mt-2">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile number"
            className="bg-white border p-1 rounded-md  focus:border-red-400"
          />

          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="bg-white border p-1 rounded-md"
          />
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-400 py-1 px-4 mt-2">
              Signup
            </button>
          </div>
          <div className="flex justify-center space-x-1 mt-2">
            <span>Already have an account?</span>
            <span
              className="underline text-blue-700 cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              signin
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">OR</span>

            <button
              className="flex items-center space-x-1 bg-zinc-200 hover:bg-zinc-50"
              onClick={login}
            >
              <FcGoogle />
              <p>Signup with google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup