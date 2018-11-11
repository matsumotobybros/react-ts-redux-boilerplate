import {all, call, fork, put, take, takeEvery} from "redux-saga/effects";
import {AuthActionTypes} from "./types";
import {callApi, callApiUrl, getApiSelf, postApi, REQUEST_METHODS} from "../../api/callApi";
import {authError, authUser, unauthUser} from "./actions";
import { history } from "../../index";

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:3090"

function* login(action: any) {
  try {
    // var params = new URLSearchParams();
    // params.append('username', action.payload.id);
    // params.append('password', action.payload.password);
    // const res = yield call(getApiSelf, "http://localhost:8080", "self", action.payload)
    // const res = yield call(postApi, "http://localhost:8082", "login", params)
    const res = yield call(callApi, REQUEST_METHODS.POST, "http://localhost:3090", "signin", action.payload)
    if (res.error) {
      yield put(authError(res.error))
    } else {
      yield [
        put(authUser()),
        localStorage.setItem("token", res.token)]
        history.push("/users")
        // TODO: redirect to /home by using browserHistory
    }
  } catch (err) {
    if( err instanceof Error) {
      yield put(authError(err.stack))
    } else {
      yield put(authError("An unknow error occured."))
    }
  }
}

function* logout() {
  yield put(unauthUser())
  history.push("/")
}

function* watchLoginRequest() {
  yield takeEvery(AuthActionTypes.SIGN_IN, login)
}

function* watchLogoutRequest() {
  yield takeEvery(AuthActionTypes.SIGN_OUT, logout)
}

function* authSaga() {
  yield all([fork(watchLoginRequest), fork(watchLogoutRequest)])
}

export default authSaga