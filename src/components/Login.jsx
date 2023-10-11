import React, { useState } from "react";
import { login, signIn } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login({openModal}) {
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

    if (true) {
      signIn(loginInfo).then((result) => {
          setSuccess(loginInfo.nickname + " 님 회원가입이 되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
      })
      .catch(e => setWarning(e.message));
    }
          
    else {
        login(loginInfo).then(result => {
          if(result){
            setSuccess('성공적으로 로그인 되었습니다.')
            setTimeout(() => {
              setSuccess(null);
            }, 4000)
          }
          else {
            setWarning('아이디 또는 비밀번호를 확인하세요')
          }            
        })
    }
  };
  return (
    <section className="flex flex-col items-center p-4">
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
        
            <input
              className="basis-9/12"
              type="text"
              name="nickname"
              required
              onChange={handleChange}
              value={loginInfo.nickname ?? ""}
              placeholder="닉네임"
            />
        {warning && <p>{warning}</p>}
        {success && <p>{success}</p>}
        <button className="bg-black text-white my-5 text-2xl p-3 rounded">로그인</button>
        <button className="bg-black text-white my-5 text-2xl p-3 rounded">회원가입</button>
      </form>
    </section>
  );
}
