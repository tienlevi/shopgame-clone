import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInterceptors from "../../hooks/useInterceptors";
import { FaUser, FaWrench, FaLock } from "react-icons/fa";
import { Stack, Button } from "@mui/material";
import RefreshToken from "../../hooks/useRefreshToken";
import axios from "axios";
// import axios from "axios";

const tabViews = [
  {
    index: 1,
    name: "Overview",
    href: "",
    icon: FaUser,
  },
  {
    index: 2,
    name: "Change Information",
    href: "information",
    icon: FaWrench,
  },
  {
    index: 3,
    name: "Change Password",
    href: "information",
    icon: FaLock,
  },
];

function User() {
  const [tab, setTab] = useState<number>(1);
  const [infor, setInfor] = useState<any>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const api = useInterceptors();
  const navigate = useNavigate();
  const refresh = RefreshToken();
  const accessToken = localStorage.getItem("AccessToken");

  const getUser = async (token: any) => {
    try {
      const response = await api.get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const user = response.data.user;
      setInfor(user);
      setEmail(user.email);
      setTel(user.tel);
      console.log(user);
    } catch (err) {
      // navigate("/");
      console.log(err);
    }
  };

  // const handleRefreshToken = () => {
  //   refresh();
  //   getUser(accessToken);
  // };

  const handleChangeInfor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/changeinfor",
        {
          email: email,
          // tel: tel,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const user = response.data;
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (accessToken === null) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    getUser(accessToken);
  }, [accessToken]);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("AccessToken");
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-[140px] px-3">
        <h1 className="text-[29px] font-bold mb-5">Profile </h1>
        <div className="flex justify-between lg:flex-col">
          <div className="w-[380px] h-[450px] bg-F7F7F7 lg:w-[100%]">
            {tabViews.map((item) => (
              <div
                key={item.index}
                // to={item.href}
                onClick={() => setTab(item.index)}
                className={`flex items-center p-4 cursor-pointer ${
                  tab === item.index
                    ? "border-r-[5px] border-blue bg-bluethird text-white"
                    : ""
                } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
              >
                <item.icon className="text-[21px] ml-2" />
                <p className={"text-[19px] ml-2"}>{item.name}</p>
              </div>
            ))}
            <div
              className={`flex items-center p-4 cursor-pointer hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
              onClick={handleLogout}
            >
              <FaUser className="text-[21px] ml-2" />
              <p className="text-[19px] ml-2">Logout</p>
            </div>
          </div>
          <div className="w-[750px] border-gray border-2 lg:w-[100%] lg:mt-3">
            <div className="block">
              {tab === 1 && (
                <div>
                  <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                    Overview
                  </h1>
                  <div className="p-3">
                    <div className="my-1">
                      <h1 className="text-[21px] font-bold">Account</h1>
                      <p className="h-[40px] text-[18px] my-2">
                        {infor?.username}
                      </p>
                    </div>
                    <div className="my-1">
                      <h1 className="text-[21px] font-bold">Email</h1>
                      <p className="h-[40px] text-[18px] my-2">
                        {infor?.email}
                      </p>
                    </div>
                    <div className="my-1">
                      <h1 className="text-[21px] font-bold">Name</h1>
                      <p className="h-[40px] text-[18px] my-2">
                        Nguyen Trach Tien
                      </p>
                    </div>
                    <div className="my-1">
                      <h1 className="text-[21px] font-bold">Phone number</h1>
                      <p className="h-[40px] text-[18px] my-2">{infor?.tel}</p>
                    </div>
                  </div>
                </div>
              )}
              {tab === 2 && (
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[100%] h-[35px] text-[18px] border-[1px] border-black my-4 pl-3 rounded-[5px] focus:outline-none"
                      />
                    </div>

                    <div className="my-1">
                      <h1 className="text-[21px] font-bold">Phone number</h1>
                      <input
                        type="text"
                        placeholder="Account"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
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
                        <Button onClick={handleChangeInfor} variant="contained">
                          Confirm
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </div>
              )}
              {tab === 3 && (
                <div>
                  <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                    Change Password
                  </h1>
                  <div className="p-3">
                    <div className="my-1">
                      <h1 className="text-[21px] font-bold">
                        Current Password
                      </h1>
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
                        defaultValue={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
