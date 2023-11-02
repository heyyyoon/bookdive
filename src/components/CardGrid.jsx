import React from 'react';

export default function CardGrid({children}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5">
      {children}
    </ul>
  );
}

