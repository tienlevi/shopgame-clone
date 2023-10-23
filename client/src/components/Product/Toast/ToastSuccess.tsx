import { FaCheck, FaTimes } from "react-icons/fa";
import "./Toast.css";

interface AlertToast {
  activeToast: boolean;
  onClose: () => void;
}

function ToastSuccess({ activeToast, onClose }: AlertToast) {
  const beforeWidth = `${activeToast ? "before:w-[100%]" : "before:w-0"}`;
  const animate = `${activeToast ? "before:animate-countdown" : ""}`;

  return (
    <>
      <div
        className={`flex items-center relative toast toast-slide my-3 w-[350px] h-[130px] bg-white duration-500 rounded-[5px] shadow-[0.5px_0.5px_6px_1px_rgba(0,0,0,0.3)] z-20`}
      >
        <div className="flex items-center pl-[20px]">
          <FaCheck className="text-[29px] text-green" />
          <p className="text-[25px] pl-[25px]">Add success</p>
          <FaTimes
            onClick={onClose}
            className="absolute top-[15px] right-[15px] text-[24px] cursor-pointer hover:text-red"
          />
        </div>
        <div
          className={`before:content-[''] before:absolute before:left-0 before:bottom-0 ${beforeWidth} before:h-[5px] before:bg-green ${animate} before:z-20`}
        ></div>
      </div>
    </>
  );
}

export default ToastSuccess;
