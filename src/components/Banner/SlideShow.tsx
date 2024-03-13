import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Images from "../../utils/Images";

const slide = [
  {
    h1: "STAR WARS OUTLAWS",
    img: "/Asset/Image/Slide/image2.jpg",
    content:
      "Experience the first-ever open world Star Wars game, set between the events of The E4pire Strikes Back and Return of the Jedi",
  },
  {
    h1: "GET EARLY ACCESS",
    img: "/Asset/Image/Slide/image4.jpg",
    content:
      "PRE-ORDER EA SPORTS FC™ 24 ULTIMATE EDITION Start playing up to 7 days early, enjoy a4Nike Ultimate Team™ Campaign, receive 4,600 FC Points, and more when you pre-order EA SPORTS FC™ 24 Ultimate Edition today*.",
  },
  {
    h1: "CO-OP SALE! SAVE UP TO 70%",
    img: "/Asset/Image/Slide/istockphoto-1386173530-170667a.png",
    content: "Get great deals on amazing multiplayer games.",
  },
  {
    h1: "Captain Price and TF 141 face off against",
    img: "/Asset/Image/Slide/MWII-S04-FREE-ACCESS-TOUT.jpg",
    content: " The ultimate threat in Call of Duty®: Modern Warfare® III",
  },
];

function SlideShow() {
  const swiperParams: any = {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
  };

  return (
    <>
      <Swiper
        {...swiperParams}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {slide.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              className="relative w-[100%] lg:h-[600px] object-cover"
              src={Images(item.img)}
              alt="Slide 1"
            />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center z-1 text-white">
              <h1 className="text-[37px] font-bold [text-shadow:_0_2px_10px_rgb(0_0_0_/_70%)]">
                {item.h1}
              </h1>
              <p className="text-[24px] [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                {item.content}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SlideShow;
