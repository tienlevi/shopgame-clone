import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import User from "../components/Profile/User";
import Title from "../components/Title/Title";

function Profile() {
  return (
    <Title title="Profile">
      <Header />
      <User />
      <Footer />
    </Title>
  );
}

export default Profile;
