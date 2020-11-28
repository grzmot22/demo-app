import { Constants } from "./constants";
import {
IAuthState,
  AuthActions
} from "./types";

const init: IAuthState = {
  uid: ""
};

export const authReducer = (
  state: IAuthState = init,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case Constants.AUTH_LOGIN:
      return {
        ...state,
        uid: action.payload
      };
    case Constants.AUTH_LOGOUT:
      return init;
    default:
      return state;
  }
};
