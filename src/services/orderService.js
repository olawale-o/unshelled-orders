import { api } from "../api";

export const getOrdersService = async (token, page) => {
  const response = await api.get(`/order_items?items_per_page=${page.items_per_page}&page=${page.page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getSingeleOrderService = async (orderId) => {
  const response = await api.get(`/order_items/${orderId}`, {
    withCredentials: true,
  });
  return response.data;
};