import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig =
{
    apiKey: "AIzaSyAoRbb4qX6b8IqfA18mcblCjtTOrsFZles",
    authDomain: "reactjs-client-panel.firebaseapp.com",
    databaseURL: "https://reactjs-client-panel.firebaseio.com",
    projectId: "reactjs-client-panel",
    storageBucket: "reactjs-client-panel.appspot.com",
    messagingSenderId: "583598746207"
}

//Init firebase
let app = firebase.initializeApp(firebaseConfig);

//Init firestore
const firestore = firebase.firestore(app);
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export default firestore;

