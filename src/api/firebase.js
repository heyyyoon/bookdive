
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

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
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}
async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
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
export async function login({email, password}) {
  const users = await getUserInfo().then(user => user && user.filter(f=> (f.email===email && f.password===password)));
  return (users && users.length <= 0) ? 
    null 
    : (
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          return result;
        })
    ) 
}

export async function signIn({email, password, nickname}) {
  return getUserInfo().then(user => {
    if (user && (user.some((f) => f.email === email) || user.some((f) => f.nickname === nickname))) {
      throw new Error(user.some((f) => f.email === email) ? '같은 이메일이 이미 존재합니다.' : '같은 닉네임이 이미 존재합니다.');
    } else {
      return createUserWithEmailAndPassword(auth, email, password);
    }
  });
}

export async function isLoginInfo(loginInfo) {
  return getUserInfo().then(user => {
    return user && user.filter(f=> (f.id===loginInfo.id || f.nickname===loginInfo.nickname))[0];  
  });
}