import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBookRanking, getBookReview } from "../api/firebase";
import CardSlider from "../components/slider/CardSlider ";
import Loading from "../components/Loading";
import BookCard from "../components/card/BookCard";
import ReviewCard from "../components/card/ReviewCard";
import SlideView from "../components/SlideView";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { isLoading:loadingBooks, data: books } = useQuery(["hotBooks"], () => getBookRanking());
  const { isLoading:loadingReviews, data: reviews } = useQuery(["hotReviews"], () => getBookReview());
  
  const renderBookCards = (books) => (
    <CardSlider>
      {books.map((book, index) => (
        <BookCard
          key={uuidv4()}
          rank={index + 1}
          bookInfo={{
            title: book.title,
            contents: book.contents,
            thumbnail: book.thumbnail,
            authors: book.authors,
            bookId: book.bookId,
          }}
        />
      ))}
    </CardSlider>
  );

  const renderReviewCards = (reviews) => (
    <CardSlider>
      {reviews.map((r, index) => <ReviewCard key={r.reviewId} reviews={r} />)}
    </CardSlider>
  );

  return (
    <section className="pt-top-basic">
       <SlideView 
        data={books} 
        loading={loadingBooks}
        title="Hot Books"
        renderItem={renderBookCards}
        bgColor='bg-[#ece7e7fa]'
      />
        <SlideView 
          data={reviews} 
          loading={loadingReviews}
          title="Hot Reviews"
          renderItem={renderReviewCards}
          bgColor='bg-[#F0E5DE]'
        />
    </section>
  );
}
