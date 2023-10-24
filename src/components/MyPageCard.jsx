import React, { useState } from 'react';
import { getBooks } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from './ReviewModal';

export default function MyPageCard({reviews}) {
    const { data:book } = useQuery(['book', reviews.bookId], () => getBooks(reviews.bookId));
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <li>
            {isModalOpen && (
                <ReviewModal
                    review={reviews}
                    book={book}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div  className='h-[320px] shadow-2xl bg-[#FAF0E6] p-2 px-4 flex flex-col rounded-xl mb-10 relative items-center justify-center'
                onClick={() => setIsModalOpen(true)}>
                <div className='flex flex-row h-[50%] justify-center items-center'>
                    <img className='w-[50%]'
                        src={book && book.thumbnail} alt="" />
                    <div className='flex flex-col font-bold text-2xl'>
                        <p className='text-black text-lg'>{book && book.title}</p>
                        <p className='text-sm'>{book && book.authors}</p>
                    </div>
                </div>
                <div className='h-[50%]'> 
                <p className='font-semibold'>' {reviews.reviewTitle} '</p>
                <p className='text-sm line-clamp-5'>{reviews.reviewContent}</p>
                </div>
            </div>
        </li>
    );
}

