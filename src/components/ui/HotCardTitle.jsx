import { LiaHotjar } from "react-icons/lia";

export default function HotCardTitle({ text }) {
  return (
    <div className="flex flex-row items-center">
      <LiaHotjar className="text-[#694747] text-3xl" />
      <h2 className="ml-1 text-medigrey text-[20px] font-bold">{text}</h2>
    </div>
  );
}
