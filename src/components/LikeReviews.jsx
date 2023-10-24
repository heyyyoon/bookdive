import React from 'react';
import { getReviewByReviewId } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import MyPageCard from './MyPageCard';

export default function LikeReviews({review}) {
    const { data: likeReview } = useQuery(['likeReview', review], () => getReviewByReviewId(review));
    return (
        <div>
            {likeReview && <MyPageCard reviews={likeReview} />}
        </div>
    );
}

