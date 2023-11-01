import React, { useState } from "react";
import { signIn } from "../api/firebase";
import SignForm from "./SignForm";
import WarningMsg from "./ui/WarningMsg";
import PlusLoader from "./ui/PlusLoader";

export default function SignIn({
  signResult,
  handleSignUp,
  loginMode,
}) {
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(loginInfo);
      signResult('로그인 되었습니다.');
    } catch (e) {
      setWarning(e.message);
      setTimeout(() => setWarning(null), 2000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      {loading && (
        <div className="absolute -top-5 left-1/2 translate-x-[-50%]">
          <PlusLoader color="#d38460" />
        </div>
      )}
      <SignForm
        isSignIn={loginMode}
        loginInfo={loginInfo}
        handleChange={handleChange}
        handleSubmit={handleLogin}
        handleSignUp={handleSignUp}
      />
      {warning && <WarningMsg text={warning} />}
    </div>
  );
}
