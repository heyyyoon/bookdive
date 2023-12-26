import { FaPenToSquare, FaTrash } from "react-icons/fa6";
const ICON_CLASS = "cursor-pointer hover:text-[#5c432e] mx-auto text-3xl";

export default function PostStateChangeBtn({onOpen, onModify}) {
  return (
    <div className="text-[#5a5546] bg-[#ffffff63] rounded-full flex items-center p-3">
      <FaTrash className={ICON_CLASS} onClick={onOpen} />
      <FaPenToSquare className={ICON_CLASS} onClick={onModify} />
    </div>
  );
}
