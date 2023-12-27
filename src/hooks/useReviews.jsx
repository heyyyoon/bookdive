import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReview,
  delReview,
  getBookReview,
  getReviews,
  getUserLikeReviewsInfo,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function useReviews() {
  const { userId } = useAuthContext();
  const queryClient = useQueryClient();

  const getHotReviews = useQuery(["hotReviews"], () => getBookReview());
  const getAllReviews = useQuery(["allReview"], () => getReviews());
  const getLikeReviews = useQuery(["likeReviews"], () => getUserLikeReviewsInfo(userId), {
    enabled: false, 
  });

  const delReviewMutation = useMutation(({bookId, reviewId}) => delReview({reviewId, bookId}), {
    onSuccess: ()=> {
      queryClient.invalidateQueries(['allReview'])
    },
  });
  useEffect(() => {
    const triggerGetLikeReviews = () => {
      getLikeReviews.refetch(); 
    };
    
    if (userId) {
      triggerGetLikeReviews();
    }
  }, [userId, getLikeReviews]);


  const addPost = useMutation(
    ({ review, rating, bookId, userId }) =>
      addReview({ ...review, rating }, bookId, userId)
  );

  return { getHotReviews, addPost, getAllReviews, getLikeReviews, delReviewMutation };
}
