import React from 'react';
import LikeReviews from '../components/LikeReviews';
import { useLocation } from 'react-router-dom';

export default function LikeReview() {

    const {state: likeReviews} = useLocation();

    console.log(likeReviews)
    
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 2xl:grid-cols-5 p-4">
         {likeReviews && likeReviews.map(r => 
            <LikeReviews 
              key={r} 
              review={r}
          />)
        }
      </ul>
    );
}

