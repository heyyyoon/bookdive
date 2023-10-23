import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ResultSign from '../components/ResultSign';

export default function Account({ isOpen, onClose }) {
  const [ loginMode, setLoginMode ] = useState(true);
  const [ signSuccess, setSignSuccess ] = useState(null);
  if (!isOpen) {
    return null;
  }

  const handleResult = (text) => {
    setSignSuccess(text);
    setTimeout(() => {
      setSignSuccess(null);
      onClose();
     }, 3000);
  }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-[25%] bg-white border-2 p-6 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded">
            {
              signSuccess ? 
                <ResultSign result={signSuccess}/>
              :
                loginMode?
                <SignIn signResult={handleResult} handleSignUp={() => setLoginMode(false)}/>   
                : <SignUp signResult={handleResult}/>        
            } 
            {loginMode ? <button onClick={onClose}>Close</button>
              :<button onClick={() => setLoginMode(prev => !prev)}>{`< back`}</button>
            }
        </div>
      </div>
    );
}

