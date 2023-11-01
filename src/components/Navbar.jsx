import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { logout } from "../api/firebase";
import Account from "../pages/Account";
import { FiSearch } from "react-icons/fi";
import Button from "./ui/Button";
import { ImProfile } from "react-icons/im";

export default function Navbar() {
  const [text, setText] = useState("");
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search/${text}`);
  };
  const handleLogout = () => {
    logout();
    navigate(`/home`);
  };
  return (
    <header className="px-5 py-3 bg-[#fdfcfc] shadow-3xl">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <Account onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
        <div className="w-3/12">
          <Link to="/">
            <h1 className="text-xl font-bold text-zinc-800">Book Dive</h1>
          </Link>
        </div>

        <form className="w-4/12 flex justify-center" onSubmit={handleSubmit}>
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
            <div className="flex flex-row items-center">
              <p><ImProfile /></p>
              <p className="text-lg font-semibold text-zinc-800">{user.nickname}</p>
            </div>
          )}
          {user && (
            <Link to="/mypage">
              <Button text="myPage"/>
            </Link>
          )}
          {user ? (
            <Button text="Logout" onClick={handleLogout} />
          ) : (
            <Button text="Login" onClick={() => setIsModalOpen(true)} />
          )}
        </div>
      </div>
    </header>
  );
}
