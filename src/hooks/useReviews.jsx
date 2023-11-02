import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addReview,
  getBookReview,
  getReviews,
  getReviewsAAA,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function useReviews() {
  const { userId } = useAuthContext();

  const queryClient = new QueryClient();

  const getLikeReviews = useQuery(["likeReviews"], () => getReviewsAAA(userId), {
    enabled: false, 
  });

  const triggerGetLikeReviews = () => {
    getLikeReviews.refetch(); 
  };

  useEffect(() => {
    if (userId) {
      triggerGetLikeReviews();
    }
  }, [userId]);

  //const getLikeReviews = useQuery(["likeReviews"], () => getReviewsAAA(userId));

  const getHotReviews = useQuery(["hotReviews"], () => getBookReview());

  const getAllReviews = useQuery(["allReview"], () => getReviews());

  const addNewReview = useMutation(
    ({ review, rating, bookId, userId }) =>
      addReview({ ...review, rating }, bookId, userId),
    {
      onSuccess: () => queryClient.invalidateQueries(["review"]),
    }
  );

  return { getHotReviews, addNewReview, getAllReviews, getLikeReviews };
}
