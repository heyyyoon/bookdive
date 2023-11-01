import React from "react";
import InputButton from "./ui/InputButton";

export default function Sign({
  isSignIn,
  loginInfo,
  handleChange,
  handleSubmit,
  handleSignUp,
}) {
  return (
    <section className="text-center mb-3">
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
          value={loginInfo.email ?? ""}
          placeholder="이메일"
        />
        <input
          className="rounded-xl border-[#EEEEEE] p-2"
          type="password"
          name="password"
          required
          autoComplete="off"
          onChange={handleChange}
          value={loginInfo.password ?? ""}
          placeholder="비밀번호"
        />
        {!isSignIn && (
          <input
            className="rounded-xl border-[#EEEEEE] p-2"
            name="nickname"
            required
            onChange={handleChange}
            value={loginInfo.nickname ?? ""}
            placeholder="닉네임"
          />
        )}
        {isSignIn && <InputButton text="로그인" />}
        <InputButton text="회원가입하기" onClick={handleSignUp} />
      </form>
    </section>
  );
}
