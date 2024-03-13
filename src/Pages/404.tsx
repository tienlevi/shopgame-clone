import { Link } from "react-router-dom";
import Title from "../components/Title/Title";

function NotFound() {
  return (
    <Title title="404 Not Found">
      <div className="relative">
        <div className="relative before:absolute before:h-[100%] before:top-0 before:left-0 before:right-0 before:bg-black before:opacity-20">
          <img
            className="w-[100%]"
            src={
              "/Asset/Image/Logo-bg/gradient-hexagonal-background_52683-62053.png"
            }
            alt=""
          />
          <div className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-[20rem] text-white font-bold">404</h1>
            <p className="text-[30px] text-white mt-[-36px]">
              Opps!Page Not Found
            </p>
            <Link
              className="flex items-center justify-center text-[22px] w-[300px] h-[50px] mx-auto mt-5 bg-bluesecond text-white rounded-[5px]"
              to="/"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </Title>
  );
}

export default NotFound;
