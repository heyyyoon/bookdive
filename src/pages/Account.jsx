import React, { useState } from "react";
import Modal from "../components/Modal";
import CloseCircle from "../components/ui/CloseCircle";
import SuccessMsg from "../components/ui/SuccessMsg";
import { useNavigate } from "react-router-dom";
import PlusLoader from "../components/ui/PlusLoader";
import WarningMsg from "../components/ui/WarningMsg";
import SignForm from "../components/SignForm";
import { sign } from "../service/sign";

export default function Account({ onClose }) {
  const [loginMode, setLoginMode] = useState(true); // true면 signIn mode, false이면 signUp mode.
  const [signSuccess, setSignSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  const handleResult = async (signInfo) => {
    try {
      setLoading(true);
      await sign(loginMode, signInfo);
      handleSuccess();
    } catch (e) {
      setWarning(e.message);
      setTimeout(() => setWarning(null), 1500);
    } finally {
      setLoading(false);
    }
  };
  const handleSuccess = () => {
    setSignSuccess(loginMode ? "로그인 되었습니다" : "회원가입 되었습니다.");
    setTimeout(() => {
      setSignSuccess(null);
      onClose();
      navigate("/");
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
          <div className="relative text-center">
            {loading && (
              <div className="absolute -top-5 left-1/2 translate-x-[-50%]">
                <PlusLoader color="#d38460" />
              </div>
            )}
            <h1 className="text-lg text-darkgrey">
              {loginMode ? "로그인" : "회원가입"}
            </h1>
            <SignForm
              loginMode={loginMode}
              onSign={handleResult}
              modeChange={() => setLoginMode((prev) => !prev)}
            />
            {warning && <WarningMsg text={warning} state="Top" />}
          </div>
        </Modal>
      )}
    </section>
  );
}
