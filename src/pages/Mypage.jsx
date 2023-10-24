import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getUserLikeReviews, getPost } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import MyPageCard from '../components/MyPageCard';
import LikeReviews from '../components/LikeReviews';

export default function Mypage() {
    const { user, userId } = useAuthContext();
    const { data:reviews } = useQuery(['review', userId], () => getPost(userId));
    const { data:likeReviews } = useQuery(['likeReviews', userId], () => getUserLikeReviews(userId));

    return (
        <section className='m-5'>
        <article className='flex flex-row border-b-2 pb-3'>
          <p className='w-[20%]'>img</p>
            <div>
              <p className='text-2xl font-semibold mt-5'>{user.nickname}</p>
              <div className='grid grid-cols-3 gap-3 mt-10'>
                    <p className='w-32 h-32 bg-red-300'>follower</p>
                    <p className='w-32 h-32 bg-red-300'>follow</p>
                    <div className='w-32 h-32 bg-red-300 flex flex-col items-center justify-center '>
                      <p className='text-2xl text-center font-bold'>Likes</p>
                      <p className='text-3xl text-center'>{likeReviews ? likeReviews.length : 0}</p>
                    </div>
              </div>
            </div>
        </article>
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
            <ul className='grid grid-cols-4'>
              {likeReviews && likeReviews.map(r => 
                  <LikeReviews 
                    key={r} 
                    review={r}
                />)
              }
            </ul>
          </article>
        </section>
    );
}

