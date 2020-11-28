// import { Action } from "redux";
// import { IRootState } from "..";
// import { ThunkAction } from "redux-thunk";
import { action } from "typesafe-actions
// import * as GoogleSignIn from 'expo-google-sign-in';
import { Constants } from "./constants";
// import { IError } from "../../types/general";

export const login = (uid: String) =>
  action(Constants.AUTH_LOGIN, uid);

export const startLogin = () => {
    // return () => {
    //     return firebase.auth().signInWithPopup(googleAuthProvider);
    // };
}

export const logout = () =>
  action(Constants.AUTH_LOGOUT);
  
export const startLogout = () => {
    // return () => {
    //     return firebase.auth().signOut();
    // };
};