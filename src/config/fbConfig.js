import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize firebase
var config = {

    apiKey: "AIzaSyCuG6W20NcKvs20xOuSAGQ5coA-eY_8qbw",
    authDomain: "naxoduormarioplan.firebaseapp.com",
    databaseURL: "https://naxoduormarioplan.firebaseio.com",
    projectId: "naxoduormarioplan",
    storageBucket: "naxoduormarioplan.appspot.com",
    messagingSenderId: "516238110277"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true})

export default firebase;