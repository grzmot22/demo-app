import moment from 'moment';
import types from "./types";

const initialState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TEXT_FILTER:
      return {
        ...state,
        text: action.payload.text
      };
    case types.SORT_BY_DATE:
      return {
        ...state,
        sortBy: 'date'
      };
    case types.SORT_BY_AMOUNT:
      return {
        ...state,
        sortBy: 'amount'
      };
    case types.SET_START_DATE:
      return {
        ...state,
        startDate: action.payload.startDate
      };
    case types.SET_END_DATE:
      return {
        ...state,
        endDate: action.payload.endDate 
      };
    default:
      return state;
  }
}
