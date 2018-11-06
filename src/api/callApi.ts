
export const enum REQUEST_METHODS {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete"
}

const callApi = (
  method: REQUEST_METHODS,
  url: string,
  path: string,
  data?: any
): Promise<Response> => {
  return fetch(`${url}/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ContentType: "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export default callApi