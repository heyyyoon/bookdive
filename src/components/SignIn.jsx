import React, { useState } from "react";
import { signIn } from "../api/firebase";
import SignForm from "./SignForm";
import WarningMsg from "./ui/WarningMsg";
import PlusLoader from "./ui/PlusLoader";

export default function SignIn({
  signResult,
  modeChange,
  loginMode,
}) {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleLogin = async (signInfo) => {
    try {
      setLoading(true);
      await signIn(signInfo);
      signResult();
    } catch (e) {
      setWarning(e.message);
      setTimeout(() => setWarning(null), 1500);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative text-center">
      {loading && (
        <div className="absolute -top-5 left-1/2 translate-x-[-50%]">
          <PlusLoader color="#d38460" />
        </div>
      )}
      <SignForm
        isSignIn={loginMode}
        onSign={handleLogin}
        modeChange={modeChange}
      />
      {warning && <WarningMsg text={warning} />}
    </div>
  );
}
