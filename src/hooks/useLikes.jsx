import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIsLiked, getLikes } from "../api/firebase";

export default function useLikes() {
  const queryClient = useQueryClient();

  const useGetIsLiked = (userId, reviewId) => {
    return useQuery(["liked"], () => getIsLiked(userId, reviewId));
  };
  const useGetLikes = (reviewId) => {
    return useQuery(["userByLikes"], () => getLikes(reviewId));  };

  const addLike = useMutation(({userId, reviewId}) => addLike(userId, reviewId), {
    onSuccess: ()=> queryClient.invalidateQueries(['userByLikes']),
  });
  const delLike = useMutation(({userId, reviewId}) => addLike(userId, reviewId), {
    onSuccess: ()=> queryClient.invalidateQueries(['userByLikes']),
  });

  return {
    useGetIsLiked,
    useGetLikes,
    addLike,
    delLike,
  };
}
