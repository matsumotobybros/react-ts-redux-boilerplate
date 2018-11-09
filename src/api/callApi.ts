import axios from 'axios';

export const enum REQUEST_METHODS {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete"
}

export const callApi = (
  method: REQUEST_METHODS,
  url: string,
  path: string,
  data?: any
): Promise<Response> => {
  return fetch(`${url}/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const callApiUrl = (
  method: REQUEST_METHODS,
  url: string,
  path: string,
  data?: any
): Promise<Response> => {
  return fetch(`${url}/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ContentType: "application/x-www-form-urlencoded",
    },
    body: data
  }).then(res => res.json())
}


export const postApi = (
  url: string,
  path: string,
  data?: any

) : any => {
  return axios.post(url+"/"+path, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true
  })
}

export const getApiSelf = (
  url: string,
  path: string,
  data?: any

) : any => {
  return axios.get(url+"/"+path,  {
    headers: {
      Authorization:
      "Basic " +
      btoa(
        unescape(encodeURIComponent(data.id + ":" + data.password))
      )
    },
    withCredentials: true
  })
}


export const getApi = (
  url: string,
  path: string,
  data?: any

) : any => {
  return axios.get(url+"/"+path,  {
    headers: {
      Authorization:
      "Basic " +
      btoa(
        unescape(encodeURIComponent("matsu@test.com" + ":" + "test5525"))
      )
    },
    withCredentials: true
  })
}

export const axiosPostApi = (
  url: string,
  path: string,
  data?: any

) : any => {
  return axios.post(url+"/"+path, data, {
    headers: {
      Authorization:
      "Basic " +
      btoa(
        unescape(encodeURIComponent("matsu@test.com" + ":" + "test5525"))
      )
    },
    withCredentials: true
  })
}


export const deleteApi = (
  url: string,
  path: string,
  data?: any

) : any => {
  return axios.delete(url+"/"+path,  {
    headers: {
      Authorization:
      "Basic " +
      btoa(
        unescape(encodeURIComponent("matsu@test.com" + ":" + "test5525"))
      )
    },
    withCredentials: true
  })
}
