import React, { useState } from 'react';
import ReviewModal from './ReviewModal';

export default function ReviewCard({reviews, book}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <li className=''>
            {isModalOpen && (
                <ReviewModal
                    review={reviews}
                    book={book}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div onClick={() => setIsModalOpen(true)}>
                <p>{book && book.title}</p>
                <p>{reviews.comment}</p>
                <p>{reviews.reviewTitle}</p>
                <p>{reviews.reviewContent}</p>
            </div>
        </li>
    );
}

