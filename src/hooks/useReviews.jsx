import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addReview,
  getBookReview,
  getReviews,
  getUserLikeReviewsInfo,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function useReviews() {
  const { userId } = useAuthContext();
  const queryClient = new QueryClient();

  const getHotReviews = useQuery(["hotReviews"], () => getBookReview());
  const getAllReviews = useQuery(["allReview"], () => getReviews());
  const getLikeReviews = useQuery(["likeReviews"], () => getUserLikeReviewsInfo(userId), {
    enabled: false, 
  });

  useEffect(() => {
    const triggerGetLikeReviews = () => {
      getLikeReviews.refetch(); 
    };
    
    if (userId) {
      triggerGetLikeReviews();
    }
  }, [userId, getLikeReviews]);


  const addNewReview = useMutation(
    ({ review, rating, bookId, userId }) =>
      addReview({ ...review, rating }, bookId, userId),
    {
      onSuccess: () => queryClient.invalidateQueries(["review"]),
    }
  );

  return { getHotReviews, addNewReview, getAllReviews, getLikeReviews };
}
