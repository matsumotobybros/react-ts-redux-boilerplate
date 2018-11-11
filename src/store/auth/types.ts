export interface Auth {
  id: string
  password: string
}

export const enum AuthActionTypes {
  SIGN_IN = 'sign_in',
  SIGN_OUT = 'sign_out',
  AUTH_USER = 'auth_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',

  ID_CHANGE = 'id_change',
  PASSWORD_CHANGE = 'password_change'
}

export interface AuthState {
  readonly authenticated: boolean
  readonly error: string,
  readonly id: string,
  readonly password: string,

}