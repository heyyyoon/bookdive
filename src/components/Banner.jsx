import React from 'react';

export default function Banner() {
  return (
    <section className='h-64 relative bg-[#d3d1d1]'>
      <div className='w-full h-full bg-cover bg-banner opacity-40' />
      <div className='absolute w-full py-3 top-14 text-center'>
        <h2 className='text-6xl text-[#5a453a] font-semibold'>Book Dive</h2>
        <p className='text-[1.4rem] text-[#352a24] font-semibold mt-3'>생각을 기록하고 공유하며 소통하는 공간</p>
      </div>
    </section>
  );
}
