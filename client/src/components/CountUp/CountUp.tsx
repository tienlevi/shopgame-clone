import CountUp from "react-countup";

function countUp() {
  return (
    <div className="flex items-center justify-center h-[180px] mt-[25px] text-white bg-gradient-to-b from-bluesecond to-instagramColor-purple">
      <div className="w-[100px] mx-[20px] text-center">
        <div className="text-[27px] font-bold">
          <CountUp start={50} end={1000} duration={5} />+
        </div>
        <p className="text-[23px]">User</p>
      </div>
      <div className="w-[100px] mx-[20px] text-center">
        <div className="text-[27px] font-bold">
          <CountUp start={20} end={100} duration={5} />+
        </div>
        <p className="text-[23px]">Product</p>
      </div>
      <div className="w-[100px] mx-[20px] text-center">
        <div className="text-[27px] font-bold">
          <CountUp start={50} end={700} duration={5} />+
        </div>
        <p className="text-[23px]">Evaluate</p>
      </div>
    </div>
  );
}

export default countUp;
