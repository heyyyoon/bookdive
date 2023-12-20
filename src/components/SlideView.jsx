import React from "react";
import CardSlider from "./slider/CardSlider ";
import CardGrid from "./slider/CardGrid";

export default function SlideView({
  arrowColor,
  isGrid,
  children,
  dataLeng
}) {
  return (
    <>
      { dataLeng <= 4 ? (
        <CardGrid>{children}</CardGrid>
      ) : (
        <CardSlider arrowColor={arrowColor} setDrag>{children}</CardSlider>
      )}
    </>
  );
}
