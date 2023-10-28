import React from 'react';

export default function ReviewItem({ title, content, style}) {
    return (
        <div className={style}>
             <div className='h-[35%] flex justify-center items-center mb-2'>
                <p className='font-mono font-[600] text-[1rem] line-clamp-3 text-center text-zinc-900'> 
                    {title}
                </p>
                </div>
            <p className='text-[0.85rem] line-clamp-5 text-left px-2 text-zinc-700'>{content}</p>
        </div>
    );
}

