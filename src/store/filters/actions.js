import types from "./types";

 export const setTextFilter = (text) => ({
  type:types.SET_TEXT_FILTER,
  payload: {text}
});

// SORT_BY_DATE
export const sortByDate = () => ({
  type: types.SORT_BY_DATE,
});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: types.SORT_BY_AMOUNT
});
// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: types.SET_START_DATE,
  payload: startDate

});
// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: types.SET_END_DATE,
  payload: endDate
});