import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { logout } from "../api/firebase";
import { FiSearch } from "react-icons/fi";
import Account from "../pages/Account";
import Button from "./ui/Button";
import SuccessMsg from "./ui/SuccessMsg";
import UserInfo from "./ui/UserInfo";
import WarningMsg from "./ui/WarningMsg";

export default function Navbar() {
  const { keyword } = useParams();
  const [text, setText] = useState("");
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text === "") {
      setWarning("검색어를 입력하세요 !");
      
    }
    navigate(`/search/${text}`);
  };
  const handleLogout = async () => {
    await logout();
    setSuccess("로그아웃 되었습니다.");

    setTimeout(() => {
      setSuccess(null);
      navigate(`/home`);
    }, 2000);
  };

  useEffect(() => setText(keyword || ""), [keyword]);

  return (
    <header className="px-5 py-3 bg-[#fdfcfc] shadow-3xl">
      <div className="flex justify-between items-center max-w-basic mx-auto">
        <div className="w-3/12">
          <Link to="/">
            <h1 className="text-xl font-bold text-zinc-800">Book Dive</h1>
          </Link>
        </div>
        <form
          className="w-4/12 flex justify-center min-w-[250px]"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full rounded-l-md px-3 py-2 bg-yellow"
            type="text"
            placeholder="Search..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="rounded-r-md px-3 my-1 bg-[#DDDDDD] border-none">
            <FiSearch />
          </button>
        </form>

        <div className="flex items-center gap-3 w-3/12 justify-end">
          {user && (
            <>
              <UserInfo nickname={user.nickname} />
              <Link to="/mypage"><Button text="myPage" /></Link>
            </>
          )}
          {user ? (
            <Button text="Logout" onClick={handleLogout} />
          ) : (
            <Button text="Login" onClick={() => setIsModalOpen(true)} />
          )}
        </div>
      </div>
      {isModalOpen && (
        <Account onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      )}
      {warning && <WarningMsg text={warning} />}
      {success && <SuccessMsg text={success} />}
    </header>
  );
}
