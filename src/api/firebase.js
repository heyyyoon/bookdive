
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
      return Object.values(snapshot.val()) || null;
    }).catch(e => console.log(e));
}
export async function signIn({email, password}) {
  const result = await getUserInfo().then(user => user && user.some((f)=> (f.email===email && f.password===password)));
  if(result) {
    return await signInWithEmailAndPassword(auth, email, password);
  } else {
    throw new Error ('아이디 또는 비밀번호를 확인하세요');
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

export async function getData(path) {
  return get(ref(database, path))
    .then((snapshot) => (snapshot.val() || null))
    .catch(e => {
      console.log(e);
      return null;
    });
}
export async function getObjectData(path) { 
  return get(ref(database, path)) 
  .then((snapshot) => Object.values(snapshot.val()) || null)
  .catch(e => console.log(e));
}

export async function getBooks(bookId) {
  return getData(`book/${bookId}`);
}
export async function getReviewByReviewId(reviewId) { // reviewId에 해당하는 review 가져오기 
  return getData(`review/${reviewId}`);
}
export async function getReviews() {
  return getObjectData('review');
}
export async function getHotBooks() { 
  return getObjectData('hotBooks');
}
export async function getHotReviews() { 
  return getObjectData('hotReviews');
}
// user가 좋아요 누른 리뷰 데이터 모두 가져오기
export async function getUserLikeReviews(userId) {
  return getObjectData(`likes/${userId}`);
}

export async function getReviewByBookId(bookId) {
  const reviews = await getReviews();
  return reviews ? reviews.filter(review => review.bookId === bookId) : null;
}
export async function getLikes(reviewId) { // review에 like를 누른 개수 가져오기 with reviewId
  const data = await getObjectData('likes');
  return data ? data.reduce((count, like) => count + Object.values(like).includes(reviewId), 0) : data;
}
export async function getIsLiked(userId, reviewId) {  // user의 review like 여부 가져오기
  return getData(`likes/${userId}/${reviewId}`) || false;
}

// user가 좋아요 누른 리뷰 데이터 모두 가져오기
export async function getUserLikeReviewsInfo(userId) {
  const reviews = await getUserLikeReviews(userId);
  if (!reviews) return null;
  
  const reviewPromises = reviews.map((reviewId) => getReviewByReviewId(reviewId));
  return Promise.all(reviewPromises);
}

export async function getBookRanking() { 
  const result = await getRangeItems(getHotBooks(), 'bookId');
  return Promise.all(result.map((m) => getBooks(m)));
}
export async function getBookReview() { 
 const result = await getRangeItems(getHotReviews(), 'reviewId');
  return Promise.all(result.map((m) => getReviewByReviewId(m)));
}

export async function getRangeItems(dataPromise, idKey) { 
  const allItems = await dataPromise.then(result => result && result.map(m => Object.values(m)));
  if(!allItems) return null;
  
  const idCountMap = new Map();
  
  allItems.forEach((reviewArray) => {
    const itemId = reviewArray[0][idKey];
    if (!idCountMap.has(itemId)) {
      idCountMap.set(itemId, 0);
    }
    idCountMap.set(itemId, idCountMap.get(itemId) + reviewArray.length);
  });
  return getSortedData(idCountMap);
}

export async function getSortedData(idCountMap) { 
  const sortedIds = [...idCountMap.keys()].sort((a, b) => {
    return idCountMap.get(b) - idCountMap.get(a);
  });
  return sortedIds;
}

