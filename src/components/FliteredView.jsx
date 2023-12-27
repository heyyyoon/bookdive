import MyLikeReviews from "./MyLikeReviews";
import MyPostReviews from "./MyPostReviews";

export default function FliteredView({ mode, userId }) {
  const renderComponentByMode = () => {
    switch (mode) {
      case "All":
        return (
          <>
            <div className="pb-20"><MyPostReviews userId={userId} /></div>
            <div className="pb-20"><MyLikeReviews /></div>
          </>
        );
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