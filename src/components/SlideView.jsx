import React from "react";
import Loading from "./Loading";
import CardSlider from "./slider/CardSlider ";

export default function SlideView({ title, loading, data, renderItem }) {
  return (
    <section className="w-[80%] lg:w-[90%] mx-auto mb-16 max-w-basic">
      <h1 className="w-40 pb-2 mx-auto text-xl text-center text-darkgrey border-b-2">
        {title}
      </h1>
      {loading ? (
        <Loading />
      ) : data && data.length <= 4 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-[30px]">
          {renderItem(data)}
        </ul>
      ) : (
        <CardSlider>{renderItem(data)}</CardSlider>
      )}
    </section>
  );
}
