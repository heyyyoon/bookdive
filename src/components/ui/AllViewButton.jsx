import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";

export default function AllViewButton({onClick}) {
  return (
    <div
    className="group flex flex-row items-center z-10"
    onClick={onClick}
  >
    <p className="text-sm font-bold text-darkgrey">더보기</p>
    <BsFillDoorClosedFill className="block group-hover:hidden text-[3rem] text-[#857267]" />
    <BsFillDoorOpenFill className="hidden group-hover:block text-[3rem] text-[#857267]" />
  </div>
  );
}

