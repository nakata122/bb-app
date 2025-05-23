import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASLy1W9zY6ms3lcpvEu6lipa59i92JA70",
  authDomain: "bbdb-a9f0e.firebaseapp.com",
  projectId: "bbdb-a9f0e",
  storageBucket: "bbdb-a9f0e.firebasestorage.app",
  messagingSenderId: "1049861725003",
  appId: "1:1049861725003:web:3c4ac83e4935d8d38ba6ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const messaging = getMessaging(app);



const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if(permission !== 'granted') return;

  const registration = await navigator.serviceWorker.register('/bb-app/firebase-messaging-sw.js');

  const token = await getToken(messaging, {
    serviceWorkerRegistration: registration,
    vapidKey: 'BORPSoEXDJn9BJog-nMwp0A9qBqPJ-53UexK7cYzVep4eCtwrwpJfvVyD-M9N2a5BHaZNpDUi4C9oockgDQjhOc'
  });
  localStorage.setItem('token', token);
  const q = query(collection(firestore, 'users'), where('key', '==', token));
  getDocs(q)
    .then(data => {
      if(data.empty){
        const ref = collection(firestore, 'users');
        addDoc(ref, {key: token}, { merge: true });
      }
    })
}

export { firestore, messaging, generateToken };