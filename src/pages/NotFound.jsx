import React from 'react';
import { Link } from 'react-router-dom';
import { RiAlarmWarningLine } from "react-icons/ri";
import { PiHouseLineFill } from "react-icons/pi";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center pt-20'>
      <div className='flex flex-col items-center'>
        <RiAlarmWarningLine className='text-4xl text-red-700' />
        <p className='text-xl ml-2'>페이지를 찾을 수 없습니다.</p>
      </div>
      <div className='pt-5 flex flex-row items-center text-red-500 hover:text-red-700'>
        <Link to="/home"><p>Home으로 이동하기</p></Link>
        <PiHouseLineFill className='text-2xl ml-2' />
      </div>
    </div>
  );
}

