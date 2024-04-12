import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaShoppingCart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";

const tabs = [
  {
    name: "Overview",
    href: "/profile",
    icon: FaUser,
  },
  {
    name: "Change Password",
    href: "/profile/change-password",
    icon: FaLock,
  },
  {
    name: "History Order",
    href: "/profile/history-order",
    icon: FaShoppingCart,
  },
];

function Tab() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("AccessToken");
    window.location.reload();
  };

  const handleClickTab = (href: string) => {
    navigate(href);
    window.location.reload();
  };
  return (
    <>
      <div className="w-[380px] h-[450px] bg-F7F7F7 lg:w-[100%]">
        {tabs.map((tab, index: number) => (
          <div
            key={index}
            className={`flex items-center p-4 cursor-pointer ${
              location.pathname === tab.href
                ? "border-r-[5px] border-blue bg-bluethird text-white"
                : ""
            } hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
            onClick={() => handleClickTab(tab.href)}
          >
            <tab.icon className="text-[21px] ml-2" />
            <p className={"text-[19px] ml-2"}>{tab.name}</p>
          </div>
        ))}
        <div
          className={`flex items-center p-4 cursor-pointer hover:border-r-[5px] hover:border-blue hover:bg-bluethird hover:text-white`}
          onClick={handleLogout}
        >
          <BiLogOut className="text-[21px] ml-2" />
          <p className="text-[19px] ml-2">Logout</p>
        </div>
      </div>
    </>
  );
}

export default Tab;
