import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Onload from "./utils/Onload";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import About from "./pages/About";
import Category from "./pages/Category";
import Order from "./pages/Order";
import ProtectedRoute from "./authentication/ProtectedRoute";
import CartProvider from "./context/CartProvider";
import "./index.css";
import User from "./components/Profile/User";
import ChangeInfo from "./components/Profile/ChangeInfo";
import History from "./components/Profile/History";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />}>
              <Route path="" element={<User />} />
              <Route path="change-password" element={<ChangeInfo />} />
              <Route path="history-order" element={<History />} />
            </Route>
            <Route path="/order" element={<Order />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </CartProvider>
      <ScrollToTop />
      <Onload />
    </div>
  );
}

export default App;
