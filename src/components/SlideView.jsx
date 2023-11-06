import React from "react";
import Loading from "./Loading";
import CardSlider from "./slider/CardSlider ";
import CardGrid from "./CardGrid";

export default function SlideView({ title, loading, data, renderItem }) {
  return (
    <section className="w-[80%] lg:w-[90%] mx-auto mb-16 max-w-basic">
      <h1 className="w-40 pb-2 mx-auto text-xl text-center text-darkgrey border-b-2">
        {title}
      </h1>
      {loading ? (
        <Loading />
      ) : data && data.length <= 4 ? (
        <CardGrid>{renderItem(data)}</CardGrid>
      ) : (
        <CardSlider>{renderItem(data)}</CardSlider>
      )}
    </section>
  );
}
