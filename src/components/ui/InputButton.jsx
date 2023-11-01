import React from 'react';

export default function InputButton({text, onClick}) {
    return (
        <button 
            className="text-xl p-2 bg-[#d38460] font-medium text-white mt-2 rounded-2xl hover:brightness-125 "
            onClick={onClick}
        >
            {text}
        </button>
    );
}

