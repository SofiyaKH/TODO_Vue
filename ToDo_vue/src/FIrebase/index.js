import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2-rqRO4feq9P5wzsoeoCWe_Hvd20NAZ8",
    authDomain: "my-todo-list-2ff75.firebaseapp.com",
    projectId: "my-todo-list-2ff75",
    storageBucket: "my-todo-list-2ff75.appspot.com",
    messagingSenderId: "839807217376",
    appId: "1:839807217376:web:f6560feeb5b5238dcf6a85"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}