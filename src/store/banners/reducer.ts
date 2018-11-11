import {BannerActionTypes, BannersState } from "./types";
import {Reducer} from "redux";
import {number} from "prop-types";

const initialState: BannersState = {
  loading: false,
  banners: [],
  errors: undefined,
  editing: false,
  targetBanner: null
}

const reducer: Reducer<BannersState> = (state = initialState, action) => {
  switch (action.type) {
    case BannerActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case BannerActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, banners: action.payload }
    }
    case BannerActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case BannerActionTypes.EDIT: {
      return {...state, editing: true, targetBanner: action.payload }
    }
    case BannerActionTypes.NEW: {
      return {...state, editing: true, targetBanner: {} }
    }
    case BannerActionTypes.CANCEL: {
      return {...state, editing: false, targetBanner: null }
    }

    default: {
      return state
    }
  }
}

export { reducer as bannersReducer }
