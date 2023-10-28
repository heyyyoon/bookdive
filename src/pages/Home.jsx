import { useQuery } from "@tanstack/react-query";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { getBookRanking, getBookReview } from "../api/firebase";
import MyPageCard from "../components/MyPageCard";
import CardSlider from "../components/slider/CardSlider ";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";

export default function Home() {
  const { isLoading:loadingBooks, data: books } = useQuery(["hotBooks"], () => getBookRanking());
  const { isLoading:loadingReviews, data: reviews } = useQuery(["hotReviews"], () => getBookReview());
  

  return (
    <section className="h-full">
      <section className="w-full my-10 bg-[#ece7e7fa] ">
        <div className="w-[80%] lg:w-[90%] m-auto pb-10 pt-3">
          <h1 className="w-36 m-auto rounded-full text-center text-lg text-[#534847] font-semibold mb-5 border-[2px] border-[#534847] bg-white">Hot Books</h1>  
          { loadingBooks 
            ? <Loading />
            :
            books && (
              <CardSlider>
                {books.map((book, index) => {
                  return (
                      <BookCard
                        key={uuidv4()}
                        rank={index+1}
                        bookInfo={{
                          title: book.title,
                          contents: book.contents,
                          thumbnail: book.thumbnail,
                          authors: book.authors,
                          bookId: book.bookId,
                        }}
                      />
                  );
                })}
              </CardSlider>
            )}
          
         
        </div>
      </section>
      <section className="w-full bg-[#F0E5DE]">
        <div className="w-[80%] lg:w-[90%] m-auto pb-10 pt-3">
        <h1 className="w-36 m-auto rounded-full text-center text-lg text-[#534847] font-semibold mb-5 border-[2px] border-[#534847] bg-white">Hot Reviews</h1>  
          { loadingReviews
            ? <Loading />
            :
            reviews && (
              <CardSlider>
                {reviews &&
                  reviews.map((r, index) => (
                      <MyPageCard key={r.reviewId} reviews={r} rank={index+1}/>
                  ))}
              </CardSlider>
            )
          }
          
        </div>
      </section>
    </section>
  );
}
