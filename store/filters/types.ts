import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export interface IExpensesState {
  expenses:IExpense[] | undefined;
}
export interface IExpense {
  id: String | undefined;
  amount: Number;
  createdAt: Number;
  description: String;
  note: String;
}


export type ExpensesActions = ActionType<typeof actions>;