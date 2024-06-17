import Tab from "./Tab";
import useUser from "../../hooks/useUser";

function User() {
  const { user } = useUser();

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-[140px] px-3">
        <h1 className="text-[29px] font-bold mb-5">Profile </h1>
        <div className="flex justify-between lg:flex-col">
          <Tab />
          <div className="w-[750px] border-gray border-2 lg:w-[100%] lg:mt-3">
            <div className="block">
              <div>
                <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                  Overview
                </h1>
                <div className="p-3">
                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">Name</h1>
                    <p className="h-[40px] text-[18px] my-2">{user?.name}</p>
                  </div>
                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">Email</h1>
                    <p className="h-[40px] text-[18px] my-2">{user?.email}</p>
                  </div>

                  <div className="my-1">
                    <h1 className="text-[21px] font-bold">Phone number</h1>
                    <p className="h-[40px] text-[18px] my-2">{user?.tel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
