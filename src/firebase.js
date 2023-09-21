// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSuB3jL2Dxeza9XNV2R-dEvO7kYd9zSFM',
  authDomain: 'photo-gallery-auth-e3e94.firebaseapp.com',
  projectId: 'photo-gallery-auth-e3e94',
  storageBucket: 'photo-gallery-auth-e3e94.appspot.com',
  messagingSenderId: '5392786601',
  appId: '1:5392786601:web:0b142147b328fe7dc935b8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
