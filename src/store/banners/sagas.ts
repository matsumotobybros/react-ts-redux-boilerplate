import {axiosPostApi, callApi, deleteApi, getApi, REQUEST_METHODS} from "../../api/callApi";
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {cancel, editError, editSuccess, fetchError, fetchRequest, fetchSuccess, updateError} from "./actions";
import {Banner, BannerActionTypes} from "./types";

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:8080"

function* handleFetch() {
  try {
    const res = yield call(getApi, API_ENDPOINT, "manage/banner-settings")

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res.data))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError("An unknown error occured"))
    }
  }
}

function* handleUpdate(action: any) {
  try {
    const banner = action.payload
    const res = yield call(axiosPostApi, API_ENDPOINT, "manage/banner-settings", banner)

    if (res.error) {
      yield put(updateError(res.error))
    } else {
      yield put(fetchRequest())
      yield put(cancel())
    }

  } catch (err) {
    if (err instanceof Error) {
      yield put(updateError(err.stack))
    } else {
      yield put(updateError("An unknown error occured"))
    }
  }
}

function* handleDelete(action: any) {
  try {
    const id = action.payload
    const res = yield call(deleteApi, API_ENDPOINT, "manage/banner-settings/"+id)

    if (res.error) {
      yield put(editError(res.error))
    } else {
      yield put(fetchRequest())
    }

  } catch (err) {
    if (err instanceof Error) {
      yield put(editError(err.stack))
    } else {
      yield put(editError("An unknown error occured"))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(BannerActionTypes.FETCH_REQUEST, handleFetch)
}

function* watchUpdateRequest() {
  yield takeEvery(BannerActionTypes.UPDATE_REQUEST, handleUpdate)
}

function* watchDeleteRequest() {
  yield takeEvery(BannerActionTypes.DELETE_REQUEST, handleDelete)
}

function* bannersSaga() {
  yield all([fork(watchFetchRequest), fork(watchUpdateRequest), fork(watchDeleteRequest)])
}

export default bannersSaga