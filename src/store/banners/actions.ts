import {Banner, BannerActionTypes} from "./types";
import {action} from "typesafe-actions";

export const fetchRequest = () => action(BannerActionTypes.FETCH_REQUEST)

export const fetchSuccess = (banners: Banner[]) => action(BannerActionTypes.FETCH_SUCCESS, banners)

export const fetchError = (message: string) => action(BannerActionTypes.FETCH_ERROR, message)

export const updateRequest = (banner: Banner) => action(BannerActionTypes.UPDATE_REQUEST, banner)

export const updateSuccess = () => action(BannerActionTypes.UPDATE_SUCCESS)

export const updateError = (message: string) => action(BannerActionTypes.UPDATE_ERROR)

export const deleteRequest = (id: number) => action(BannerActionTypes.DELETE_REQUEST, id)

export const editSuccess = () => action(BannerActionTypes.EDIT_SUCCESS)

export const editError = (message: string) => action(BannerActionTypes.EDIT_ERROR, message)


export const edit = (banner: Banner) => action(BannerActionTypes.EDIT, banner)

export const newEdit = () => action(BannerActionTypes.NEW)

export const cancel = () => action(BannerActionTypes.CANCEL)

export const targetBannerChange = (targetBanner: Banner) => action(BannerActionTypes.TARGET_BANNER_CHANGE, targetBanner)