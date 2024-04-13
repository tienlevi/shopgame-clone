import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInterceptors from "../../hooks/useInterceptors";
import useAuth from "../../hooks/useAuth";
import Tab from "./Tab";

function User() {
  const apiUrl: any = (import.meta as any).env?.BASE_SERVER;
  const { accessToken, user, setUser }: any = useAuth();
  const api = useInterceptors();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`${apiUrl}/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        navigate("/");
        console.log(err);
      }
    };
    getUser();
  }, [accessToken]);

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
