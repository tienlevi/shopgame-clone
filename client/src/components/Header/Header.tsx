import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./MenuResponsive/Menu";
import { useAuth } from "../../context/Auth";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";

function Header() {
  const [scroll, setScroll] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(window.pageYOffset);
  const [toggle, setToggle] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const body = document.querySelector("body");
  const auth = useAuth();

  useEffect(() => {
    const ScrollMouse = () => {
      const moving = window.pageYOffset;

      setPosition(moving);
      setScroll(position > moving);
    };

    window.addEventListener("scroll", ScrollMouse);

    return () => {
      window.removeEventListener("scroll", ScrollMouse);
    };
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1050) {
        setToggle(toggle);
        body?.classList.remove("overflow-hidden");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMenu = () => {
    setToggle(!toggle);
    setScroll(true);
    body?.classList.add("overflow-hidden");
  };

  const closeMenu = () => {
    setToggle(!toggle);
    setScroll(false);
    body?.classList.remove("overflow-hidden");
  };

  const handleSearch = () => {
    window.location.href = `/Search?name=${search}`;
  };

  return (
    <>
      <header
        className={`flex items-center justify-end w-[100%] h-[50px] fixed bg-blue duration-300 z-10 ${
          scroll ? "top-0" : "top-[-20px]"
        }`}
      >
        <div className="flex items-center mr-3">
          <input
            className="h-[35px] pl-2 focus:outline-none rounded-l-sm text-[18px]"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Link to={`/Search?name=${search}`}>
            <FaSearch
              onClick={handleSearch}
              className="h-[35px] pr-2 text-black bg-white text-[30px] rounded-r-sm cursor-pointer"
            />
          </Link>
        </div>
        <div className="mx-2">
          {auth?.accessToken ? (
            <Link className="flex items-center" to="/Profile">
              <FaUser className="h-[35px] pr-2 text-white text-[30px] rounded-r-sm cursor-pointer" />
              <p className="text-[19px] text-white">Profile</p>
            </Link>
          ) : (
            <Link className="flex items-center" to="/SignIn">
              <FaUser className="h-[35px] pr-2 text-white text-[30px] rounded-r-sm cursor-pointer" />
              <p className="text-[19px] text-white">Login</p>
            </Link>
          )}
        </div>
      </header>
      <header
        className={`flex items-center w-[100%] h-[75px] fixed bg-bluesecond duration-300 z-10 ${
          scroll ? "top-[50px]" : "top-0"
        }`}
      >
        <div className="flex items-center justify-between w-[1200px] mx-auto xl:w-[1000px] lg:w-[720px] md:w-[500px]">
          <div className="hidden lg:block">
            <FaBars
              onClick={openMenu}
              className="text-[24px] text-white cursor-pointer"
            />
            <Menu active={toggle} onClose={closeMenu} />
          </div>
          <Link to="/">
            <img
              className="w-[200px] h-[70px] object-cover"
              src={require("../../Asset/Image/Logo-bg/logo.png")}
              alt=""
            />
          </Link>
          <ul className="flex text-white text-[18px] lg:hidden">
            <li>
              <Link className="px-3 hover:underline" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="px-3 hover:underline" to="/Cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="px-3 hover:underline" to="">
                EA Games
              </Link>
            </li>
            <li>
              <Link className="px-3 hover:underline" to="">
                Game Steam
              </Link>
            </li>
            <li>
              <Link className="px-3 hover:underline" to="/About">
                About my website
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
