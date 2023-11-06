import React from 'react';

export default function CardGrid({children}) {
  return (
    <ul className="grid grid-cols-1 custom-2:grid-cols-2 custom-3:grid-cols-3 custom-4:grid-cols-4 pt-[30px]">
      {children}
    </ul>
  );
}
