import React, { useState } from "react";
import { signUp } from "../api/firebase";
import SignForm from "./SignForm";
import WarningMsg from "./ui/WarningMsg";
import PlusLoader from "./ui/PlusLoader";
import Back from "./ui/Back";

export default function SignUp({ signResult, modeChange }) {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleSignUp = async (signInfo) => {
    if(signInfo.password.length <= 5) {
      setWarning('비밀번호를 6자 이상 입력하세요');
    } else if (signInfo.nickname.length <=3 ) {
      setWarning('닉네임을 4자 이상 입력하세요'); 
    } else if (signInfo.nickname.length > 10) {
      setWarning('닉네임을 10자 이하로 입력하세요');
    } else {
      try {
        setLoading(true);
        await signUp(signInfo);
      } catch (e) {
        setWarning(e.message);
        setTimeout(() => setWarning(null), 1000);
      } finally {
        setLoading(false);
        signResult();
      }
    }  

    setTimeout(() => setWarning(null), 1000);
  };
  return (
    <div className="relative text-center">
      {loading && (
        <div className="absolute -top-5 left-1/2 translate-x-[-50%]">
          <PlusLoader color="#d38460" />
        </div>
      )}
      <h1 className="text-lg text-darkgrey">
        회원가입
      </h1>
      <SignForm
        isSignIn={false}
        onSign={handleSignUp}
      />
      <Back onClick={modeChange}/>
      {warning && <WarningMsg text={warning} />}
    </div>
  );
}
