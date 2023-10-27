import React from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { v4 as uuidv4 } from "uuid";
import Kakao from "../api/kakao";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  const { keyword } = useParams();
  const kakao = new Kakao();
  const {
    isLoading,
    error,
    data: books,
  } = useQuery(['books', keyword], () => kakao.search(keyword));

  console.log(books);
  return (
    <section>
      <p className="p-3 font-semibold text-center text-xl m-5">Search Result</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {books &&
          books.map((book) => {
            return <BookCard key={uuidv4()} bookInfo={{
              title: book.title,
              contents: book.contents,
              thumbnail: book.thumbnail || `/images/noImage.jpg`,
              authors: (book.authors[0] || ' - '),
              bookId: (book.isbn.split(" ")[0] || book.isbn).trim(), 
            }} />;
          })}
      </ul>
    </section>
  );
}
