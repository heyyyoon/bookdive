import MyLikeReviews from "./MyLikeReviews";
import MyPostReviews from "./MyPostReviews";

export default function FliteredView({ mode, userId }) {
  const renderComponentByMode = () => {
    switch (mode) {
      case "Like":
        return <MyLikeReviews viewMode="grid" />;
      case "My post":
        return <MyPostReviews userId={userId} viewMode="grid" />;
      case "Follow":
      default:
        return null;
    }
  };

  return <>{renderComponentByMode()}</>;
}