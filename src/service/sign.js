import { signIn, signUp } from "../api/firebase";

export function signValid(signInfo) {
  if (signInfo.password.length <= 5) {
    return "비밀번호를 6자 이상 입력하세요";
  } 
  if (signInfo.nickname.length <= 3) {
    return "닉네임을 4자 이상 입력하세요";
  } 
  if (signInfo.nickname.length > 10) {
    return "닉네임을 10자 이하로 입력하세요"
  } 
  return null;
}

export function sign(loginMode, signInfo) {
  if(loginMode) return signIn(signInfo);
  else {
    const signResult = signValid(signInfo);
    if(signResult) throw new Error(signResult);
    return signUp(signInfo);
  }
}