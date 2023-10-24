import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({bookInfo, bookInfo : {title, contents, authors, thumbnail, bookId}}) {
    const navigate = useNavigate();
    return (
        <li className='drop-shadow-md bg-[#FAF0E6] p-2 px-4 flex flex-col justify-between rounded-xl mb-10'>
            <div className=''> 
            <img
                className='w-[60%] drop-shadow-2xl m-auto' 
                onClick={() => {
                    navigate(`/detail/${bookId}`, {state: {bookInfo}});
                }}
                src={thumbnail} alt="Not found" />
                <p className='text-left mt-2 text-zinc-950 font-semibold text-[0.95rem] leading-5 line-clamp-2'>{title}</p>
                <p className='text-xs text-right'>{authors}</p>
            </div>
            <div className=''>
                <p className='text-sm line-clamp-5'>{contents}</p>
            </div>
        </li>
    );
}



