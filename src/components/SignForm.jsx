import React, { useState } from "react";
import InputButton from "./ui/InputButton";
import Back from "./ui/Back";

const INPUT_TEXT_CLASS = "rounded-xl border-[#EEEEEE] p-2";

export default function SignForm({ loginMode, onSign, modeChange }) {
  const [signInfo, setSignInfo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSign(signInfo);
  };
  return (
    <form className="flex flex-col mt-3 mb-3" onSubmit={handleSubmit}>
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
      {!loginMode && (
        <input
          className={INPUT_TEXT_CLASS}
          name="nickname"
          required
          onChange={handleChange}
          value={signInfo.nickname ?? ""}
          placeholder="닉네임"
        />
      )}
      <InputButton text={loginMode ? "로그인" : "회원가입"} />
      {loginMode ? (
        <InputButton text="회원가입하기" onClick={modeChange} />
      ) : (
        <Back onClick={modeChange} />
      )}
    </form>
  );
}
