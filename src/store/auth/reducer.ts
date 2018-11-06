import {AuthActionTypes, AuthState} from "./types";
import {Reducer} from "redux";

const initialState: AuthState = {
  authenticated: false,
  account: '',
  id: '',
  password: '',
  error: ''
}

const reducer: Reducer<AuthState> = (state = initialState, action ) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_USER:
      return { ...state, authenticated:true }
    case AuthActionTypes.UNAUTH_USER:
      return { ...state, authenticated:false }
    case AuthActionTypes.AUTH_ERROR:
      return { ...state, error: action.payload }
    case  AuthActionTypes.ACCOUNT_CHANGE:
      return { ...state, account: action.payload }
    case  AuthActionTypes.ID_CHANGE:
      return { ...state, id: action.payload }
    case  AuthActionTypes.PASSWORD_CHANGE:
      return { ...state, password: action.payload }
    default: {
      return state
    }
  }
}

export { reducer as authReducer }