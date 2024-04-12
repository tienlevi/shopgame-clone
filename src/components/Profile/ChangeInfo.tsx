import React from "react";
import { Stack, Button } from "@mui/material";
import Tab from "./Tab";

function ChangeInfo() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-[140px] px-3">
        <h1 className="text-[29px] font-bold mb-5">Profile </h1>
        <div className="flex justify-between lg:flex-col">
          <Tab />
          <div className="w-[750px] border-gray border-2 lg:w-[100%] lg:mt-3">
            <div className="block">
              <div>
                <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                  Change Information
                </h1>
                <div className="p-3">
                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">Email</h1>
                    <input
                      type="text"
                      placeholder="Account"
                      className="w-[100%] h-[35px] text-[18px] border-[1px] border-black my-4 pl-3 rounded-[5px] focus:outline-none"
                    />
                  </div>

                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">Phone number</h1>
                    <input
                      type="text"
                      placeholder="Account"
                      className="w-[100%] h-[35px] text-[18px] border-[1px] border-black my-4 pl-3 rounded-[5px] focus:outline-none"
                    />
                  </div>
                  <div className="my-1">
                    <Stack
                      spacing={3}
                      direction={{
                        xl: "row",
                        lg: "row",
                        md: "row",
                        sm: "column",
                      }}
                    >
                      <Button variant="contained">Confirm</Button>
                    </Stack>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                  Change Password
                </h1>
                <div className="p-3">
                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">Current Password</h1>
                    <input
                      type="text"
                      placeholder="●●●●●●●"
                      defaultValue=""
                      className="w-[100%] h-[35px] text-[18px] border-[1px] border-black my-4 pl-3 rounded-[5px] focus:outline-none"
                    />
                  </div>
                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">New Password</h1>
                    <input
                      type="text"
                      placeholder="●●●●●●●"
                      className="w-[100%] h-[35px] text-[18px] border-[1px] border-black my-4 pl-3 rounded-[5px] focus:outline-none"
                    />
                  </div>
                  <div className="my-1">
                    <Stack
                      spacing={3}
                      direction={{
                        xl: "row",
                        lg: "row",
                        md: "row",
                        sm: "column",
                      }}
                    >
                      <Button variant="contained">Confirm</Button>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeInfo;
