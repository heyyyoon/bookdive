import React, { useState } from 'react';
import { getBooks } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from './ReviewModal';

export default function MyPageCard({reviews}) {
    const { data:book } = useQuery(['book', reviews.bookId], () => getBooks(reviews.bookId));
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
                <img src={book && book.thumbnail} alt="" />
                <p>{book && book.title}</p>
                <p>{reviews.comment}</p>
                <p>{reviews.reviewTitle}</p>
                <p>{reviews.reviewContent}</p>
            </div>
        </li>
    );
}

