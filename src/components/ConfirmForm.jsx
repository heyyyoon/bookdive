const BUTTON_CLASS = "font-semibold bg-zinc-300 py-1 px-3  hover:brightness-95";

export default function ConfirmForm({ onYes, onNo}) {
  return (
    <div className="absolute top-0 bg-[#ffffff6e] w-full h-full flex items-center justify-center">
      <div className="bg-white px-5 py-4 flex flex-col items-center w-fit shadow-customBook rounded-xl">
        <p className="text-darkgrey font-semibold mb-3">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex gap-5 text-darkgrey">
        <button className={BUTTON_CLASS} onClick={onYes}>
            Yes
          </button>
          <button className={BUTTON_CLASS} onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
