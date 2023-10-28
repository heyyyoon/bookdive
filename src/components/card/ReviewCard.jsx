import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from '../ReviewModal';
import ReviewItem from './ReviewItem';
import { getBooks } from '../../api/firebase';

export default function ReviewCard({reviews}) {
    const { data:book } = useQuery(['book', reviews.bookId], () => getBooks(reviews.bookId));
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='rounded-xl m-[10px] border-2 overflow-hidden '>
            {isModalOpen && (
                <ReviewModal
                    review={reviews}
                    book={book}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div onClick={() => setIsModalOpen(true)} className=''>
            <div className='flex flex-row items-center bg-[#D9D4CF] px-4 py-4 border-b-[1px]'>
                    <img className='w-[25%] shadow-customBook border-2'
                    src={book && book.thumbnail} alt="" />
                    <div className='ml-2'>
                        <p className='font-semibold text-[0.8rem] leading-4 mb-1'>{book && book.title}</p>
                        <p className='text-[0.75rem]'>{book && `[${book.authors}]`}</p>
                    </div>
                </div>
                <ReviewItem title={reviews.reviewTitle} content={reviews.reviewContent} style='bg-[#eeeeee2d] h-[200px] px-4 py-2'/>
            </div>
        </div>
    );
}

