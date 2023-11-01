import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function CloseCircle({onClose}) {
    return (
        <IoIosCloseCircleOutline
        className="text-3xl text-zinc-600 cursor-pointer hover:text-red-400"
        onClick={onClose}
      />
    );
}

