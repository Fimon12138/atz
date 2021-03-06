import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtfYxO7USxQ2ZU--WU1fppzClFktqFKBo",
  authDomain: "crwn-clothing-db-c4c5e.firebaseapp.com",
  projectId: "crwn-clothing-db-c4c5e",
  storageBucket: "crwn-clothing-db-c4c5e.appspot.com",
  messagingSenderId: "244007213684",
  appId: "1:244007213684:web:c0aad69b2dfa83be974f21"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// another way to use google sign-in
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
} 

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const {title, items} = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
}

export const createUserDocFromAuth = async (userAuth, additionInfo = {}) => {
  if (!userAuth)  return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInfo
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password)  return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signinAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password)  return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);