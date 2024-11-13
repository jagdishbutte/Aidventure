import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    // console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
      });
  };

  return (
    <div className="p-2 shadow-lg flex items-center justify-between px-3">
      <img src="/logo.svg" alt="Company Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-black bg-gray-300 focus:outline-none border-none">
                My Trips
              </Button>
            </a>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-black bg-gray-300 focus:outline-none border-none">
                Create New Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className="focus:outline-none border-none p-0 m-0">
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" />
              <>
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the app with Google Authentication</p>
              </>
              <Button
                className="w-full mt-5 flex gap-2 items-center"
                onClick={login}
              >
                <FcGoogle />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
