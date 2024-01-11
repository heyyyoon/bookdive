
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { get, getDatabase, ref, remove, set } from "firebase/database";

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
export async function addReview(review, bookId, userId, reviewId) {
  const setHokBooks = set(ref(database, `hotBooks/${bookId}/${reviewId}`), {reviewId, bookId});
  const setReviews = set(ref(database, `review/${reviewId}`), {...review, reviewId, bookId, userId});
  
  return Promise.all([setHokBooks, setReviews]);
}
export function addLike(userId, reviewId) {  
  const setHotReviews = set(ref(database, `hotReviews/${reviewId}/${userId}`), {reviewId, userId});
  const setLikes = set(ref(database, `likes/${userId}/${reviewId}`), reviewId);

  Promise.all([setHotReviews, setLikes]);
}

export async function delLike(userId, reviewId) {   
  const rmHotReviews = remove(ref(database, `hotReviews/${reviewId}/${userId}`));
  const rmLikes = remove(ref(database, `likes/${userId}/${reviewId}`));

  Promise.all([rmHotReviews, rmLikes]);
}
export async function delReview({bookId, reviewId}) {   
  const getUserLikes = await getObjectData(`hotReviews/${reviewId}`);
  getUserLikes && await delUsersLike(getUserLikes); 
  
  Promise.all([
    delData(`review/${reviewId}`),
    delData(`hotReviews/${reviewId}`), 
    delData(`hotBooks/${bookId}/${reviewId}`), 
  ]);
}
export async function delUsersLike(getUserLikes) {
  const rmUserLikes = getUserLikes && Promise.all(getUserLikes.map((user) => 
      delData(`likes/${user.userId}/${user.reviewId}`)
  ));

  return rmUserLikes;
}
export async function delData(path) {
  remove(ref(database, path));
}
export async function getData(path) {
  return get(ref(database, path))
    .then((snapshot) => snapshot.exists() ? snapshot.val() : null)
    .catch(e => {
      console.log(e);
      return null;
    });
}
export async function getObjectData(path) { 
  return get(ref(database, path)) 
  .then((snapshot) => snapshot.exists() ? Object.values(snapshot.val()) : null)
  .catch(e => console.log(e));
}
export async function getBooks(bookId) {
  return getData(`book/${bookId}`);
}
export async function getReviewByReviewId(reviewId) { 
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
export async function getUserLikeReviews(userId) {
  return getObjectData(`likes/${userId}`);
}

export async function getReviewByBookId(bookId) {
  const reviews = await getReviews();
  return reviews ? reviews.filter(review => review.bookId === bookId) : null;
}
export async function getLikes(reviewId) { 
  const data = await getObjectData('likes');
  return data ? data.reduce((count, like) => count + Object.values(like).includes(reviewId), 0) : data;
}
export async function getIsLiked(userId, reviewId) {
  return getData(`likes/${userId}/${reviewId}`) || false;
}
export async function getLikeInfo(userId, reviewId) {
  const [userLikes, isLiked] = await Promise.all([
    getLikes(reviewId),
    getIsLiked(userId, reviewId)
  ]);
  
  return {userLikes, isLiked};
}
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

