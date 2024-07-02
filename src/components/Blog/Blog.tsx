import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Images from "../../utils/Images";
import BlogData from "../../constants/Blog";

function Blog() {
  const swiperParams = {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      765: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1250: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    navigation: true,
  };

  return (
    <>
      <div className="max-w-[1250px] mx-auto px-4 mt-[20px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[500px]">
        <h1 className="text-[30px] font-bold">Blog</h1>
        <Swiper {...swiperParams} className="w-[100%] mt-[15px]">
          {BlogData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-[390px] h-[350px] xl:w-[490px] lg:w-[350px] md:w-[240px] sm:w-[500px]">
                <img
                  className="w-[100%] h-[250px] object-cover"
                  src={Images(item.image)}
                  alt="Slide 1"
                />
                <p className="h-[120px] bg-gray px-[5px]">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Blog;
