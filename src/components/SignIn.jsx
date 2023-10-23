import React, { useState } from "react";
import { signIn } from "../api/firebase";

export default function SignIn({signResult, handleSignUp}) {
  const [loginInfo, setLoginInfo] = useState({});
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarning(null);
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn(loginInfo)
      .then(() => signResult('로그인 성공!'))
      .catch(setWarning);
  };
  return (
    <section className="text-center">
      <h1 className="text-2xl border-b-2 pb-2">로그인</h1>
      <form 
        className="flex flex-col mt-2"
        onSubmit={handleSubmit}>    
          <input
            className=""
            type="email"
            name="email"
            onChange={handleChange}
            required
            value={loginInfo.email ?? ""}
            placeholder="이메일"
          />
          <input
            className=""
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginInfo.password ?? ""}
            placeholder="비밀번호"
          />
        {warning && <p>{warning}</p>}
        <button className="text-xl bg-zinc-500 p-1 font-medium text-white my-2">로그인</button>
        <button className="text-xl bg-zinc-500 p-1 font-medium text-white" onClick={handleSignUp}>회원가입하기</button>
      </form>
    </section>
  );
}
