import { Reducer } from "redux"
import { HeaderActionTypes, HeaderState } from "./types"

const initialState: HeaderState = {
  login: false
}

const reducer: Reducer<HeaderState> = (state = initialState, action) => {
  switch (action.type) {
    case HeaderActionTypes.LOG_IN:
    case HeaderActionTypes.LOG_OUT: {
      return { ...state, login: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as headerReducer }
