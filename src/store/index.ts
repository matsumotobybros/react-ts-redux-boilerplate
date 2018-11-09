import { connectRouter, routerMiddleware } from "connected-react-router"
import { History } from "history"
import { applyMiddleware, combineReducers, createStore, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { all, fork } from "redux-saga/effects"
import { usersReducer, UsersState } from "./users"
import { authReducer, AuthState } from "./auth"
import { bannersReducer, BannersState } from "./banners"
import usersSaga from "./users/sagas"
import authSaga from "./auth/sagas"
import bannersSaga from "./banners/sagas"

// The top-level state object
export interface ApplicationState {
  users: UsersState
  auth: AuthState
  banners: BannersState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
const rootReducer = combineReducers<ApplicationState>({
  users: usersReducer,
  auth: authReducer,
  banners: bannersReducer
})

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
function* rootSaga() {
  yield all([fork(usersSaga), fork(authSaga), fork(bannersSaga)])
}

const configureStore = (
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> => {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({})

  // create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
