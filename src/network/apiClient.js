import { BASE_URL } from "../constants/common";

export const apiClient = async ({ url, method, authToken, body }) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authToken}`,
    },
    body: body && JSON.stringify(body),
  });
  const responseJson = await response.json();
  if (response.status === 200) {
    return responseJson;
  } else if (response.status === 401) {
    throw new Error(responseJson.message);
  } else {
    throw new Error(response);
  }
};
