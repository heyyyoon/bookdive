import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Post() {
    const { state: reviews } = useLocation();
    
    return (
        <section className='h-screen mt-10'>
            <div className='m-auto bg-slate-400 w-[50%] h-[30%]'>
            <div className='flex felx-row justify-center' > 
                <img src={reviews.thumbnail} alt="" />
                <p>{reviews.title}</p>
            </div>
            <div className='text-center mt-10'>
                <p className='text-2xl font-semibold mb-3'>{reviews.reviewTitle}</p>
                <p>{reviews.reviewContent}</p>
            </div>
            </div>
        </section>
    );
}

