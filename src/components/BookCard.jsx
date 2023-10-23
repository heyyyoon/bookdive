import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({bookInfo, bookInfo : {bookTitle, bookContents, bookAuthors, bookThumbnail, bookId}}) {
    const navigate = useNavigate();
    return (
        <li className='bg-[#FFFAFA] overflow-hidden'>
            <img
                className='w-[60%]' 
                onClick={() => {
                    navigate(`/search/${bookId}`, {state: {bookInfo}});
                }}
                src={bookThumbnail} alt="Not found" />
            <p className='mt-2'>{bookTitle}</p>
            <p>{bookAuthors}</p>
            <p className=' line-clamp-5'>{bookContents}</p>
        </li>
    );
}



