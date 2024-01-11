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
import Pay from "./Pages/Pay";
import Auth from "./Auth/useAuth";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route element={<Auth />}>
            <Route path="/Profile" element={<Profile />} />
          </Route>
          <Route path="/Search" element={<Search />} />
          <Route path="/About" element={<About />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Pay" element={<Pay />} />
        </Routes>
      </CartProvider>
      <ScrollToTop />
      <Onload />
    </div>
  );
}

export default App;
