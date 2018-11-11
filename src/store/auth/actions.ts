import { action } from "typesafe-actions"
import {Auth, AuthActionTypes} from "./types";

export const signIn = (auth: Auth) => action(AuthActionTypes.SIGN_IN, auth)

export const signOut = () => action(AuthActionTypes.SIGN_OUT)

export const authUser = () => action(AuthActionTypes.AUTH_USER)

export const unauthUser = () => action(AuthActionTypes.UNAUTH_USER)

export const authError = (message: string) => action(AuthActionTypes.AUTH_ERROR, message)

export const idChange = (id: string) => action(AuthActionTypes.ID_CHANGE, id)

export const passwordChange = (password: string) => action(AuthActionTypes.PASSWORD_CHANGE, password)