import types from "./types";


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
