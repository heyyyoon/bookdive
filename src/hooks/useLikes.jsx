import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLike, delLike, getIsLiked, getLikes } from "../api/firebase";

export default function useLikes() {
  const queryClient = useQueryClient();

  const useGetIsLiked = (userId, reviewId) => {
    return useQuery(["liked", reviewId], () => getIsLiked(userId, reviewId));
  };
  const useGetLikes = (reviewId) => {
    return useQuery(["userByLikes", reviewId], () => getLikes(reviewId)); 
  };

  const addLikeMutation = useMutation(({userId, reviewId}) => addLike(userId, reviewId), {
    onSuccess: ()=> {
      queryClient.invalidateQueries(['liked'])
      queryClient.invalidateQueries(['userByLikes'])
    },
  });
  const delLikeMutation = useMutation(({userId, reviewId}) => delLike(userId, reviewId), {
    onSuccess: ()=> {
      queryClient.invalidateQueries(['liked'])
      queryClient.invalidateQueries(['userByLikes'])
    },
  });

  return {
    useGetIsLiked,
    useGetLikes,
    addLikeMutation,
    delLikeMutation,
  };
}
