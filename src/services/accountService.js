import { api } from "../api";

export const loginService = async (email, password) => {
  const response = await api.post("/account", { email, password },  {
    withCredentials: true
  });
  return response.data;
};

export const updateAccountService = async (data) => {
  const response = await api.put('/account', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};