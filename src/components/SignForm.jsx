import React, { useState } from "react";
import InputButton from "./ui/InputButton";
import Back from "./ui/Back";

const INPUT_TEXT_CLASS = "rounded-xl border-[#EEEEEE] p-2";

export default function SignForm({
  isSignIn,
  onSign,
  modeChange,
}) {
  const [signInfo, setSignInfo] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo((prev) => ({...prev, [name]: value}));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSign(signInfo);
  }
  return (
    <section className="mb-1">
      <form className="flex flex-col my-3" onSubmit={handleSubmit}>
        <input
          className={INPUT_TEXT_CLASS}
          type="email"
          name="email"
          onChange={handleChange}
          required
          autoComplete="off"
          value={signInfo.email ?? ""}
          placeholder="이메일"
        />
        <input
          className={INPUT_TEXT_CLASS}
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
          className={INPUT_TEXT_CLASS}
            name="nickname"
            required
            onChange={handleChange}
            value={signInfo.nickname ?? ""}
            placeholder="닉네임"
          />
        )}
        <InputButton text={isSignIn ? "로그인" : "회원가입"} />
        {isSignIn && <InputButton text="회원가입하기" onClick={modeChange} />}
      </form>
      {!isSignIn && <Back onClick={modeChange} />}
    </section>
  );
}
