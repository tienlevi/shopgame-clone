import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

interface MenuRes {
  active: boolean;
  closeMenu: () => void;
}

function Menu({ active, closeMenu }: MenuRes) {
  const menu = `${active ? "left-0" : "left-[-150%]"}`;
  const screen = `${
    active
      ? "absolute min-h-screen top-0 left-0 right-0 bottom-0 z-40 bg-[rgba(0,0,0,0.5)]"
      : ""
  }`;

  return (
    <>
      <div className={screen}>
        <div
          className={`fixed top-0 ${menu} w-[450px] h-[100%] z-30 bg-white duration-700 ease-in-ou lg:flex sm:overflow-y-scroll sm:w-[100%]`}
        >
          <ul className="text-black text-[18px] w-[100%]">
            <li className="text-[23px] my-[15px] py-[12px] border-b-[1px]">
              <Link className="px-5" to="/">
                Home
              </Link>
            </li>
            <li className="text-[23px] my-[15px] py-[12px] border-b-[1px]">
              <Link className="px-5" to="/Cart">
                Cart
              </Link>
            </li>
            <li className="text-[23px] my-[15px] py-[12px] border-b-[1px]">
              <Link className="px-5" to="/Category?cate=">
                Category
              </Link>
            </li>
            <li className="text-[23px] my-[15px] py-[12px] border-b-[1px]">
              <Link className="px-5" to="/About">
                About my website
              </Link>
            </li>
            <div
              onClick={closeMenu}
              className="absolute top-7 right-5 text-[28px] cursor-pointer"
            >
              <FaTimes />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
