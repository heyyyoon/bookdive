import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import CustomPrevArrow from "./slider/CustomPrevArrow";
import CustomNextArrow from "./slider/CustomNextArrow";

const StyledSlider = styled(Slider)`
.slick-list {
  margin: auto;
  width: 80%;
  @media (min-width: 1000px) {
    width: 90%;
  }
  height: 550px;
  background-color: yellow;
}

.slick-slide div {
  cursor: pointer;
  padding: 5px;
}

.slick-dots {
  bottom: 20px;
  margin-top: 200px;
}

.slick-track {
  overflow-x: hidden;
  padding-top: 30px;
  height: 100%;
}
`;

export default function CardSlider({ children }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    //autoplay: true,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScoll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
      <StyledSlider
        {...settings}
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
      >
        {children}
      </StyledSlider>
  );
}
