import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAWceCyECacngLCMc2afu8IC_UcigdEsGk",
    authDomain: "mr-knowsy-database.firebaseapp.com",
    databaseURL: "https://mr-knowsy-database-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mr-knowsy-database",
    storageBucket: "mr-knowsy-database.appspot.com",
    messagingSenderId: "603438597003",
    appId: "1:603438597003:web:f43aa78690af71f338258e",
    measurementId: "G-2WCFMLL7SE"
};

firebase.initializeApp(firebaseConfig);


export default firebase;