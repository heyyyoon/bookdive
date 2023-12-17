import React, { useState } from "react";
import { signUp } from "../api/firebase";
import SignForm from "./SignForm";
import WarningMsg from "./ui/WarningMsg";
import PlusLoader from "./ui/PlusLoader";

export default function SignUp({ signResult }) {
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
        signResult("회원가입이 되었습니다.");
      } catch (e) {
        setWarning(e.message);
        setTimeout(() => setWarning(null), 1000);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }  

    setTimeout(() => setWarning(null), 1000);
  };
  return (
    <div className="relative">
      {loading && (
        <div className="absolute left-1/2 translate-x-[-50%]">
          <PlusLoader color="#d38460" />
        </div>
      )}
      <SignForm
        isSignIn={false}
        onSign={handleSignUp}
      />
      {warning && <WarningMsg text={warning} />}
    </div>
  );
}
