
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
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
export async function addReview(review, bookId, userId) {
  const reviewId = uuidv4();
  return set(ref(database, `review/${reviewId}`), {...review, reviewId, bookId, userId});
}

export async function postReview(bookInfo, bookId, userId, review) {
  const isBookId = await getBookId(bookId);
  if(!isBookId) {
    await addBook(bookId, bookInfo);
  } 
  return addReview(review, bookId, userId);
}

export async function getReviews() {
  return get(ref(database, `review`)) 
  .then((snapshot) => {
    if (snapshot.exists())  {
      return Object.values(snapshot.val());
    }
    return null;
  }).catch(e => console.log(e));
}
export async function getBooks(bookId) {
  return get(ref(database, `book/${bookId}`)) 
  .then((snapshot) => {
    if (snapshot.exists())  {
      return snapshot.val();
    }
    return null;
  }).catch(e => console.log(e));
}

export async function getPost() {
  const reviews = await getReviews();
  const bookPromises = reviews.map(async (review) => {
    const book = await getBooks(review.bookId)
    return {...review, ...book};
  });
  return await Promise.all(bookPromises);
}

export async function updateTotalRating(reviewId, rating) {
  const totalRating = await updateTotalRating(reviewId);
  console.log(totalRating);

  //return set(ref(database, `bookRating/${reviewId}`), {reviewId, totalRating : rating});
}

export async function getTotalRating(reviewId) {
  get(ref(database, `bookRating/${reviewId}/totalRating`)) 
  .then((snapshot) => {
    if (snapshot.exists())  {
      console.log(snapshot.val());
      return snapshot.val();
    }
    return null;
  }).catch(e => console.log(e));
}