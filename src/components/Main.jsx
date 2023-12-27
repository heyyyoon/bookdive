import { useModalContext } from "../context/ModalContext";
import ReviewModal from "../components/ReviewModal";
import HotBooks from "./HotBooks";
import HotReviews from "./HotReviews";

export const VIEW_CLASS = "w-[80%] lg:w-[90%] mx-auto max-w-basic py-result";

export default function Main() {
  const { isModalOpen } = useModalContext();

  return (
    <main className={VIEW_CLASS}>
      <HotBooks />
      <HotReviews/>
      {isModalOpen && <ReviewModal />}
    </main>
  );
}
