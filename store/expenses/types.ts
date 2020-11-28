import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export interface IAuthState {
  uid: String | undefined;
}

export type AuthActions = ActionType<typeof actions>;