import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAV1p-pGvbzZybOqlkZKvcIe2YRXT9ahc",
  authDomain: "login-az-25ff1.firebaseapp.com",
  projectId: "login-az-25ff1",
  storageBucket: "login-az-25ff1.appspot.com",
  messagingSenderId: "517333568302",
  appId: "1:517333568302:web:1c987a5400ef0349c4c8bf",
};

const app = initializeApp(firebaseConfig);

const authen = getAuth(app);

export { authen };
