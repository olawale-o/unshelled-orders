import { api } from "../api";

export const loginService = async ({ username, password }) => {
  const response = await api.post("/account", { username, password }, {
    withCredentials: true,
  });
  return response.data;
};

export const updateAccountService = async (data, token) => {
  const response = await api.put('/account', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};