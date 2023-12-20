import React from "react";
import Loading from "./Loading";
import CardSlider from "./slider/CardSlider ";
import CardGrid from "./slider/CardGrid";

export default function SlideView({
  arrowColor,
  loading,
  data,
  renderItem,
}) {
  return (
    <div>
      {loading && <Loading />}
      { data && data.length <= 4 ? (
        <CardGrid>{renderItem(data)}</CardGrid>
      ) : (
        <CardSlider arrowColor={arrowColor}>{renderItem(data)}</CardSlider>
      )}
    </div>
  );
}
