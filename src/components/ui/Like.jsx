import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Like({ isLiked }) {
  return (
    <div className="text-2xl transition-all hover:scale-110">
      {isLiked ? (
        <GoHeartFill className="text-red-500" />
      ) : (
        <GoHeart className="text-red-500" />
      )}
    </div>
  );
}
