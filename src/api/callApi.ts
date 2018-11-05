const callApi = (
  method: string,
  url: string,
  path: string,
  data?: any
): Promise<Response> => {
  return fetch(`${url}/api${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ContentType: "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}
export default callApi