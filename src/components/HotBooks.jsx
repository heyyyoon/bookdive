import React from "react";
import useBooks from "../hooks/useBooks";
import SlideView from "./SlideView";
import BookCard from "./card/BookCard";
import HotCardTitle from "./ui/HotCardTitle";
import HotCardSubTitle from "./ui/HotCardSubTitle";

export default function HotBooks() {
  const {
    getHotBooks: { isLoading: loadingBooks, data: books },
  } = useBooks();

  const renderBookCards = (books) =>
    books &&
    books.slice(0, 10).map((book, index) => (
      <BookCard
        key={book.bookId}
        rank={index + 1}
        bookInfo={{
          title: book.title,
          contents: book.contents,
          thumbnail: book.thumbnail,
          authors: book.authors,
          bookId: book.bookId,
        }}
      />
    ));

  return (
    <section className="pb-20 mt-5">
      <div className="flex flex-col items-start">
        <HotCardTitle text="인기있는 책 Top 10" />
        <HotCardSubTitle text="유저들이 선택한 책!" />
      </div>
      <SlideView
        data={books}
        loading={loadingBooks}
        renderItem={renderBookCards}
        arrowColor="bg-[#d6bbaf]"
      />
    </section>
  );
}
