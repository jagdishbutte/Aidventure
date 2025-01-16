import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

function Signin() {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  return (
    <div className="min-h-screen bg-[url('travel4.jpg')] bg-no-repeat bg-cover">
      <div className="flex justify-center">
        <span className="text-2xl font-semibold text-teal-100 mt-8">Sign in to Aidventure</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col m-4 border p-6 rounded-md bg-teal-100 shadow-lg w-80 md:w-72">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="bg-white border p-1 rounded-md focus:border-red-400"
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
              Signin
            </button>
          </div>
          <div className="flex justify-center space-x-1 mt-2">
            <span>Don't have an account?</span>
            <span
              className="underline text-blue-700 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              signup
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">OR</span>

            <button
              className="flex items-center space-x-1 bg-zinc-200 hover:bg-zinc-50"
              onClick={login}
            >
              <FcGoogle />
              <p>Signin with google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
