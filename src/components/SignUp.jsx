import React, { useState } from "react";
import { signUp } from "../api/firebase";
import SignForm from "./SignForm";
import WarningMsg from "./ui/WarningMsg";
import PlusLoader from "./ui/PlusLoader";

export default function SignUp({ signResult }) {
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(loginInfo);
      signResult("회원가입이 되었습니다.");
    } catch (e) {
      setWarning(e.message);
      setTimeout(() => setWarning(null), 1000);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        loginInfo={loginInfo}
        handleChange={handleChange}
        handleSubmit={handleSignUp}
      />
      {warning && <WarningMsg text={warning} />}
    </div>
  );
}
