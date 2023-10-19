import React, { useState } from "react";
import { login, signIn } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function SignUp() {
  const [loginInfo, setLoginInfo] = useState({});
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const { user, userLogin } = useAuthContext();
  const [ mode, setMode ] = useState(true);

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
      .then(result => console.log(result))
      .catch(e => console.log(e));
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
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginInfo.password ?? ""}
            placeholder="비밀번호"
          />
        
            <input
              type="text"
              name="nickname"
              required
              onChange={handleChange}
              value={loginInfo.nickname ?? ""}
              placeholder="닉네임"
            />
        {warning && <p>{warning}</p>}
        {success && <p>{success}</p>}
        <button className="bg-black text-white text-2xl p-2 rounded" onClick={()=>setMode(false)}>회원가입하기</button>
      </form>
    </section>
  );
}
