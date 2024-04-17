importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
console.log('haa aaya tha yaha');
const firebaseConfig = {
  apiKey: 'AIzaSyCmX5QAKiWfGuh-9RcQgpAQu5o8lmEkhz4',
  authDomain: "house-hive.firebaseapp.com",
  projectId: "house-hive",
  storageBucket: "house-hive.appspot.com",
  messagingSenderId: "1062032350695",
  appId: "1:1062032350695:web:eca5ade500f40ec84eb142"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ", payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});