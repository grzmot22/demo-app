import types from "./types";

const initialState = {
  userId: "",
  user: {},
  accessToken: "",
  idToken: "",
  refreshToken: "",
  signInSuccess: false,
  signInLoading: false,
  signInError: null,
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
        idToken: action.payload.idToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.user.id,
        user: action.payload.user,
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        signInLoading: false,
        signInError: action.payload.error
      };
    case types.SIGN_OUT:
      return {
        ...state,
        userId: "",
        accessToken: "",
        refreshToken: ""
      };
    default:
      return state;
  }
}
