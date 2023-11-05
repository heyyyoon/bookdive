import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import CustomPrevArrow from "../ui/CustomPrevArrow";
import CustomNextArrow from "../ui/CustomNextArrow";
import { useModalContext } from "../../context/ModalContext";

const StyledSlider = styled(Slider)`
.slick-list {
  z-index: 0;
}
.slick-slide div {
  cursor: pointer;
}

.slick-dots {
  bottom: -30px;
}

.slick-track {
  overflow-x: hidden;
  padding-top: 30px;
`;

export default function CardSlider({ children }) {

  const { beforeChange, afterChange } = useModalContext();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    draggable: true,
    swipeToSlide: true,
    touchThreshold : 100,
    beforeChange: beforeChange,
    afterChange: afterChange,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 550,
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
