import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Kakao from "../api/kakao";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/card/BookCard";
import Loading from "../components/Loading";
import PageTitle from "../components/ui/PageTitle";
import { VIEW_CLASS } from "../components/Main";

export default function Search() {
  const { keyword } = useParams();
  
  const kakao = new Kakao();
  const { isLoading, data: books } = useQuery(["search", keyword], () =>
    kakao.search(keyword)
  );

  return (
    <section className={VIEW_CLASS}>
      <div className="flex flex-col items-center">
        <PageTitle title="Search Result" />
        {isLoading ? (
          <Loading />
        ) : (
          books ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 pt-[30px]">
              {books.map((book) => {
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
          ) : <p className="mt-12">검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
