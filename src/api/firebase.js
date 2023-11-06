
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await getUser(user) : null;
    callback(updatedUser);
  });
}
async function getUser(user) {
  return get(ref(database, `user/${user.uid}`)) 
    .then((snapshot) => {
      if (snapshot.exists())  {
        const userData = snapshot.val();
        return {...user, ...userData};
      }
      return user;
    }).catch(e => console.log(e));
}

export async function getUserInfo() {
  return get(ref(database, 'user')) 
    .then((snapshot) => {
      return snapshot.exists() ? Object.values(snapshot.val()) : null;
    }).catch(e => console.log(e));
}
export async function signIn({email, password}) {
  const result = await getUserInfo().then(user => user && user.some((f)=> (f.email===email && f.password===password)));
  if(result) {
    return await signInWithEmailAndPassword(auth, email, password);
  } else {
    throw new Error ('아이디 또는 비밀번호를확인하세요');
  }
}
export async function signUp({email, password, nickname}) {
  const user = await getUserInfo().then((user) => user && (user.find((f) => f.email === email || f.nickname === nickname)))
  if(user) {
    throw new Error (user.email===email ? '같은 이메일이 이미 존재합니다.' : '같은 닉네임이 이미 존재합니다.');
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        set(ref(database, `user/${result.user.uid}`), {email, password, nickname});
      })
  }
}
export async function logout() {
  return signOut(auth);
}

export async function addBook(bookId, book) {
  return set(ref(database, `book/${bookId}`), book);
}
export async function addReview(review, bookId, userId) {
  const reviewId = uuidv4();
  await set(ref(database, `hotBooks/${bookId}/${reviewId}`), {reviewId, bookId});
  return set(ref(database, `review/${reviewId}`), {...review, reviewId, bookId, userId});
}
export async function getReviews() {
  return get(ref(database, `review`)) 
  .then((snapshot) => snapshot.exists() ? Object.values(snapshot.val()) : null)
  .catch(e => console.log(e));
}

export async function getBooks(bookId) {
  const books = await get(ref(database, `book/${bookId}`)) 
  .then((snapshot) => snapshot.exists() ? snapshot.val() : null)
  .catch(e => console.log(e));
  return books;
}
export async function getReviewByBookId(bookId) {
  return getReviews().then(result => {
    const filteredReviews = result.filter(f => f.bookId === bookId);
    return filteredReviews.length === 0 ? null : filteredReviews;
  });
}

// Like
export async function addLike(userId, reviewId) {  // user가 좋아요한 리뷰 추가
  await addLikeById(userId, reviewId);
  return set(ref(database, `likes/${userId}/${reviewId}`), reviewId);
}
export async function addLikeById(userId, reviewId) {  // user가 좋아요한 리뷰 추가
  return set(ref(database, `hotReviews/${reviewId}/${userId}`), {reviewId, userId});
}
export async function delLike(userId, reviewId) {  // user가 좋아요 한 리뷰 삭제 
  await remove(ref(database, `hotReviews/${reviewId}/${userId}`));
  return remove(ref(database, `likes/${userId}/${reviewId}`));
}
export async function getIsLiked(userId, reviewId) {  // user의 review like 여부 가져오기
  return get(ref(database, `likes/${userId}/${reviewId}`))
  .then((snapshot) => snapshot.exists() && (snapshot.val() || false))
  .catch(e => console.log(e));
}
export async function getLikes(reviewId) { // review에 like를 누른 개수 가져오기 with reviewId
  return get(ref(database, `likes`))
    .then((snapshot) => {
      if(snapshot.exists()) {
        return Object.values(snapshot.val())
          .reduce((count, like) => count + Object.values(like).includes(reviewId), 0);
      }
      return null;
    })
    .catch(e => console.log(e));
}
// user가 좋아요 누른 리뷰 데이터 모두 가져오기
export async function getUserLikeReviews(userId) {
  try {
    const snapshot = await get(ref(database, `likes/${userId}`));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) || null;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export async function getReviewByReviewId(reviewId) { // reviewId에 해당하는 review 가져오기 
  return get(ref(database, `review/${reviewId}`)) 
  .then((snapshot) => snapshot.exists() ? snapshot.val() : null)
  .catch(e => console.log(e));
}

// user가 좋아요 누른 리뷰 데이터 모두 가져오기
export async function getUserLikeReviewsInfo(userId) {
  const reviews = await getUserLikeReviews(userId);
  if (reviews) {
    return await Promise.all(reviews.map(async (reviewId) => {
      return getReviewByReviewId(reviewId);
    }));
  }
  return null;
}


// Hot Books
export async function getHotBooks() { 
  return get(ref(database, `hotBooks`)) 
  .then((snapshot) => snapshot.exists() ? Object.values(snapshot.val()) : null)
  .catch(e => console.log(e));
}
// Hot Reviews
export async function getHotReviews() { 
  return get(ref(database, `hotReviews`)) 
  .then((snapshot) => snapshot.exists() ? Object.values(snapshot.val()) : null)
  .catch(e => console.log(e));
}
export async function getBookRanking() { 
  return await getRangeBook()
  .then(result => result ? Promise.all(result.map((m) => getBooks(m))) : null);
}

export async function getRangeBook() { 
  const allBooks = await getHotBooks().then(result => result && result.map(m => Object.values(m)));
  if(!allBooks) return null;

  const idCountMap = new Map();
  
  allBooks.forEach((reviewArray) => {
    const bookId = reviewArray[0].bookId;
    if (!idCountMap.has(bookId)) {
      idCountMap.set(bookId, 0);
    }
    idCountMap.set(bookId, idCountMap.get(bookId) + reviewArray.length);
  });
  return getSortedData(idCountMap);
}
export async function getRangeReview() { 
  const allReviews = await getHotReviews().then(result => result && result.map(m => Object.values(m)));
  if (!allReviews) return null;

  const idCountMap = new Map();
  console.log(allReviews)
  allReviews.forEach((reviewArray) => {
    const reviewId = reviewArray[0].reviewId;
    if(reviewArray.length > 0) {
      if (!idCountMap.has(reviewId)) {
        idCountMap.set(reviewId, 0);
      }
      idCountMap.set(reviewId, idCountMap.get(reviewId) + reviewArray.length);
    }
  });
  return getSortedData(idCountMap);
}


export async function getBookReview() { 
  return await getRangeReview()
  .then(result => result ? Promise.all(result.map((m) => getReviewByReviewId(m))) : null);
}
export async function getSortedData(idCountMap) { 
  const sortedIds = [...idCountMap.keys()].sort((a, b) => {
    return idCountMap.get(b) - idCountMap.get(a);
  });
  console.log(sortedIds)
  return sortedIds;
}

