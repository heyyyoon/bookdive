import { Rating } from "@smastrom/react-rating";

export default function StarRating({rating, styles}) {
  return (
    <div className={`${styles} flex flex-row text-zinc-800 items-center`}>
    <Rating value={Math.floor(rating)} readOnly={true} />
    <p className="text-[1em] ml-2 text-darkgrey">
      {rating && rating.toFixed(2)}
    </p>
  </div>
  );
}

