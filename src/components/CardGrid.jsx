import React from 'react';

export default function CardGrid({children}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-[30px]">
      {children}
    </ul>
  );
}
