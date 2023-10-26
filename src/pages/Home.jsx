import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { getBookRanking, getBookReview } from "../api/firebase";
import BookCard from "../components/BookCard";
import MyPageCard from "../components/MyPageCard";

export default function Home() {
  const { data: books } = useQuery(["hotBooks"], () => getBookRanking());
  const { data: reviews } = useQuery(["hotReviews"], () => getBookReview());

  return (
    <section  className="px-5">
      <article>
        <h1 className="text-center text-2xl font-semibold m-5">Hot Books</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
          {books &&
            books.map((book) => {
              return (
                <BookCard
                  key={uuidv4()}
                  bookInfo={{
                    title: book.title,
                    contents: book.contents,
                    thumbnail: book.thumbnail,
                    authors: book.authors[0],
                    bookId: book.bookId,
                  }}
                />
              );
            })}
        </ul>
      </article>
      <article>
        <h1 className="text-center text-2xl font-semibold">Hot Reviews</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 p-4 gap-6">
              {reviews && reviews.map(r => 
                <MyPageCard
                  key={r.reviewId} 
                  reviews={r}
              />)
            }
          </ul>
      </article>
    </section>
  );
}
