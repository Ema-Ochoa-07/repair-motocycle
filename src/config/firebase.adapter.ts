// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { envs } from "./env";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: envs.FIREBASE_API_KEY,
  projectId: envs.FIREBASE_PROJECT_ID,
  storageBucket: envs.FIREBASE_STORAGE_BUCKET,
  appId: envs.FIREBASE_STORAGE_BUCKET
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)
export const utilsFirebase = {
  storage,
  ref,
  uploadBytes,
  getDownloadURL
}