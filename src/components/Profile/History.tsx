import { useEffect, useState } from "react";
import axios from "axios";
import Tab from "./Tab";
import useAuth from "../../hooks/useAuth";
import useInterceptors from "../../hooks/useInterceptors";
import { ApiUrl } from "../../constants";

interface OrderItems {
  _id: string;
  items: [{ name: string; price: number; img: string; category: string }];
  status: string;
  totalPrice: number;
  userInfo: {
    _id: string;
    name: string;
    email: string;
    address: string;
    tel: string;
  };
}

function History() {
  const [lists, setLists] = useState<OrderItems[]>([]);
  const { accessToken, user, setUser }: any = useAuth();
  const api = useInterceptors();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/orders`);
        setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const getUser = async (token: any) => {
    try {
      const response = await api.get(`${ApiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(response.data.user);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser(accessToken);
  }, [accessToken]);
  return (
    <>
      {" "}
      <div className="max-w-[1200px] mx-auto mt-[140px] px-3">
        <h1 className="text-[29px] font-bold mb-5">Profile </h1>
        <div className="flex justify-between lg:flex-col">
          <Tab />
          <div className="w-[750px] border-gray border-2 lg:w-[100%] lg:mt-3">
            <div className="block">
              <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                History order
              </h1>
            </div>
            <div className="p-3">
              {lists.map((items: OrderItems, index: number) => (
                <div className="my-1" key={index}>
                  {user?._id === items.userInfo._id &&
                    items.items.map((item, index: number) => (
                      <p key={index} className="h-[40px] text-[18px] my-2">
                        {item.name}
                      </p>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
