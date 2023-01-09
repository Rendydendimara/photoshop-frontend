// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD7QKRc4tEZCEkNIMN8XYd7PnCh4upnUnI',
  authDomain: 'thetruesight-696a5.firebaseapp.com',
  projectId: 'thetruesight-696a5',
  storageBucket: 'thetruesight-696a5.appspot.com',
  messagingSenderId: '140817374467',
  appId: '1:140817374467:web:cf33f2b6025f73931edd36',
  measurementId: 'G-HCCZ6JJ71R',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
let analyticsTem: any;
if (typeof window !== 'undefined') {
  analyticsTem = getAnalytics(firebaseApp);
}
export const analytics = analyticsTem;
