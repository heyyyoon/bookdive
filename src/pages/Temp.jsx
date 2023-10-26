import { useLocation } from "react-router-dom";
import LikeReviews from "../components/LikeReviews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css, keyframes } from "styled-components";

export default function Temp() {
const {state: likeReviews} = useLocation();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
        },
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
        },
    },
    {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScoll: 1,
        },
    },
    ],
  };
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="z-10 absolute -left-8 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-400 text-white font-bold rounded-l-md"
      onClick={onClick}
    >
      ⬅️
    </button>
  );
  
  const CustomNextArrow = ({ onClick }) => (
    <button
      className="z-10 absolute -right-8 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-400 text-white font-bold rounded-r-md"
      onClick={onClick}
    >
      ➡️
    </button>
  );
  const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
  }

  .slick-slide div {
       cursor: pointer; 
  }

  .slick-dots {
      bottom: -50px;
      margin-top: 200px;
  }

  .slick-track {
      overflow-x: hidden;
  }
`;

  return (
    <ul className="h-[300px] opacity-100 p-10">
        <StyledSlider {...settings} prevArrow={<CustomPrevArrow />} nextArrow={<CustomNextArrow />}>
        {likeReviews &&
            likeReviews.map((r) => <div className="m-3"><LikeReviews key={r} review={r} /></div>)}
        </StyledSlider>
    </ul>
  );
}
