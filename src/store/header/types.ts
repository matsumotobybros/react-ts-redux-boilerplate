export const enum HeaderActionTypes {
  LOG_IN = "login",
  LOG_OUT = "logout"
}

export interface HeaderState {
  readonly login: boolean
}
