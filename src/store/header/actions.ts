import { action } from "typesafe-actions"

import { HeaderActionTypes } from "./types"

export const login = () => action(HeaderActionTypes.LOG_IN, true)
export const logout = () => action(HeaderActionTypes.LOG_OUT, false)
