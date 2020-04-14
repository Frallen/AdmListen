import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  firebaseReducer,
  reactReduxFirebase,
  getFirebase,
} from "react-redux-firebase";
import {
  reduxFirestore,
  firestoreReducer,
  getFirestore,
} from "redux-firestore";
import firebase from "./../config/config";
import thunk from "redux-thunk";
import MainReducer from "./mainReducer";

let reducers = combineReducers({
  main: MainReducer,
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true
};

// ДЛЯ РАСШИРЕНИЯ В ХРОМЕ
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
//////////

let store = createStore(
  reducers,
  composeEnhancers(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

export default store;
