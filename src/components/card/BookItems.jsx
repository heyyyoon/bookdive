import React from 'react';

export default function BookItems({book}) {
    return (
        <div className="flex flex-row items-center bg-[#D9D4CF] px-4 py-4 border-b-[1px]">
        <img
          className="w-[25%] shadow-customBook border-2"
          src={book && book.thumbnail}
          alt=""
        />
        <div className="ml-2">
          <p className="font-semibold text-[0.8rem] leading-4 mb-1">
            {book && book.title}
          </p>
          <p className="text-[0.75rem]">{book && `[${book.authors}]`}</p>
        </div>
      </div>
    );
}

