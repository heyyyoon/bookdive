import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import CustomPrevArrow from "./slider/CustomPrevArrow";
import CustomNextArrow from "./slider/CustomNextArrow";
import { useCallback, useState } from "react";

const StyledSlider = styled(Slider)`

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
  const [dragging, setDragging] = useState(false);
 
const handleBeforeChange = useCallback(() => {
   setDragging(true);
  }, []);
 
const handleAfterChange = useCallback(() => {
  setDragging(false);
  }, []);
  
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
    touchThreshold : 100,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
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
