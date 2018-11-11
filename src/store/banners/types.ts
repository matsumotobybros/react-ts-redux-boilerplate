export interface Banner {
  id: number
  targetSystem: string
  targetOs: string
  style: string
  description: string
  link: string
  theme: string
  minVersion: string
  maxVersion: string
  height: string
  backgroundColor: string
  marginTop: string
  marginSide: string
  sortOrder: string
  version: string
}

export const enum BannerActionTypes {
 FETCH_REQUEST = "@@banners/FETCH_REQUEST",
 FETCH_SUCCESS = "@@banners/FETCH_SUCCESS",
 FETCH_ERROR = "@@banners/FETCH_ERROR",
 UPDATE_REQUEST = "@@banners/UPDATE_REQUEST",
 UPDATE_SUCCESS = "@@banners/UPDATE_SUCCESS",
 UPDATE_ERROR = "@@banners/UPDATE_ERROR",
 SELECT_BANNER = "@@banners/SELECT_BANNERS",
 SELECTED = "@@banners/SELECTED",
 DELETE_REQUEST = "@@banner/DELETE_REQUEST",
 EDIT_ERROR = "@@banner/EDIT_ERROR",
 EDIT_SUCCESS = "@@banner/EDIT_SUCCESS",
 EDIT ="@@banner/EDIT",
 NEW = "@@banner/NEW",
 CANCEL ="@@banner/CANCEL",
 TARGET_BANNER_CHANGE = "@@banner/TARGET_BANNER_CHANGE"
}

export interface BannersState {
  readonly loading: boolean,
  readonly banners: Banner[],
  readonly errors?: string,
  readonly editing: boolean,
  readonly targetBanner: Banner
}