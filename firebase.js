import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCc7ipjHy16mhX2zf6u-8cOTnz-TKgIgWs",
  authDomain: "presensi-hub.firebaseapp.com",
  projectId: "presensi-hub",
  storageBucket: "presensi-hub.appspot.com",
  messagingSenderId: "950859407156",
  appId: "1:950859407156:web:80a562c36d799588628f61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
