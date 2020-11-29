import types from "./types";

const initialState = {
  userId: "",
  accessToken: "",
  calendarDialogVisible: false
};

export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_BEGIN:
      return {
        ...state,
        signInSuccess: false,
        signInLoading: true,
        signInError: null
      };
      case types.SET_CALENDAR_DIALOG_VISIBLE:
      return {
        ...state,
        calendarDialogVisible: action.payload.calendarDialogVisible
      };
    default:
      return state;
  }
}
