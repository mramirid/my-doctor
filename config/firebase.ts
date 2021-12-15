import Constants from 'expo-constants';
import firebase from 'firebase';
import 'firebase/functions';

/*
 * Initialize Firebase
 */
let fireApp: firebase.app.App;
if (firebase.apps.length === 0) {
  fireApp = firebase.initializeApp({
    apiKey: Constants.manifest!.extra!.apiKey,
    authDomain: Constants.manifest!.extra!.authDomain,
    databaseURL: Constants.manifest!.extra!.databaseURL,
    projectId: Constants.manifest!.extra!.projectId,
    storageBucket: Constants.manifest!.extra!.storageBucket,
    messagingSenderId: Constants.manifest!.extra!.messagingSenderId,
    appId: Constants.manifest!.extra!.appId,
  });
} else {
  fireApp = firebase.app();
}

export default fireApp;
