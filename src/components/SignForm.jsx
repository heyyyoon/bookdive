import React, { useState } from "react";
import InputButton from "./ui/InputButton";

export default function Sign({
  isSignIn,
  onSign,
  modeChange,
}) {
  const [signInfo, setSignInfo] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    onSign(signInfo);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo((prev) => ({...prev, [name]: value}));
  }

  return (
    <section className="mb-3">
      <h1 className="text-lg border-b-[1px] pb-2 text-darkgrey">
        {isSignIn ? "로그인" : "회원가입"}
      </h1>
      <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="rounded-xl border-[#EEEEEE] p-2"
          type="email"
          name="email"
          onChange={handleChange}
          required
          autoComplete="off"
          value={signInfo.email ?? ""}
          placeholder="이메일"
        />
        <input
          className="rounded-xl border-[#EEEEEE] p-2"
          type="password"
          name="password"
          required
          autoComplete="off"
          onChange={handleChange}
          value={signInfo.password ?? ""}
          placeholder="비밀번호"
        />
        {!isSignIn && (
          <input
            className="rounded-xl border-[#EEEEEE] p-2"
            name="nickname"
            required
            onChange={handleChange}
            value={signInfo.nickname ?? ""}
            placeholder="닉네임"
          />
        )}
        {isSignIn && <InputButton text="로그인" />}
        <InputButton text="회원가입하기" onClick={modeChange} />
      </form>
    </section>
  );
}
