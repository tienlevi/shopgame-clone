// import {  }

interface Notification {
  ping: any;
}

function HeaderCart({ ping }: Notification) {
  return (
    <div className="block">
      <span className="ping absolute top-[-10px] right-0 h-5 w-5 rounded-full bg-red"></span>
      <span className="flex items-center justify-center absolute top-[-10px] right-0 text-[15px] rounded-full h-5 w-5 bg-red">
        {ping?.length}
      </span>
    </div>
  );
}
export default HeaderCart;
