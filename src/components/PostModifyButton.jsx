import { FaPenToSquare, FaTrash } from "react-icons/fa6";
const BUTTON_CLASS =
  " flex items-center jsutify-center px-3 py-2 rounded-full text-medigrey border-2 font-bold hover:cursor-pointer hover:-translate-y-[2px] duration-100 text-sm";

export default function PostModifyButton({handleModify, openConfirm}) {

  return (
    <div className="flex justify-center gap-3">
      <div className={`${BUTTON_CLASS} border-[#79796f]`} onClick={handleModify}>
        <FaPenToSquare />
        <p className="ml-1">수정</p>
      </div>
      <div
        className={`${BUTTON_CLASS} border-[#79796f]`}
        onClick={openConfirm}
      >
        <FaTrash />
        <p className="ml-2">삭제</p>
      </div>
    </div>
  );
}
