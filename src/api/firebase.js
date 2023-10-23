
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
      if (snapshot.exists())  {
        return Object.values(snapshot.val());
      }
      return null;
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
  return signOut(auth).then(() => 'logout 되었습니다.');
}
export async function getBookId(bookId) {
  return get(ref(database, `book/${bookId}`)) 
    .then((snapshot) => snapshot.exists() ? true : false).catch(e => console.log(e));
}
export async function addBook(bookId, book) {
  return set(ref(database, `book/${bookId}`), book);
}
// export async function updateReview(review, reviewId, bookId, userId) {
//   console.log(review.like);
//   return set(ref(database, `review/${reviewId}`), {...review, reviewId, bookId, userId});
// }
export async function addReview(review, bookId, userId) {
  const reviewId = uuidv4();
  return set(ref(database, `review/${reviewId}`), {...review, reviewId, bookId, userId});
}
export async function getReviewByReviewId(reviewId) {
  return get(ref(database, `review/${reviewId}`)) 
  .then((snapshot) => snapshot.exists() ? snapshot.val() : null)
  .catch(e => console.log(e));
}
export async function getReviews(reviewId) {
  return get(ref(database, reviewId ? `review/${reviewId}` : `review`)) 
  .then((snapshot) => snapshot.exists() ? Object.values(snapshot.val()) : null)
  .catch(e => console.log(e));
}
export async function getBooks(bookId) {
  return get(ref(database, `book/${bookId}`)) 
  .then((snapshot) => snapshot.exists() ? snapshot.val() : null)
  .catch(e => console.log(e));
}
export async function getPost(userId) {
  return getReviews().then(result => result.filter(f => f.userId === userId));
}

export async function getReviewByBookId(bookId) {
  return getReviews().then(result => result.filter(f=> f.bookId === bookId));
}
export async function getBookRating(bookId) {
  return get(ref(database, `book/${bookId}/totalRating`)) 
  .then((snapshot) => snapshot.exists() ? snapshot.val() : null)
  .catch(e => console.log(e));
}

export async function addLike(userId, reviewId) {
  return set(ref(database, `likes/${userId}/${reviewId}`), reviewId);
}
export async function delLike(userId, reviewId) {
  return remove(ref(database, `likes/${userId}/${reviewId}`));
}

export async function getLikeByUser(userId, reviewId) {
  return get(ref(database, `likes/${userId}/${reviewId ?? reviewId}`))
  .then((snapshot) => snapshot.exists() && (snapshot.val() || false))
  .catch(e => console.log(e));
}
export async function getLikes(reviewId) {
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
export async function getLikeReviews(userId) {
  return get(ref(database, `likes/${userId}`))
  .then((snapshot) => snapshot.exists() && (Object.values(snapshot.val()) || null))
  .catch(e => console.log(e));
}
