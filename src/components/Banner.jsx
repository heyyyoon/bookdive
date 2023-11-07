import React from 'react';

export default function Banner() {
  return (
    <section className='h-60 bg-zinc-400 relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-50' />
      <div className='absolute w-full top-20 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-6xl'>Book Dive</h2>
        <p className='text-2xl mt-2'>생각을 정리하고 소통하는 공간</p>
      </div>
    </section>
  );
}
