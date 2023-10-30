import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Kakao from "../api/kakao";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/card/BookCard";

export default function Search() {
  const { keyword } = useParams();
  const kakao = new Kakao();
  const {
    isLoading,
    error,
    data: books,
  } = useQuery(["books", keyword], () => kakao.search(keyword));

  return (
    <section className="pt-result max-w-basic mx-auto">
      <div className="flex flex-col items-center">
        <p className="text-xl border-b-2 pb-2 mb-10">Search Result</p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-1 gap-y-10 p-4">
          {books &&
            books.map((book) => {
              return (
                <BookCard
                  key={uuidv4()}
                  bookInfo={{
                    title: book.title,
                    contents: book.contents,
                    thumbnail: book.thumbnail || `/images/noImage.jpg`,
                    authors: book.authors[0] || " - ",
                    bookId: (book.isbn.split(" ")[0] || book.isbn).trim(),
                  }}
                />
              );
            })}
        </ul>
      </div>
    </section>
  );
}
