import React, { useState } from 'react';
import ReviewModal from '../ReviewModal';

export default function ReviewCard1({reviews, book}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <li className='rounded-2xl overflow-hidden bg-[#f3e4c9c2] px-6 py-2'>
            {isModalOpen && (
                <ReviewModal
                    review={reviews}
                    book={book}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div 
                className='flex flex-col h-[300px] justify-between items-center'
                onClick={() => setIsModalOpen(true)}>
                    <div className='h-[35%] flex items-center'>
                        <p className='line-clamp-3'>{reviews.reviewTitle}</p>
                    </div>
                    <div className='h-[65%] flex items-start my-2'>
                        <p className='text-[0.8rem] line-clamp-6'>{reviews.reviewContent}</p>
                    </div>
            </div>
        </li>
    );
}

