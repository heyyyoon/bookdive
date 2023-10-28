import React from 'react';

export default function ReviewItem({ title, content, style}) {
    return (
        <div className={style}>
             <div className='h-[35%] flex justify-left items-center'>
                <p className='font-sans font-bold text-[0.95rem] line-clamp-2 text-center text-zinc-950'> 
                    {title}
                </p>
                </div>
            <p className='text-[0.85rem] line-clamp-5 text-left text-zinc-700'>{content}</p>
        </div>
    );
}

