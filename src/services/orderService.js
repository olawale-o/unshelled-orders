import { api } from "../api";

export const getOrdersService = async () => {
  const response = await api.get('/order_items', {
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