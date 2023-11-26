import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Products from "../components/Product/Products";
import CountUp from "../components/CountUp/CountUp";
import Blog from "../components/Blog/Blog";
import Footer from "../components/Footer/Footer";

function Home() {
  document.title = "ShopGame - Home";

  return (
    <>
      <Header />
      <SlideShow />
      <Products />
      <CountUp />
      <Blog />
      <Footer />
    </>
  );
}

export default Home;
