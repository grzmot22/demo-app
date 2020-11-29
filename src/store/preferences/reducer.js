import types from "./types";

const initialState = {
  theme: "light"
};

export default function preferencesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_BEGIN:
      return {
        ...state,
        signInSuccess: false,
        signInLoading: true,
        signInError: null
      };
    default:
      return state;
  }
}
