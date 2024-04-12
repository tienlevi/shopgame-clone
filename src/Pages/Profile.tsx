import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function Profile() {
  return (
    <Title title="Profile">
      <Header />
      <Outlet />
      <Footer />
    </Title>
  );
}

export default Profile;
