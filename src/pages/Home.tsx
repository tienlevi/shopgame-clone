import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Products from "../components/Product/Products";
import CountUp from "../components/CountUp/CountUp";
import Blog from "../components/Blog/Blog";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function Home() {
  return (
    <Title title="ShopGame - Offical Site">
      <Header />
      <SlideShow />
      <Products />
      <CountUp />
      <Blog />
      <Footer />
    </Title>
  );
}

export default Home;
