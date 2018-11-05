export interface User {
  id: number
  name: string
  localized_name: string
  icon: string
}

export const enum UsersActionTypes {
  FETCH_REQUEST = "@@users/FETCH_REQUEST",
  FETCH_SUCCESS = "@@users/FETCH_SUCCESS",
  FETCH_ERROR = "@@users/FETCH_ERROR",
  SELECT_USER = "@@users/SELECT_USER",
  SELECTED = "@@users/SELECTED"
}

export interface UsersState {
  readonly loading: boolean
  readonly data: User[]
  readonly errors?: string
}
