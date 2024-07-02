import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import TabFilter from "../components/Filter/TabFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import ProductItems from "../constants/ProductItems";

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

  return (
    <Title title="Category">
      <Header />
      <TabFilter
        items={ProductItems}
        selectCategory={selectCategory}
        onSelectCategory={handleSelectCategory}
      />
      <Footer />
    </Title>
  );
}

export default Category;
