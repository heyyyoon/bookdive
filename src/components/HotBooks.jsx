import useBooks from "../hooks/useBooks";
import SlideView from "./SlideView";
import BookCard from "./card/BookCard";
import HotCardTitle from "./ui/HotCardTitle";
import HotCardSubTitle from "./ui/HotCardSubTitle";
import Loading from "./Loading";

export default function HotBooks() {
  const {
    getHotBooks: { isLoading: loadingBooks, data: books },
  } = useBooks();

  return (
    <section className="pb-20 mt-5">
      <div className="flex flex-col items-start">
        <HotCardTitle text="인기있는 책 Top 10" />
        <HotCardSubTitle text="유저들이 선택한 책!" />
      </div>
      {loadingBooks && <Loading />}
      {books && (
        <SlideView arrowColor="bg-[#d6bbaf]" dataLeng={books.length}>
          {books
              .slice(0, 10)
              .map((book, index) => (
                <BookCard key={book.bookId} rank={index + 1} bookInfo={book}/>
              ))}
        </SlideView>
      )}
    </section>
  );
}
