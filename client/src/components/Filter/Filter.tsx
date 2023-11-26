import { Link } from "react-router-dom";

interface FilterCategory {
  items: any;
  selectCategory: any;
  onSelectCategory: (name: string) => void;
}

const categories = [
  {
    name: "All",
    origin: "",
  },
  {
    name: "EA Games",
    origin: "EA Games",
  },
  { name: "Game Steam", origin: "Game Steam" },
];

function Filter({ items, selectCategory, onSelectCategory }: FilterCategory) {
  const filteredItems = selectCategory
    ? items.filter((item: any) => item.origin === selectCategory)
    : items;

  return (
    <>
      <div className="max-w-[1250px] mx-auto mt-[130px] px-[15px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[520px] sm:max-w-[250px]">
        <h1 className="text-[30px] font-bold ml-[8px] mb-3">Category</h1>
        <div className="my-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${
                selectCategory === category.origin
                  ? "bg-bluethird text-white"
                  : "text-bluethird"
              } border-[1px] border-bluethird mx-[10px] p-2 rounded-[5px] hover:bg-bluethird hover:text-white duration-100`}
              onClick={() => onSelectCategory(category.origin)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap">
          {filteredItems.map((product: any, index: number) => (
            <div key={index} className="mx-[12px] my-[15px]">
              <Link key={index} to={`/ProductDetail/${product.id}`}>
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

export default Filter;
