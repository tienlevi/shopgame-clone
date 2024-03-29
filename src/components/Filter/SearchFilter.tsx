import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductItems from "../../Items/ProductItems";
import Images from "../../utils/Images";

function SearchFilter() {
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const search = param.get("name");
  const filter = useRef<any>([]);

  filter.current = ProductItems.filter((item: any) =>
    item.name.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <>
      <div className="max-w-[1250px] mx-auto mt-[130px] px-[15px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[520px] sm:max-w-[250px]">
        <h1 className="text-[30px] font-bold ml-[8px]">Search: {search}</h1>
        <div className="flex flex-wrap">
          {filter &&
            filter.current.map((product: any, index: number) => (
              <div key={index} className="mx-[12px] my-[10px]">
                <Link key={index} to={`./ProductDetail/${product.id}`}>
                  <img
                    src={Images(product.img)}
                    className="w-[220px] h-[350px] object-cover"
                    alt=""
                  />
                  <div className="w-[220px]">
                    <h2 className="text-[20px] font-bold hover:underline">
                      {product.name}
                    </h2>
                    <p className="text-red font-bold">{product.price}$</p>
                  </div>
                </Link>
              </div>
            ))}
          {filter.current.length <= 0 && <h1>No product found</h1>}
        </div>
      </div>
    </>
  );
}

export default SearchFilter;
