import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInterceptors from "../../hooks/useInterceptors";
import {
  FaUser,
  FaInfo,
  FaShieldAlt,
  FaPaperclip,
  FaCreditCard,
} from "react-icons/fa";
import RefreshToken from "../../hooks/useRefreshToken";

const tabViews = [
  {
    index: 1,
    name: "Overview",
    icon: FaUser,
  },
  {
    index: 2,
    name: "Detail",
    icon: FaInfo,
  },
  {
    index: 3,
    name: "Security",
    icon: FaShieldAlt,
  },
  {
    index: 4,
    name: "Connection",
    icon: FaPaperclip,
  },
  {
    index: 5,
    name: "Payment Methods",
    icon: FaCreditCard,
  },
];

const tabViewInformation = [
  {
    index: 1,
    name: "Overview",
  },
  {
    index: 2,
    name: "Detail",
  },
  {
    index: 3,
    name: "Security",
  },
  {
    index: 4,
    name: "Connection",
  },
  {
    index: 5,
    name: "Payment Methods",
  },
];

function User() {
  const [tab, setTab] = useState<number>(1);
  const [infor, setInfor] = useState<any>();
  const api = useInterceptors();
  const navigate = useNavigate();
  const refresh = RefreshToken();
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    console.log(accessToken);
    const getUser = async () => {
      try {
        const response = await api.get("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        setInfor(response.data.user);
        console.log(response.data.user);
      } catch (err) {
        navigate("/");
        console.log(err);
      }
    };
    getUser();
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken === "") {
      navigate("/");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("AccessToken");
    }
  }, [accessToken, navigate]);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("AccessToken");
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-[140px] px-3">
        <h1 className="text-[29px] font-bold mb-5">Profile </h1>
        <p onClick={refresh}>Refresh Token</p>
        <div className="flex justify-between">
          <div className="w-[380px] h-[450px] bg-F7F7F7">
            {tabViews.map((item) => (
              <div
                key={item.index}
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
          <div className="w-[750px] border-gray border-2">
            <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
              Information
            </h1>
            <div className="p-3">
              <div className="my-1">
                <h1 className="text-[21px] font-bold">Account</h1>
                <p className="h-[40px] text-[18px] my-2">{infor?.username}</p>
              </div>
              <div className="my-1">
                <h1 className="text-[21px] font-bold">Email</h1>
                <p className="h-[40px] text-[18px] my-2">{infor?.email}</p>
              </div>
              <div className="my-1">
                <h1 className="text-[21px] font-bold">Name</h1>
                <p className="h-[40px] text-[18px] my-2">Nguyen Trach Tien</p>
              </div>
              <div className="my-1">
                <h1 className="text-[21px] font-bold">Phone number</h1>
                <p className="h-[40px] text-[18px] my-2">1234567890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
