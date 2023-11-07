import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

export default function CustomPrevArrow({ onClick, arrowColor }) {
    return (
        <button
        className={`z-3 absolute top-1/2 -left-12 transform -translate-y-1/2 ${arrowColor} hover:brightness-110 text-white font-bold rounded-full p-2 text-3xl`}
        onClick={onClick}
      >
       <MdOutlineArrowBackIos />
      </button>
    );
}

