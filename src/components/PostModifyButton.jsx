import { FaPenToSquare, FaTrash } from "react-icons/fa6";
const BUTTON_CLASS =
  "p-3 rounded-full border-2 border-[#cecec2] hover:cursor-pointer hover:-translate-y-[2px] duration-100 text-lg";

export default function PostModifyButton({handleModify, openConfirm}) {

  return (
    <div className="flex justify-center gap-3">
      <button className={`${BUTTON_CLASS} text-sky-600`} onClick={handleModify}>
        <FaPenToSquare />
      </button>
      <button
        className={`${BUTTON_CLASS} text-zinc-700`}
        onClick={openConfirm}
      >
        <FaTrash />
      </button>
    </div>
  );
}
