import React from 'react';

export default function ModalChild({children}) {
  return (
    <div className="absolute top-0 bg-[#ffffff6e] w-full h-full flex items-center justify-center">
      <div className="bg-white px-5 py-4 flex flex-col items-center w-fit shadow-customBook rounded-xl">
        {children}
      </div>
    </div>
  );
}

