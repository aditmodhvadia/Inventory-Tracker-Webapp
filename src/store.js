import { createStore, combineReducers } from "redux";
import firebase from "firebase";
import 'firebase/firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
// TODO: Reducers
const firebaseConfig = {
    apiKey: "AIzaSyDbodakivKuLlf_ycNoIMNnspxbgBPHX2M",
    authDomain: "track-items-73a37.firebaseapp.com",
    databaseURL: "https://track-items-73a37.firebaseio.com",
    projectId: "track-items-73a37",
    storageBucket: "track-items-73a37.appspot.com",
    messagingSenderId: "227791096724",
    appId: "1:227791096724:web:ec40ed020cd3182b20dd81",
    measurementId: "G-VHEL5SRTN6"
}

// React redux firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)

// Init firestore
// const firestore = firebase.firestore()

// Add firebase to reducers
// const createStoreWithFirebase = compose(
//     reactReduxFirebase(firebase, rrfConfig),
//     reduxFirestore(firebase)
// )(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    // notify: notifyReducer Add custom reducers here
})

// Create initial State
const initialState = {}

// const store = createStoreWithFirebase(rootReducer, initialState, compose(
//     reactReduxFirebase(firebase),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

export default store