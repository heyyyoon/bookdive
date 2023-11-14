import { useMutation, useQuery } from '@tanstack/react-query';
import { addBook as addNewBook, getBookRanking, getBooks, getReviewByBookId } from '../api/firebase';

export default function useBooks() {

  const getHotBooks = useQuery(["hotBooks"], () => getBookRanking(), {staleTime: 5000});

  const  useGetBookReviews  = (bookId) => useQuery(["bookreview", bookId], () => getReviewByBookId(bookId), {staleTime: 5000});
  const  useGetBooks  = (bookId) => useQuery(["book", bookId], () => getBooks(bookId), {staleTime: 5000});

  const addBook = useMutation(({bookId, bookInfo}) => addNewBook(bookId, bookInfo));

  return { getHotBooks, addBook, useGetBookReviews, useGetBooks }
}