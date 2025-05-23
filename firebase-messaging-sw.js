importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');


// Your web app's Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyASLy1W9zY6ms3lcpvEu6lipa59i92JA70",
  authDomain: "bbdb-a9f0e.firebaseapp.com",
  projectId: "bbdb-a9f0e",
  storageBucket: "bbdb-a9f0e.firebasestorage.app",
  messagingSenderId: "1049861725003",
  appId: "1:1049861725003:web:3c4ac83e4935d8d38ba6ce"
});

// Initialize Firebase
const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/bb_icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

