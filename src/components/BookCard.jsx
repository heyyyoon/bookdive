import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({bookInfo, bookInfo : {title, contents, authors, thumbnail, bookId}}) {
    const navigate = useNavigate();
    return (
        <li className='shadow-xl bg-[#F0F0F0] flex flex-col justify-between rounded-xl mb-8 px-4 pb-3'>
            <div className='mb-2'> 
                <img
                    className='w-[70%] shadow-3xl m-auto mt-[-10%] mb-3' 
                    onClick={() => {
                        navigate(`/detail/${bookId}`, {state: {bookInfo}});
                    }}
                    src={thumbnail} alt="Not found" />
                <p className='font-semibold text-left mt-2 text-zinc-950 text-[0.95rem] leading-5 line-clamp-2'>
                    {title}
                </p>
                <p className='text-xs text-center'>{`[ ${authors} ]`}</p>
            </div>
            <div className=''>
                <p className='text-[0.8rem] line-clamp-4'>{contents}</p>
            </div>
        </li>
    );
}



