import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAlKAa5mOmM3K6bkFGn61VgnUufaXGrWss",
  authDomain: "qrmenu-35.firebaseapp.com",
  projectId: "qrmenu-35",
  storageBucket: "qrmenu-35.firebasestorage.app",
  messagingSenderId: "719454610898",
  appId: "1:719454610898:web:5ecad6bcb9d5a081dd540b",
  measurementId: "G-Y0V9E61DTW",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const storage = getStorage(app)

export const analytics = getAnalytics(app)

export default app

