import { signIn, signUp } from "../api/firebase";
import { userVaild } from "./inputValidator";

export async function sign(loginMode, signInfo) {
  if(loginMode) return await signIn(signInfo);
  else {
    const signResult = userVaild(signInfo);
    if(signResult) throw new Error(signResult);
    return await signUp(signInfo);
  }
}
