import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCardD({bookInfo, bookInfo : {title, contents, authors, thumbnail, bookId}}) {
    console.log(bookInfo);
    const navigate = useNavigate();
    return (
        <li className='shadow-xl flex flex-col justify-between rounded-xl py-5 bg-[#f4f7e7b0]'>
            <div className=''> 
                <img
                    className='w-[55%] shadow-3xl m-auto mt-[-12%]' 
                    onClick={() => {
                        navigate(`/detail/${bookId}`, {state: {bookInfo}});
                    }}
                    src={thumbnail} alt="Not found" />
                <div className='h-[60px] mt-3'>
                    <p className='font-semibold text-center mb-1 text-zinc-950 text-[0.95rem] leading-5 line-clamp-2 px-3'>
                        {title}
                    </p>
                    <p className='text-xs text-center'>{`[ ${authors} ]`}</p>
                </div>
            </div>
            <div className='h-[80px]'>
                <p className='px-3 text-[0.8rem] line-clamp-4'>{contents}</p>
            </div>
        </li>
    );
}
