import { Link } from "react-router-dom";
import productData from "../../Items/ProductItems";

function Products() {
  return (
    <>
      <div className="max-w-[1250px] mx-auto mt-[20px] px-[15px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[520px] sm:max-w-[250px] sm:text-center">
        <h1 className="text-[30px] font-bold px-[8px] sm:ml-0">All games</h1>
        <div className="flex flex-wrap">
          {productData.map((product, index) => (
            <div key={index} className="mx-[12px] my-[10px] sm:mx-0">
              <Link key={index} to={`./ProductDetail/${product.id}`}>
                <img
                  src={product.img}
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
        </div>
      </div>
    </>
  );
}

export default Products;
