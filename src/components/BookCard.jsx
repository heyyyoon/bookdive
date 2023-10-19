import React from 'react';

export default function BookCard({bookInfo : {title, contents, authors, thumbnail}}) {

    return (
        <li className='bg-[#FFFAFA] overflow-hidden'>
            <img
                className='w-[60%]' 
                src={thumbnail} alt="bookImage" />
            <p className='mt-2'>{title}</p>
            <p>{authors}</p>
            <p className=' line-clamp-5'>{contents}</p>
        </li>
    );
}



