import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";

export default function ResultSign({text}) {
  return (
    <div className='py-5 flex flex-row justify-center items-center'>
      <AiFillCheckCircle className='text-3xl text-[#aac05c]  animate-bounce' />
      <p className='ml-2 text-medigrey font-[550]'>{text}</p>
    </div>
  );
}

