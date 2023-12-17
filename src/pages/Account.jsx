import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Modal from "../components/Modal";
import CloseCircle from "../components/ui/CloseCircle";
import SuccessMsg from "../components/ui/SuccessMsg";
import { useNavigate } from "react-router-dom";

export default function Account({ onClose }) {
  const [loginMode, setLoginMode] = useState(true); // true면 signIn mode, false이면 signUp mode.
  const [signSuccess, setSignSuccess] = useState(false);

  const navigate = useNavigate();

  const handleResult = () => {
    setSignSuccess(loginMode ? '로그인 되었습니다' : '회원가입 되었습니다.');
    setTimeout(() => {
      setSignSuccess(null);
      onClose();
      navigate('/');
    }, 1000);
  };
  return (
    <section>
      {signSuccess ? (
        <SuccessMsg text={signSuccess} />
      ) : (
        <Modal>
            <div className="flex justify-end">
              <CloseCircle onClose={onClose} />
            </div>
            {loginMode ? (
              <SignIn
                signResult={handleResult}
                modeChange={() => setLoginMode(false)}
                loginMode={loginMode}
              />
            ) : (
              <SignUp 
                signResult={handleResult} 
                modeChange={() => setLoginMode(true)}
                loginMode={loginMode} 
              />
            )}
        </Modal>
      )}
    </section>
  );
}
