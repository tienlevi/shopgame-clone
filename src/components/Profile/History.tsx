import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "./Tab";
import { ApiUrl } from "../../constants";
import useUser from "../../hooks/useUser";
import { OrderItems } from "../../interface";
import { formatDate } from "../../utils/format";
import Images from "../../utils/Images";

function History() {
  const [lists, setLists] = useState<OrderItems[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/orders/${user?._id}`);
        setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
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
              {lists.map((list: OrderItems, index: number) => (
                <div className="my-1" key={index}>
                  <p className="text-[22px] font-bold mb-2">
                    Order Date: {formatDate(list.createdAt)}
                  </p>
                  <p className="text-black text-[19px] mb-2">
                    Status <span className="text-green"> {list.status}</span>
                  </p>
                  <table className="w-full">
                    <tr>
                      <td className="w-[30px] p-2 border border-black">Id</td>
                      <td className="w-[250px] p-2 border border-black">
                        Name
                      </td>
                      <td className="w-[100px] p-2 border border-black">
                        Price
                      </td>
                      <td className="w-[150px] p-2 border border-black">
                        Image
                      </td>
                      <td className="w-[100px] p-2 border border-black">
                        Category
                      </td>
                    </tr>
                    {list.items.map((item, index: number) => (
                      <tr key={index}>
                        <td className="border border-black">{index + 1}</td>
                        <td className="border border-black">{item.name}</td>
                        <td className="border border-black">{item.price}</td>
                        <td className="border border-black p-2">
                          <img
                            src={Images(item.img)}
                            alt=""
                            className="w-[150px] h-[100px] object-contain"
                          />
                        </td>
                        <td className="border border-black">{item.category}</td>
                      </tr>
                    ))}
                  </table>
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
