import { useState, useEffect, useRef } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function About() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (
        element.current &&
        scrollPosition > element.current.offsetTop - window.innerHeight
      ) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Title title="About Website">
      <Header />
      <div className="mt-[100px]">
        <img
          className="w-[100%] h-[450px] object-cover"
          src={require("../Asset/Image/Logo-bg/bg-all-games.png")}
          alt=""
        />
        <div className="max-w-[1200px] mx-auto">
          <div className="my-[20px]">
            <h1 className="text-center text-[32px] font-bold">Our Shop</h1>
            <p className="text-[19px] my-[10px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p className="text-[19px] my-[10px]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <p className="text-[19px] my-[10px]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
            <p className="text-[19px] my-[10px]">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable.
            </p>
          </div>
          <div
            ref={element}
            className={`relative my-[40px] ${
              isVisible
                ? "absolute opacity-100 left-0 duration-700"
                : "absolute opacity-0 left-[-100%]"
            }`}
          >
            <h1 className="text-center text-[32px] font-bold">
              GREAT GAMES START WITH GREAT PEOPLE
            </h1>
            <p className="text-[19px] my-[15px]">
              At Activision, we strive to connect and engage our global player
              community through entertainment. Our success comes from the
              passionate, talented and diverse team of people behind our
              world-class franchises. Ensuring Activision is an inclusive
              workplace where everyone can thrive will help us deliver a new era
              of epic entertainment for our players.Want to join the Activision
              team? Check out open roles here.
            </p>
            <p className="text-[19px] my-[15px]">
              At Activision, we strive to connect and engage our global player
              community through entertainment. Our success comes from the
              passionate, talented and diverse team of people behind our
              world-class franchises. Ensuring Activision is an inclusive
              workplace where everyone can thrive will help us deliver a new era
              of epic entertainment for our players.Want to join the Activision
              team? Check out open roles here.
            </p>
            <p className="text-[19px] my-[15px]">
              At Activision, we strive to connect and engage our global player
              community through entertainment. Our success comes from the
              passionate, talented and diverse team of people behind our
              world-class franchises. Ensuring Activision is an inclusive
              workplace where everyone can thrive will help us deliver a new era
              of epic entertainment for our players.Want to join the Activision
              team? Check out open roles here.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-[250px] mt-[40px] mb-[-25px] text-white bg-gradient-to-b from-bluesecond to-instagramColor-purple">
          <div className="mx-[20px] text-center">
            <div className="text-[27px] font-bold">
              <h1>We exist to inspire the world to play</h1>
            </div>
            <p className="text-[23px]">
              We are always looking for talented and self-motivated individuals.
              Join the world’s largest video game development organization.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Title>
  );
}

export default About;
