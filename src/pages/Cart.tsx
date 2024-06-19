import Header from "../components/Header/Header";
import MyCart from "../components/Cart/MyCart";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function Cart() {
  return (
    <Title title="Cart">
      <Header />
      <MyCart />
      <Footer />
    </Title>
  );
}

export default Cart;
