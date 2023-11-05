import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Onload from "./utils/Onload";
import Home from "./Pages/Home";
import NotFound from "./Pages/404";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Admin from "./Pages/AdminPage";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import About from "./Pages/About";
import EAGames from "./Pages/EAGames";
import Steam from "./Pages/Steam";

function App() {
  return (
    <>
      <ScrollToTop />
      <Onload />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
        <Route path="/EAGames" element={<EAGames />} />
        <Route path="/Steam" element={<Steam />} />
      </Routes>
    </>
  );
}

export default App;
