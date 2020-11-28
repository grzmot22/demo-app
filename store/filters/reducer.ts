import { Constants } from "./constants";
import {
 IExpensesState,
ExpensesActions
} from "./types";

const init: IExpensesState = {
  uid: ""
};

export const authReducer = (
  state: IExpensesState = init,
  action: ExpensesActions
): IExpensesState => {
  switch (action.type) {
    case Constants.ADD_EXPENSE:
      return {
        ...state,
        expense: action.payload.expense
      };
      case Constants.REMOVE_EXPENSE:
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
