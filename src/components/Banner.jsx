import React from 'react';

export default function Banner() {
  return (
    <section className='h-72 bg-blue-100 relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-80' />
      <div className='absolute w-full top-24 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-6xl'>Book Dive</h2>
        <p className='text-2xl mt-2'></p>
      </div>
    </section>
  );
}
