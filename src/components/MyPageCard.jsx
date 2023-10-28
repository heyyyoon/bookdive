import React, { useState } from 'react';
import { getBooks } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from './ReviewModal';

export default function MyPageCard({reviews, rank}) {
    const { data:book } = useQuery(['book', reviews.bookId], () => getBooks(reviews.bookId));
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='shadow-custom rounded-xl m-[10px] bg-[#EEEEEE] relative'>
            {isModalOpen && (
                <ReviewModal
                    review={reviews}
                    book={book}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div onClick={() => setIsModalOpen(true)} className=''>
                <div className='flex flex-row items-center p-4 mx-2'>
                    <img className='w-[25%] shadow-customBook border-2'
                    src={book && book.thumbnail} alt="" />
                    <div className='ml-2'>
                        <p className='font-semibold text-[0.8rem] leading-4 mb-1'>{book && book.title}</p>
                        <p className='text-[0.75rem]'>{book && `[${book.authors}]`}</p>
                    </div>
                </div>
                <div className='h-[260px] '> 
                    <p className='font-mono font-[600] text-[1rem] text-center mb-2 bg-white mx-2 rounded-xl p-4'> {reviews.reviewTitle} </p>
                    <p className='text-[0.85rem] line-clamp-5 text-left px-4'>{reviews.reviewContent}</p>
                </div>
            </div>
        </div>
    );
}

