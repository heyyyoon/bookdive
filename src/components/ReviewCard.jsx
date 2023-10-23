import React from 'react';

export default function ReviewCard({reviews, openModal, setReview}) {
    const handleClick = () => {
        
        setReview(reviews);
     //   navigate('/post', {state: reviews})
        openModal();
    }
    return (
        <li className='' onClick={handleClick}>
           <img src={reviews.thumbnail} alt="bookThumbnail" />
           <p>{reviews.title}</p>
           <p>{reviews.comment}</p>
           <p>{reviews.reviewTitle}</p>
           <p>{reviews.reviewContent}</p>
        </li>
    );
}

