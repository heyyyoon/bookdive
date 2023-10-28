import React from "react";
import Loading from "./Loading";

export default function SlideView({ title, loading, data, renderItem, bgColor}) {
  return (
    <section className={`w-full ${bgColor}`}>
      <div className="w-[80%] lg:w-[90%] m-auto pb-10 mb-16 pt-3">
        <h1 className="w-36 m-auto rounded-full text-center text-lg text-[#534847] font-semibold mb-5 border-[2px] border-[#534847] bg-white">
          {title}
        </h1>
        {loading ? <Loading /> : data && renderItem(data)}
      </div>
    </section>
  );
}
