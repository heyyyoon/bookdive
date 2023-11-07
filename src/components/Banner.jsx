import React from 'react';

export default function Banner() {
  return (
    <section className='h-64 bg-[#c9c2be] relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-30' />
      <div className='absolute w-full py-3 top-14 text-center text-gray-50 drop-shadow-2xl'>
      
        <h2 className='text-6xl text-[#484e45] font-medium'>Book Dive</h2>
        <p className='text-2xl text-[#3D3530] font-semibold mt-3'>생각을 기록하고 소통하는 공간</p>
        
      </div>
    </section>
  );
}
