import types from "./types";

const initialState = {
  userId: "",
  accessToken: "",
  refreshToken: "",
  signInSuccess: false,
  signInLoading: false,
  signInError: null,
  refreshTokenSuccess: false,
  refreshTokenLoading: false,
  refreshTokenError: null,
  forgotPasswordSuccess: false,
  forgotPasswordLoading: false,
  forgotPasswordError: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_BEGIN:
      return {
        ...state,
        signInSuccess: false,
        signInLoading: true,
        signInError: null
      };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: true,
        signInLoading: false,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        signInLoading: false,
        signInError: action.payload.error
      };
    case types.FORGOT_PASSWORD_BEGIN:
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordLoading: true,
        forgotPasswordError: null
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordLoading: false
      };
    case types.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: action.payload.error
      };
    case types.SIGN_OUT:
      return {
        ...state,
        userId: "",
        accessToken: "",
        refreshToken: ""
      };
    case types.REFRESH_TOKEN_BEGIN:
      return {
        ...state,
        refreshTokenSuccess: false,
        refreshTokenLoading: true,
        refreshTokenError: null
      };
    case types.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refreshTokenSuccess: true,
        refreshTokenLoading: false,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case types.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        refreshTokenLoading: false,
        refreshTokenError: action.payload.error
      };
    default:
      return state;
  }
}
