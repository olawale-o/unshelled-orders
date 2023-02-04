import { api } from "../api";

export const loginService = async (email, password) => {
  const response = await api.post("/login", { email, password },  {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};