import types from "./types";

export const setUserTheme = theme => ({
  type: types.SET_USER_THEME,
  payload: { theme }
});