import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { addBook, getBookRanking, getBooks, getReviewByBookId } from '../api/firebase';

export default function useBooks() {
  const queryClient = useQueryClient();

  const getHotBooks = useQuery(["hotBooks"], () => getBookRanking());

  const  useGetBookReviews  = (bookId) => {
    return useQuery(["bookreview", bookId], () => getReviewByBookId(bookId));
  }

  const  useGetBooks  = (bookId) => {
    return useQuery(["book", bookId], () => {
      return getBooks(bookId)
    });
  }
  const addNewBook = useMutation(({bookId, bookInfo}) => addBook(bookId, bookInfo), {
    onSuccess: ()=> queryClient.invalidateQueries(['book']),
  });

  return { getHotBooks, addNewBook, useGetBookReviews, useGetBooks }
}