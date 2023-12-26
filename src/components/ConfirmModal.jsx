import React from "react";
import Modal from "./Modal";

const BUTTON_CLASS = "text-lg font-semibold bg-yellow-200 py-2 px-5 rounded-lg hover:brightness-95";

export default function ConfirmModal({onYes, onNo}) {
  return (
    <Modal>
      <div className="flex flex-col items-center py-1">
        <p className="text-lg my-3">정말 삭제하시겠습니까?</p>
        <div className="mt-2 flex gap-5">
          <button className={BUTTON_CLASS} onClick={onYes}>Yes</button>
          <button className={BUTTON_CLASS} onClick={onNo}>No</button>
        </div>
      </div>
    </Modal>
  );
}
