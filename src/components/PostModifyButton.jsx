import { FaPenToSquare, FaTrash } from "react-icons/fa6";
const BUTTON_CLASS =
  " flex items-center jsutify-center px-3 py-2 rounded-full text-medigrey border-2 font-bold hover:cursor-pointer hover:-translate-y-[2px] duration-100 text-sm";

export default function PostModifyButton({handleModify, openConfirm}) {
  const onClickModify = (e) => {
    e.stopPropagation();
    handleModify();
    
  }
  const onClickConfirm = (e) => {
    e.stopPropagation();
    openConfirm();
  }
  return (
    <div className="flex justify-center gap-3">
      <div className={`${BUTTON_CLASS} border-[#79796f]`} onClick={onClickModify}>
        <FaPenToSquare />
        <p className="ml-1">수정</p>
      </div>
      <div
        className={`${BUTTON_CLASS} border-[#79796f]`}
        onClick={onClickConfirm}
      >
        <FaTrash />
        <p className="ml-2">삭제</p>
      </div>
    </div>
  );
}
