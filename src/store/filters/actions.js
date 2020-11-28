import axios from "axios";
import types from "./types";
import deviceStorage from "../../helpers/deviceStorage";
import { composeError, sendError, setupAnalytics } from "../../helpers/general";
import { unregisterBackgroundUploadTask } from "../../helpers/backgroundUpload";
import { disableGeolocationService } from "../../helpers/backgroundGeolocation";
import config from "../../config";

export const signInFailure = error => ({
  type: types.SIGN_IN_FAILURE,
  payload: { error }
});

export const signIn = (login, password, returningUser = false) => {
  const signInBegin = () => ({
    type: types.SIGN_IN_BEGIN
  });

  const signInSuccess = data => ({
    type: types.SIGN_IN_SUCCESS,
    payload: { ...data }
  });

  return async (dispatch, getState) => {
    if ((!login || !password) && !returningUser) {
      dispatch(signInFailure(composeError("Please_provide_login_and_password")));
      return;
    }

    dispatch(signInBegin());
    console.log("signInBegin");
    try {
      let response = await axios(config.SERVICES.AUTHENTICATION.LOGIN(login, password));
      let { data } = response;
      await deviceStorage.setLoginCredentials(login, password);
      await deviceStorage.setUserId(data.userId);
      await deviceStorage.setTokens(data.accessToken, data.refreshToken);
      await setupAnalytics(data.userId);

      dispatch(signInSuccess(data));
      console.log("signInSuccess");
    } catch (error) {
      console.log("signInFailure");
      sendError(error);
      handleSignInError(dispatch, error, returningUser);
    }
  };
};

export const handleSignInError = (dispatch, error, returningUser) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        {
          if (returningUser) {
            dispatch(signInFailure(composeError("", 0)));
          } else {
            dispatch(
              signInFailure(composeError("The_username_or_password_you_provided_is_incorrect", 400))
            );
          }
        }
        break;
      case 401:
        dispatch(signInFailure(composeError("You_dont_have_permission_to_log_in", 401)));
        break;
      default:
        break;
    }
  } else {
    dispatch(signInFailure(composeError("Unable_to_establish_server_connection")));
  }
};

export const forgotPasswordFailure = error => ({
  type: types.FORGOT_PASSWORD_FAILURE,
  payload: { error }
});

export const forgotPassword = emailAddress => {
  const forgotPasswordBegin = () => ({
    type: types.FORGOT_PASSWORD_BEGIN
  });

  const forgotPasswordSuccess = data => ({
    type: types.FORGOT_PASSWORD_SUCCESS,
    payload: { ...data }
  });

  return async (dispatch, getState) => {
    if (!emailAddress) {
      dispatch(forgotPasswordFailure(composeError("Please_provide_email_address")));
      console.log("forgotPasswordFailure");
      return;
    }

    dispatch(forgotPasswordBegin());
    console.log("forgotPasswordBegin");
    try {
      await axios(config.SERVICES.AUTHENTICATION.FORGOT_PASSWORD(emailAddress));

      dispatch(forgotPasswordSuccess());
      console.log("forgotPasswordSuccess");
    } catch (error) {
      console.log("forgotPasswordFailure");
      sendError(error);
      handleforgotPasswordError(dispatch, error);
    }
  };
};

export const handleforgotPasswordError = (dispatch, error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        {
          dispatch(
            forgotPasswordFailure(composeError("The_email_address_you_provided_is_incorrect", 400))
          );
        }
        break;
      default:
        break;
    }
  } else {
    dispatch(forgotPasswordFailure(composeError("Unable_to_establish_server_connection")));
  }
};

export const signOut = () => {
  const handleSignOut = () => ({
    type: types.SIGN_OUT
  });

  return async dispatch => {
    console.log("signOutBegin");
    try {
      await deviceStorage.clearDeviceStorage();
      await disableGeolocationService();
      await unregisterBackgroundUploadTask();
      dispatch(handleSignOut());
      console.log("signOutSuccess");
    } catch (error) {
      console.log("signOutFailure");
    }
  };
};

export const tryRefreshToken = (accessToken, refreshToken) => {
  const refreshTokenBegin = () => ({
    type: types.REFRESH_TOKEN_BEGIN
  });

  const refreshTokenSuccess = data => ({
    type: types.REFRESH_TOKEN_SUCCESS,
    payload: { ...data }
  });

  const refreshTokenFailure = error => ({
    type: types.REFRESH_TOKEN_FAILURE,
    payload: { error }
  });

  return async dispatch => {
    console.log("refreshTokenBegin");
    dispatch(refreshTokenBegin());

    if (!accessToken || !refreshToken) {
      dispatch(refreshTokenFailure(composeError("")));
      return;
    }

    try {
      let response = await axios(
        config.SERVICES.AUTHENTICATION.REFRESH_TOKEN(accessToken, refreshToken)
      );
      let { data } = response;
      await deviceStorage.setUserId(data.userId);
      await deviceStorage.setTokens(data.accessToken, data.refreshToken);
      dispatch(refreshTokenSuccess(data));
      console.log("refreshTokenSuccess");
    } catch (error) {
      console.log("refreshTokenFailure");
      dispatch(refreshTokenFailure(error));
    }
  };
};
