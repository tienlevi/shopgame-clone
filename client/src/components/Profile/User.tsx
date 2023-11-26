import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInterceptors from "../../hooks/useInterceptors";
import { FaUser, FaInfo, FaShieldAlt, FaPaperclip } from "react-icons/fa";
import RefreshToken from "../../hooks/useRefreshToken";

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
        // navigate("/");
        // localStorage.removeItem("RefreshToken");
        // localStorage.removeItem("AccessToken");
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
            <div
              onClick={() => setTab(1)}
              className={`flex items-center p-4 cursor-pointer ${
                tab === 1
                  ? "border-r-[5px] border-blue bg-bluethird text-white"
                  : ""
              } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            >
              <FaUser className="text-[21px] ml-2" />
              <p className={"text-[19px] ml-2"}>Overview</p>
            </div>
            <div
              onClick={() => setTab(2)}
              className={`flex items-center p-4 cursor-pointer ${
                tab === 2
                  ? "border-r-[5px] border-blue bg-bluethird text-white"
                  : ""
              } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            >
              <FaInfo className="text-[21px] ml-2" />
              <p className="text-[19px] ml-2">Detail</p>
            </div>
            <div
              onClick={() => setTab(3)}
              className={`flex items-center p-4 cursor-pointer ${
                tab === 3
                  ? "border-r-[5px] border-blue bg-bluethird text-white"
                  : ""
              } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            >
              <FaShieldAlt className="text-[21px] ml-2" />
              <p className="text-[19px] ml-2">Security</p>
            </div>
            <div
              onClick={() => setTab(4)}
              className={`flex items-center p-4 cursor-pointer ${
                tab === 4
                  ? "border-r-[5px] border-blue bg-bluethird text-white"
                  : ""
              } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            >
              <FaPaperclip className="text-[21px] ml-2" />
              <p className="text-[19px] ml-2">Connection</p>
            </div>
            <div
              onClick={() => setTab(5)}
              className={`flex items-center p-4 cursor-pointer ${
                tab === 5
                  ? "border-r-[5px] border-blue bg-bluethird text-white"
                  : ""
              } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            >
              <FaUser className="text-[21px] ml-2" />
              <p className="text-[19px] ml-2">Game </p>
            </div>
            <div
              onClick={() => setTab(6)}
              className={`flex items-center p-4 cursor-pointer ${
                tab === 6
                  ? "border-r-[5px] border-blue bg-bluethird text-white"
                  : ""
              } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            >
              <FaUser className="text-[21px] ml-2" />
              <p className="text-[19px] ml-2">Payment Methods</p>
            </div>
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
