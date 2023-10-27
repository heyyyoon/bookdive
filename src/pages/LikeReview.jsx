import React from 'react';
import { useLocation } from 'react-router-dom';
import MyPageCard from '../components/MyPageCard';

export default function LikeReview() {
    const {state: reviews} = useLocation();

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 2xl:grid-cols-5 p-4">
         {reviews && reviews.map(review => <MyPageCard key={review.reviewId} reviews={review} />)
        }
      </ul>
    );
}


