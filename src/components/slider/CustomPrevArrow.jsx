import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

export default function CustomPrevArrow({ onClick }) {
    return (
        <button
        className="z-10 absolute top-1/2 left-0 transform -translate-y-1/2 bg-zinc-500 hover:bg-zinc-400 text-white font-bold rounded-full p-2 text-3xl"
        onClick={onClick}
      >
       <MdOutlineArrowBackIos />
      </button>
    );
}

