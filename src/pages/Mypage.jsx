import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getPost } from '../api/firebase';
import ReviewCard from '../components/ReviewCard';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from '../components/ReviewModal';

export default function Mypage() {
    const { user } = useAuthContext();
    const { data:reviews } = useQuery(['review'], () => getPost());
    const [ review, setReview ] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <section className='m-5'>
        <article className='flex flex-row border-b-2 pb-3'>
          <p className='w-[20%]'>img</p>
          <div>
          <p className='text-2xl font-semibold mt-5'>{user.nickname}</p>
          <div className='grid grid-cols-3 gap-3 mt-10'>
                <p className='w-32 h-32 bg-red-300'>follower</p>
                <p className='w-32 h-32 bg-red-300'>follow</p>
                <p className='w-32 h-32 bg-red-300'>내가 찜한 글</p>
          </div>
          </div>
          </article>
          <article>
          {isModalOpen &&<ReviewModal review={review} onClose={()=>setIsModalOpen(false)}/>}
            <p className='text-xl'>내가 작성한 글</p>
            <ul className='grid grid-cols-4'>
            
              {reviews && reviews.map(r => 
                <ReviewCard 
                  key={reviews.reviewId} 
                  reviews={r} 
                  openModal={()=>setIsModalOpen(true)} 
                  setReview={setReview}
              />)
            }
            </ul>
          </article>
        </section>
    );
}

