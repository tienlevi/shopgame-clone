import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Onload from "./utils/Onload";
import Auth from "./context/Auth";
import RequireAuth from "./context/RequireAuth";
import PersistSignIn from "./components/Form/PersistSignIn";
import Home from "./Pages/Home";
import NotFound from "./Pages/404";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import SignUp from "./Pages/SignIn";
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import About from "./Pages/About";
import EAGames from "./Pages/EAGames";
import Steam from "./Pages/Steam";

function App() {
  return (
    <Auth>
      <ScrollToTop />
      <Onload />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/SignIn" element={<SignUp />} />
        <Route path="/Admin" element={<Admin />} />
        {/* <Route element={<PersistSignIn />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/Profile" element={<Profile />} />
        </Route>
        {/* </Route> */}
        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
        <Route path="/EAGames" element={<EAGames />} />
        <Route path="/Steam" element={<Steam />} />
      </Routes>
    </Auth>
  );
}

export default App;
