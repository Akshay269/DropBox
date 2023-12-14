
import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCO8vVVcRxSoN4j_t7lfbityvsX3ImV8ws",
    authDomain: "dropbox-66a81.firebaseapp.com",
    projectId: "dropbox-66a81",
    storageBucket: "dropbox-66a81.appspot.com",
    messagingSenderId: "418847511760",
    appId: "1:418847511760:web:ec04d46e4d7dda20287ad5"
  };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();   
    const db = getFirestore(app);
    const storage = getStorage(app);

    export {db,storage};

