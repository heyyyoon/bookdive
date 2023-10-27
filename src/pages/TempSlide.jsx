import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getBookReview } from "../api/firebase";
import BookCardD from "../components/BookCardD";
import MyPageCard from "../components/MyPageCard";

export default function TempSlide({books}) {
  //const { data: books } = useQuery(["hotBooks"], () => getBookRanking());
  const { data: reviews } = useQuery(["hotReviews"], () => getBookReview());

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScoll: 1,
        },
      },
    ],
  };
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="z-10 absolute -left-8 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-400 text-white font-bold rounded-l-md"
      onClick={onClick}
    >
      ⬅️
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="z-10 absolute -right-8 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-400 text-white font-bold rounded-r-md"
      onClick={onClick}
    >
      ➡️
    </button>
  );
  const ReviewPrevArrow = ({ onClick }) => (
    <button
      className="z-10 absolute -left-8 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-400 text-white font-bold rounded-l-md"
      onClick={onClick}
    >
      ⬅️
    </button>
  );

  const ReviewNextArrow = ({ onClick }) => (
    <button
      className="z-10 absolute -right-8 top-1/2 transform -translate-y-1/2 bg-black hover:bg-gray-400 text-white font-bold rounded-r-md"
      onClick={onClick}
    >
      ➡️
    </button>
  );
  const StyledSlider = styled(Slider)`
    .slick-list {
      width: 100%;
      
    }

    .slick-slide div {
      cursor: pointer;
      padding: 5px;
      padding-top: 10px
    }

    .slick-dots {
      bottom: 20px;
      margin-top: 200px;
    }

    .slick-track {
      overflow-x: hidden;
    }
  `;
  const StyledSliderReview = styled(Slider)`
    .slick-list {
      width: 100%;
    }

    .slick-slide div {
      cursor: pointer;
      padding: 5px;
      padding-top: 10px
    }

    .slick-dots {
      bottom: 20px;
      margin-top: 200px;
    }

    .slick-track {
      overflow-x: hidden;
    }
  `;
  return (
    <div>
      <ul className="m-10">
        <h1 className="text-2xl">Hot Books</h1>
        <StyledSlider
          {...settings}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
        >
          {books &&
            books.map((book) => {
              return (
                <BookCardD
                  key={uuidv4()}
                  bookInfo={{
                    title: book.title,
                    contents: book.contents,
                    thumbnail: book.thumbnail,
                    authors: book.authors[0],
                    bookId: book.bookId,
                  }}
                  />
              );
            })}
        </StyledSlider>
      </ul>
      <ul className="h-[300px] opacity-100 m-10 ">
      <h1 className="text-2xl">Hot Reviews</h1>
        <StyledSliderReview
          {...settings}
          prevArrow={<ReviewPrevArrow />}
          nextArrow={<ReviewNextArrow />}
        >
          {reviews &&
            reviews.map((r) => (
              <div className="my-10">
                <MyPageCard key={r.reviewId} reviews={r} />
              </div>
            ))}
        </StyledSliderReview>
      </ul>
    </div>
  );
}
