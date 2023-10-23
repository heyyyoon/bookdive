import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getPost } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import MyPageCard from '../components/MyPageCard';

export default function Mypage() {
    const { user, userId } = useAuthContext();
    const { data:reviews } = useQuery(['review', userId], () => getPost(userId));

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
          <article>
          <p className='text-xl'>내가 작성한 글</p>
            <ul className='grid grid-cols-4'>
              {reviews && reviews.map(r => 
                <MyPageCard 
                  key={r.reviewId} 
                  reviews={r}
              />)
            }
            </ul>
            </article>
            <article>
            <p className='text-xl'>좋아요 한 글</p>

            </article>
            
          </article>
        </section>
    );
}

