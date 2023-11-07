import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Like({ isLiked }) {
  return (
    <div className="text-2xl transition-all group-hover:scale-110">
      {isLiked ? (
        <GoHeartFill className="text-[#ff7474]" />
      ) : (
        <GoHeart className="text-[#887C8D]" />
      )}
    </div>
  );
}
