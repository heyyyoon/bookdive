import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import { v4 as uuidv4 } from "uuid";

export default function Search() {
  const { state: books } = useLocation();

  const handleBook = (book) => {
    return {
      bookTitle: book.title,
      bookContents: book.contents,
      bookAuthors: book.authors[0],
      bookThumbnail: book.thumbnail,
      bookId: (book.isbn.split(" ")[0] || book.isbn).trim(),
    };
  };

  return (
    <>
      <h1 className="text-2xl text-center m-5">검색 결과</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg-grid-cols-5 gap-6 p-4">
        {books &&
          books.map((book) => {
            return <BookCard key={uuidv4()} bookInfo={handleBook(book)} />;
          })}
      </ul>
    </>
  );
}
