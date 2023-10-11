import React, { useState } from "react";
import { login, signIn } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({});
  const [mode, setMode] = useState(false); // login 모드이면 false
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

    if (mode) {
      signIn(loginInfo).then((result) => {
          setSuccess(loginInfo.nickname + " 님 회원가입이 되었습니다.");
          setTimeout(() => {
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
        <div className="flex justify-center gap-10 m-5">
          <div>
            <label 
              className="text-xl font-bold mr-3"
              htmlFor="radioLogin">
              로그인
            </label>
            <input
              type="radio"
              id="radioLogin"
              name="login"
              checked={!mode}
              onChange={() => setMode(false)}
            />
          </div>
          <div>
          <label 
              className="text-xl font-bold mr-3"
              htmlFor="radioSignIn">
              회원가입
            </label>
            <input
              type="radio"
              id="radioSignIn"
              name="signIn"
              checked={mode}
              onChange={() => setMode(true)}
          />
          </div>
        </div>
        <div className="flex items-center">
          <label className="basis-3/12 text-right text-xl pr-5">이메일</label>
          <input
            className="basis-9/12"
            type="email"
            name="email"
            onChange={handleChange}
            required
            value={loginInfo.email ?? ""}
          />
          
        </div>
        <div className="flex items-center">
          <label className="basis-3/12 text-right text-xl pr-5">password</label>
          <input
            className="basis-9/12"
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginInfo.password ?? ""}
          />
        </div>
        {mode &&
          <div className="flex items-center">
            <label className="basis-3/12 text-right text-xl pr-5">닉네임</label>
            <input
              className="basis-9/12"
              type="text"
              name="nickname"
              required
              onChange={handleChange}
              value={loginInfo.nickname ?? ""}
            />
          </div>
        }
        {warning && <p>{warning}</p>}
        {success && <p>{success}</p>}
        <button className="bg-black text-white my-5 text-2xl p-3 rounded">
          {mode ? "회원가입" : "로그인"}
        </button>
      </form>
    </section>
  );
}
