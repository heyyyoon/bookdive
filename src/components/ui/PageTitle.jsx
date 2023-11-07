import React from 'react';

export default function PageTitle({title}) {
  
  return (
    <p className="text-xl text-medigrey mb-5 border-b-2 pb-3 font-semibold border-zinc-300">
      {title}
    </p>
  );
}

