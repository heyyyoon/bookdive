import { useQuery } from "@tanstack/react-query";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { getBookRanking, getBookReview } from "../api/firebase";
import MyPageCard from "../components/MyPageCard";
import CardSlider from "../components/CardSlider ";
import BookCardD from "../components/BookCardD";

export default function Home() {
  const { data: books } = useQuery(["hotBooks"], () => getBookRanking());
  const { data: reviews } = useQuery(["hotReviews"], () => getBookReview());

  return (
    <section className="">
      <section className="">
        <h1 className="text-center text-2xl font-semibold m-5">Hot Books</h1>
        {books && (
          <CardSlider>
            {books.map((book) => {
              return (
                <ul>
                  <BookCardD
                    key={uuidv4()}
                    bookInfo={{
                      title: book.title,
                      contents: book.contents,
                      thumbnail: book.thumbnail,
                      authors: book.authors,
                      bookId: book.bookId,
                    }}
                  />
                </ul>
              );
            })}
          </CardSlider>
        )}
      </section>
      <section>
        <h1 className="text-center text-2xl font-semibold">Hot Reviews</h1>
        {reviews && (
          <CardSlider>
            {reviews &&
              reviews.map((r) => (
                <ul className="">
                  <MyPageCard key={r.reviewId} reviews={r} />
                </ul>
              ))}
          </CardSlider>
        )}
      </section>
    </section>
  );
}
