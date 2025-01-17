// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, GoogleAuthProvider, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBCCxv7-j7tNuqnRyONCe_b51z-xO9Ey1o",
  authDomain: "wdp301-7d704.firebaseapp.com",
  projectId: "wdp301-7d704",
  storageBucket: "wdp301-7d704.firebasestorage.app",
  messagingSenderId: "392832910333",
  appId: "1:392832910333:web:d48d00732f4ee569254f94",
  measurementId: "G-NLD3BX7VH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// ios       81048955187-la0987ibpv8k8f4pncgdjp7kafe3150e.apps.googleusercontent.com
// android   81048955187-14b0ofc1729tipc558dk1398phed1pph.apps.googleusercontent.com
// SHA1      9A:AC:7D:05:D8:B4:19:EE:20:8D:97:32:B6:0D:8B:E0:5D:1C:5B:DD

  // "intentFilters": [
      //   {
      //     "action": "VIEW",
      //     "category": ["BROWSABLE", "DEFAULT"],
      //     "data": {
      //       "scheme": "mobile",
      //       "host": "oauth2redirect",
      //       "pathPrefix": "/google"
      //     }
      //   }
      // ]