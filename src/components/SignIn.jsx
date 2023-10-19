import React, { useState } from "react";
import { login, signIn } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function SignIn({mode, handleSignUp}) {
  const [loginInfo, setLoginInfo] = useState({});
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const { user, userLogin } = useAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarning(null);
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning(null);
    setSuccess(null);

     mode ? loginInfo(loginInfo) : signIn(loginInfo)
       .then(result => {
        setSuccess(result);
        setTimeout(() => setSuccess(null), 4000);
       })
       .catch(e => setWarning(e));
  };
  return (
    <section className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold">로그인</h1>
      <form 
        className="flex flex-col w-7/12"
        onSubmit={handleSubmit}>    
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            value={loginInfo.email ?? ""}
            placeholder="이메일"
          />
          <input
            className="basis-9/12"
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginInfo.password ?? ""}
            placeholder="비밀번호"
          />
        {warning && <p>{warning}</p>}
        {success && <p>{success}</p>}
        <button className="bg-black text-white my-5 text-2xl p-2 rounded">로그인</button>
        <button className="bg-black text-white text-2xl p-2 rounded" onClick={handleSignUp}>회원가입하기</button>
      </form>
    </section>
  );
}
