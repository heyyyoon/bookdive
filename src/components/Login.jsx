import React, { useState } from "react";
import { login, signIn } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
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

       /*
    if (mode) {
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
    else {
      signIn(loginInfo).then((result) => {
        setSuccess(loginInfo.nickname + " 님 회원가입이 되었습니다.");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
    })
    .catch(e => setWarning(e.message));
    }
    
   */
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
        {mode && <button className="bg-black text-white my-5 text-2xl p-3 rounded">로그인</button>}
        <button className="bg-black text-white text-2xl p-3 rounded" onClick={()=>setMode(false)}>회원가입하기</button>
      </form>
    </section>
  );
}
