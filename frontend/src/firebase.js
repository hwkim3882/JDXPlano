import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD0NJi7YudcD_VvbFvQianJh4bk9yXIY4U',
  authDomain: 'jdxplano.firebaseapp.com',
  projectId: 'jdxplano',
  storageBucket: 'jdxplano.firebasestorage.app',
  messagingSenderId: '416428651696',
  appId: '1:416428651696:web:a43f2cd5ff66a59bb7f775',
  measurementId: 'G-1MBB8SWPRP',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
