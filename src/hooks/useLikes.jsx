import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLike, delLike, getLikeInfo } from "../api/firebase";

export default function useLikes() {
  const queryClient = useQueryClient();

  const useGetLikeInfo = (userId, reviewId) => {
    return useQuery(["likedInfo", reviewId], () => getLikeInfo(userId, reviewId));
  };
  const addLikeMutation = useMutation(({userId, reviewId}) => addLike(userId, reviewId), {
    onSuccess: ()=> {
      queryClient.invalidateQueries('liked', 'userByLikes', 'likeReviews');
      
    },
  });
  const delLikeMutation = useMutation(({userId, reviewId}) => delLike(userId, reviewId), {
    onSuccess: ()=> {
      queryClient.invalidateQueries('liked', 'userByLikes', 'likeReviews');
    },
  });

  return {
    useGetLikeInfo,
    addLikeMutation,
    delLikeMutation,
  };
}
