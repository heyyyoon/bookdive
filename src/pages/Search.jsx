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

  return (
    <>
      <h1 className="text-2xl text-center m-5">검색 결과</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg-grid-cols-5 gap-6 p-4">
        {books &&
          books.map((book) => {
            return <BookCard key={uuidv4()} bookInfo={{
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
