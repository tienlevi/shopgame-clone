import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="mt-[30px] py-[20px] bg-gray">
        <div className="max-w-[1200px] mx-auto xl:max-w-[960px] lg:max-w-[715px] md:max-w-[500px] sm:max-w-[240px]">
          <h2 className="text-[25px] font-bold lg:text-center">
            My information
          </h2>
          <div className="flex items-center py-[10px] border-b-[1px] border-instagramColor-orange border-green-50 lg:justify-center">
            <div className="mr-[10px] rounded-[10px] cursor-pointer">
              <a
                className="flex items-center justify-center w-[50px] h-[50px] text-[15px] rounded-[10px] text-white bg-facebookColor"
                href="https://www.facebook.com/TiennLevii/"
              >
                <FaFacebook className="text-[30px]" />
              </a>
            </div>
            <div className="mr-[10px] rounded-[10px] cursor-pointer">
              <a
                className="flex items-center justify-center w-[50px] h-[50px] rounded-[10px] text-white bg-red"
                href="https://www.youtube.com/channel/UC97ywacnpTlt1CwgcL5C76w"
              >
                <FaYoutube className="text-[30px]" />
              </a>
            </div>
            <div className="mr-[10px] rounded-[10px] cursor-pointer">
              <a
                className="flex items-center justify-center w-[50px] h-[50px] rounded-[10px] text-white bg-gradient-to-br from-instagramColor-yellow via-instagramColor-orange to-instagramColor-purple p-1"
                href="https://www.instagram.com/_levi_2401/"
              >
                <FaInstagram className="text-[30px]" />
              </a>
            </div>
          </div>
          <div className="flex justify-between mt-4 lg:flex lg:flex-col lg:text-center">
            <div className="my-2">
              <h2 className="text-[26px] font-bold">Introduce</h2>
              <p className="text-[17px] py-[10px]">Terms of Service</p>
              <p className="text-[17px] py-[10px]">Privacy Policy</p>
              <p className="text-[17px] py-[10px]">Introduce Shopgame</p>
            </div>
            <div className="my-2">
              <h2 className="text-[26px] font-bold">Account</h2>
              <p className="text-[17px] py-[10px]">Login</p>
              <p className="text-[17px] py-[10px]">Register</p>
            </div>
            <div className="my-2">
              <h2 className="text-[26px] font-bold">Contact</h2>
              <p className="text-[17px] py-[10px]">Hotline 1900 633 305</p>
              <p className="text-[17px] py-[10px]">Contact help</p>
            </div>
            <div className="lg:m-auto md:w-[300px]">
              <img
                src={require("../../Asset/Image/Logo-bg/logo.png")}
                alt=""
                className=""
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
