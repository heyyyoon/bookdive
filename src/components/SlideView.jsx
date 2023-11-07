import React from "react";
import Loading from "./Loading";
import CardSlider from "./slider/CardSlider ";
import CardGrid from "./slider/CardGrid";
import { LiaHotjar } from "react-icons/lia";

export default function SlideView({
  title,
  subtitle,
  arrowColor,
  loading,
  data,
  renderItem,
}) {
  return (
    <section className="w-[80%] lg:w-[90%] mx-auto max-w-basic">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center">
          <LiaHotjar className="text-[#694747] text-3xl" />
          <p className="ml-1 text-medigrey text-[20px] font-bold">{title}</p>
        </div>
        <p className="ml-1 mt-1 text-lightgrey text-[0.95rem] font-normal">
          {subtitle}
        </p>
      </div>
      {loading ? (
        <Loading />
      ) : data && data.length <= 4 ? (
        <CardGrid>{renderItem(data)}</CardGrid>
      ) : (
        <CardSlider arrowColor={arrowColor}>{renderItem(data)}</CardSlider>
      )}
    </section>
  );
}
