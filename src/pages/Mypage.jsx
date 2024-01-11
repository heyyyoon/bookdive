import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import ReviewModal from "../components/ReviewModal";
import { useModalContext } from "../context/ModalContext";
import UserInfo from "../components/ui/UserInfo";
import { VIEW_CLASS } from "../components/Main";
import FilteredButton from "../components/FilteredButton";
import FliteredView from "../components/FliteredView";

const viewMode = ["My post", "Like", "Follow"];

export default function Mypage() {
  const { userId, user } = useAuthContext();
  const { isModalOpen } = useModalContext();
  const [mode, setMode] = useState(viewMode[0]);

  return (
    <section className={VIEW_CLASS}>
      <div className="flex flex-col md:flex-row justify-between mb-10 p-8 rounded-xl items-center bg-gradient-to-r from-[#eee6e634] to-[#c5c7ac4f]">
        <UserInfo nickname={user && user.nickname} />
        <FilteredButton
          onChangeMode={(select) => setMode(select)}
          mode={mode}
          viewMode={viewMode}
        />
      </div>
      <FliteredView mode={mode} userId={userId} />
      {isModalOpen && <ReviewModal />}
    </section>
  );
}