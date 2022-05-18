// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBISLoJzm9Vgg_p30PKa-2rke7jlmjA0AM',
  authDomain: 'to-do-app-d0230.firebaseapp.com',
  projectId: 'to-do-app-d0230',
  storageBucket: 'to-do-app-d0230.appspot.com',
  messagingSenderId: '165357204702',
  appId: '1:165357204702:web:f692f8d28e2fc2eaf53e4f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
