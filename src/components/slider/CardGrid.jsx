import React from 'react';

export const CARD_GRID_CLASS = "grid grid-cols-1 custom-2:grid-cols-2 custom-3:grid-cols-3 custom-4:grid-cols-4 pt-[30px] gap-y-10";
export default function CardGrid({children}) {
  return (
    <ul className={CARD_GRID_CLASS}>
      {children}
    </ul>
  );
}
