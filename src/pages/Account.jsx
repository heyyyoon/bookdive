import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Modal from "../components/Modal";
import Back from "../components/ui/Back";
import CloseCircle from "../components/ui/CloseCircle";
import SuccessMsg from "../components/ui/SuccessMsg";

export default function Account({ onClose }) {
  const [loginMode, setLoginMode] = useState(true); // true면 signIn mode, false이면 signUp mode.
  const [signSuccess, setSignSuccess] = useState(false);

  const handleResult = (text) => {
    setSignSuccess(text);
    setTimeout(() => {
      setSignSuccess(null);
      onClose();
    }, 1000);
  };
  return (
    <section>
      {signSuccess ? (
        <SuccessMsg text={signSuccess} />
      ) : (
        <Modal styles={"w-[50%] max-w-sm animate-fade"}>
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
              <SignUp signResult={handleResult} loginMode={loginMode} />
            )}
          {!loginMode && <Back onClick={() => setLoginMode(true)} />}
        </Modal>
      )}
    </section>
  );
}
