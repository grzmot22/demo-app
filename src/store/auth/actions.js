import types from "./types";
import * as Google from 'expo-google-app-auth';
import { startSetExpenses } from "../expenses/actions";

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: "962931478339-1ur6v20f1b44ks21hd2b6vn58fngtidh.apps.googleusercontent.com",
      iosClientId: "962931478339-9rdvv40ev5dt4pe0mg339710p1d8ccng.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export const signInFailure = error => ({
  type: types.SIGN_IN_FAILURE,
  payload: { error }
});

export const signIn = () => {
  const signInBegin = () => ({
    type: types.SIGN_IN_BEGIN
  });

  const signInSuccess = data => ({
    type: types.SIGN_IN_SUCCESS,
    payload: { ...data }
  });

  return async (dispatch, getState) => {
 

    dispatch(signInBegin());
    console.log("signInBegin");
    try {
      const data = await signInWithGoogleAsync()
      console.log(data);
      dispatch(signInSuccess(data));
      dispatch(startSetExpenses())
      console.log("signInSuccess");
    } catch (error) {
      console.log("signInFailure");
    }
  };
};

export const signOut = () => {
  const handleSignOut = () => ({
    type: types.SIGN_OUT
  });

  return async dispatch => {
    console.log("signOutBegin");
    try {
      dispatch(handleSignOut());
      console.log("signOutSuccess");
    } catch (error) {
      console.log("signOutFailure");
    }
  };
};
