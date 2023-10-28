import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCardT({bookInfo, bookInfo : {title, contents, authors, thumbnail, bookId}}) {
    const navigate = useNavigate();
    return (
            <div className='bg-[#f0f1d9c5] rounded-xl m-[10px] p-5'>
                <div className='mb-2'
                    onClick={() => {
                        navigate(`/detail/${bookId}`, {state: {bookInfo}});
                    }}> 
                    <img
                        className='w-[60%] border-2 border-white shadow-3xl m-auto mt-[-15%] mb-3' 
                        src={thumbnail} alt="Not found" />
                    <div className='h-[55px]'>
                        <p className='font-semibold text-center mt-2 text-zinc-950 text-[0.95rem] leading-5 line-clamp-2'>
                            {title}
                        </p>
                        <p className='text-xs text-center'>{`[ ${authors} ]`}</p>
                    </div>
                </div>
                <div className=''>
                    <p className='text-[0.8rem] line-clamp-4'>{contents}</p>
                </div>
        </div>
    );
}
