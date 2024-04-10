import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Onload from "./utils/Onload";
import Home from "./Pages/Home";
import NotFound from "./Pages/404";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import About from "./Pages/About";
import Category from "./Pages/Category";
import Order from "./Pages/Order";
import ProtectedRoute from "./Auth/ProtectedRoute";
import CartProvider from "./context/CartProvider";
import "./index.css";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/order" element={<Order />} />
            </Route>
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
      <ScrollToTop />
      <Onload />
    </div>
  );
}

export default App;
