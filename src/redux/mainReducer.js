import { reset } from "redux-form";

const Send = "Send";
const Succ = "Succ";
const Error = "Error";
const Admin = "Admin";
const ClearALL = "ClearALL";
const GetActual = "GetActual";
const GetHistory = "GetHistory";
const Check = "Check";

let initialState = {
  access: false,
  ErrorMess: null,
  SuccMessID: null,
  load: false,
  data: [],
  histData: [],
  status: null,
};

let MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case Send:
      return {
        ...state,
        load: true,
      };
    case Succ:
      return {
        ...state,
        load: false,
        ErrorMess: null,
        SuccMessID: action.succ,
      };
    case Error:
      return {
        ...state,
        ErrorMess: action.err,
        load: false,
      };
    case Admin:
      return {
        ...state,
        access: true,
      };
    case ClearALL:
      return {
        ...state,
        ErrorMess: null,
        access: false,
        status: null,
      };
    case GetActual:
      return {
        ...state,
        data: action.data,
      };
    case GetHistory:
      return {
        ...state,
        histData: action.datah,
      };
    case Check:
      return {
        ...state,
        status: action.st,
      };
    default:
      return state;
  }
};
export default MainReducer;

export const SendMessage = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const date = new Date().toLocaleDateString();
  data.date = date;
  try {
    const snap = await firestore.collection("Messages").doc();
    data.id = snap.id;
    data.Status = "На обработке";
    snap.set({
      ...data,
    });
    dispatch({ type: Succ, succ: data.id });
    dispatch(reset("Message"));
  } catch (err) {
    dispatch({ type: Error, err: err.message });
  }
};

export const AdminAcess = (data) => (dispatch) => {
  if (data.Password === "123456") {
    dispatch({ type: Admin });
  } else {
    dispatch({ type: Error, err: "Неверный пароль" });
  }
};

export const Clear = () => (dispatch) => {
  dispatch({ type: ClearALL });
};

export const GetAll = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  await firestore
    .collection("Messages")
    .where("Status", "==", "На обработке")
    .onSnapshot(function (querySnapshot) {
      var actual = [];
      querySnapshot.forEach(function (doc) {
        actual.push(doc.data());
      });

      dispatch({ type: GetActual, data: actual });
    });

  await firestore
    .collection("Messages")
    .where("Status", "==", "Обработано")
    .onSnapshot(function (querySnapshot) {
      var history = [];
      querySnapshot.forEach(function (doc) {
        history.push(doc.data());
      });

      dispatch({ type: GetHistory, datah: history });
    });
};

export const Delete = (id) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  let data;
  const firestore = getFirestore();
  const snap = await firestore.collection("Messages").doc(id).get();

  data = snap.data();

  data.Status = "Обработано";
  await firestore
    .collection("Messages")
    .doc(id)
    .update({
      ...data,
    });
};

export const CheckStatus = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const snap = await firestore.collection("Messages").doc(data.id).get();
  if (snap.exists) {
    const sp = snap.data();
    const st =
      sp.Status === "Обработано"
        ? "Обращение обработано, проверьте электронную почту, на нее была выслана информация о решении."
        : "Обращение еще не обработано, в скором времени оно будет рассмотрено.";
    dispatch({ type: Check, st: st });
  } else {
    let st = "Такого обращения не найдено";
    dispatch({ type: Check, st: st });
  }

  dispatch(reset("Check"));
};
