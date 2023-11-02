import React from 'react';

export default function PageTitle({title}) {
  return (
    <p className="text-xl text-darkgrey border-b-2 pb-2">
      {title}
    </p>
  );
}

