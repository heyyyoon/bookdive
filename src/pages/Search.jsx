import React from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { v4 as uuidv4 } from "uuid";
import Kakao from "../api/kakao";
import { useQuery } from "@tanstack/react-query";
import BookCardR from "../components/BookCardR";

export default function Search() {
  const { keyword } = useParams();
  const kakao = new Kakao();
  const {
    isLoading,
    error,
    data: books,
  } = useQuery(['books', keyword], () => kakao.search(keyword));

  return (
    <>
      <h1 className="text-2xl text-center m-10 text-zinc-700 border-2 py-3 rounded-full">Search for book : '{keyword}'</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg-grid-cols-5 gap-4 p-4">
        {books &&
          books.map((book) => {
            return <BookCardR key={uuidv4()} bookInfo={{
              title: book.title,
              contents: book.contents,
              thumbnail: book.thumbnail,
              authors: book.authors[0],
              bookId: (book.isbn.split(" ")[0] || book.isbn).trim(), 
            }} />;
          })}
      </ul>
    </>
  );
}
