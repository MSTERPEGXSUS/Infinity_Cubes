import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsFW_ItFdK_uXs1UNvOhfbLdWKLccEfpk",
  authDomain: "infinity-cubes-e6bdb.firebaseapp.com",
  projectId: "infinity-cubes-e6bdb",
  storageBucket: "infinity-cubes-e6bdb.firebasestorage.app",
  messagingSenderId: "843191139424",
  appId: "1:843191139424:web:bba26cc123c7199df2d705"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
