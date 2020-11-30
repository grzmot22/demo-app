import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/reducer";
import expensesReducer from "./expenses/reducer";
import preferencesReducer from "./preferences/reducer";
import authTypes from "./auth/types";
import filterReducer from "./filters/reducer";


const reducer = combineReducers({
    auth: authReducer,
    preferences: preferencesReducer,
    expenses: expensesReducer,
    filters:filterReducer
  });

const rootReducer = (state, action) => {
  if (action.type === authTypes.SIGN_OUT) {
    state = undefined;
  }

  return reducer(state, action);
};

export default () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
  );
  return store;
};
