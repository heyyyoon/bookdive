import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({bookInfo, bookInfo : {title, contents, authors, thumbnail, bookId}}) {
    const navigate = useNavigate();
    return (
        <li className='bg-[#FFFAFA] overflow-hidden'>
            <img
                className='w-[60%]' 
                onClick={() => {
                    navigate(`/detail/${bookId}`, {state: {bookInfo}});
                }}
                src={thumbnail} alt="Not found" />
            <p className='mt-2'>{title}</p>
            <p>{authors}</p>
            <p className=' line-clamp-5'>{contents}</p>
        </li>
    );
}



