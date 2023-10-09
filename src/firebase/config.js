import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBLUZ1lMqKXeTGGQmBQSx36UhqKUMnqc50',
  authDomain: 'movies-project-4c85b.firebaseapp.com',
  projectId: 'movies-project-4c85b',
  storageBucket: 'movies-project-4c85b.appspot.com',
  messagingSenderId: '433285542892',
  appId: '1:433285542892:web:87630dbe8e972dc5c146c9',
};

// pociatocne nastavenie firebase (init)
firebase.initializeApp(firebaseConfig);

//pociatocne nastavenie sluzieb (services)
const projectFirestore = firebase.firestore();

export { projectFirestore };
