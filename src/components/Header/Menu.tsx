import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import useCart from "../../hooks/useCart";

interface MenuRes {
  active: boolean;
  closeMenu: () => void;
}

function Menu({ active, closeMenu }: MenuRes) {
  const { cart }: any = useCart();
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
              {cart?.length > 0 && (
                <div className="block relative">
                  <span className="ping absolute top-[-5px] left-[15%] h-5 w-5 rounded-full bg-red"></span>
                  <span className="flex items-center justify-center absolute top-[-5px] left-[15%] text-[15px] rounded-full h-5 w-5 bg-red"></span>
                </div>
              )}
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
