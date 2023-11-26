import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";
import Footer from "../components/Footer/Footer";
import ProductItems from "../Items/ProductItems";

function Category() {
  const location = useLocation();
  const selectCategory = new URLSearchParams(location.search).get("cate");
  const handleSelectCategory = (category: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("cate", category);
    const newURL = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, "", newURL);
    window.location.reload();
  };

  useEffect(() => {
    document.title = "Category";
  }, []);

  return (
    <>
      <Header />
      <Filter
        items={ProductItems}
        selectCategory={selectCategory}
        onSelectCategory={handleSelectCategory}
      />
      <Footer />
    </>
  );
}

export default Category;
