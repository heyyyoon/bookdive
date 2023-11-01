import React from 'react';

export default function Button({ text, onClick }) {
    return (
        <button
              className="text-zinc-800 text-lg font-semibold p-2 rounded-full hover:brightness-110"
              onClick={onClick}
            >
              {text}
            </button>
    );
}

