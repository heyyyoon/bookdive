import React, { useState } from 'react';
import { getBooks } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from './ReviewModal';

export default function MyPageCard({reviews}) {
    const { data:book } = useQuery(['book', reviews.bookId], () => getBooks(reviews.bookId));
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <li className='shadow-custom bg-[#9babaf44] rounded-xl overflow-hidden h-full'>
            {isModalOpen && (
                <ReviewModal
                    review={reviews}
                    book={book}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div onClick={() => setIsModalOpen(true)} className='h-full'>
                <div className='flex flex-row items-center p-4'>
                    <img className='w-[35%] shadow-customBook border-2 basis-1/4'
                    src={book && book.thumbnail} alt="" />
                    <div className='text-2xl ml-2'>
                        <p className='font-semibold text-[0.9rem] leading-4'>{book && book.title}</p>
                        <p className='text-[0.8rem]'>{book && `[${book.authors}]`}</p>
                    </div>
                </div>
                <div className='h-full bg-[#FEFEFE] p-4'> 
                    <p className='font-semibold text-[0.95rem] text-center mb-2'> {reviews.reviewTitle} </p>
                    <p className='text-[0.85rem] line-clamp-5 text-left'>{reviews.reviewContent}</p>
                </div>
            </div>
        </li>
    );
}

