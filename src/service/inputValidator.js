
export function userVaild({password, nickname, email}) {
  const EMAIL_CHECK = /^[0-9a-zA-Z]([_.]?[0-9a-zA-Z]){3,10}@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const PASSWORD_CHECK = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const NICKNAME_CHECK = /^[A-Za-z\uAC00-\uD7A3_0-9]{4,9}$/;

  if(!EMAIL_CHECK.test(email)) {
    return "email은 5~10자로 입력하세요. (특수문자 불가)"
  } 
  if(!PASSWORD_CHECK.test(password)) {
    return "Password는 8자 이상 24자 이하로 입력하세요. (영문, 숫자, 특수문자 필수 입력)"
  }
  if(!NICKNAME_CHECK.test(nickname)) {
    return "닉네임은 5~10자로 입력하세요. (특수문자 불가)"
  }
  return null;
}

export function postVaild({review:{reviewTitle, reviewContent}, rating}) {
  if (rating === 0) {
    return "별점을 선택하세요";
  } else if (!reviewTitle || reviewTitle.trim() === "") {
    return "제목을 입력하세요";
  } else if (!reviewContent || reviewContent.trim() === "") {
    return "내용을 입력하세요";
  } 
}