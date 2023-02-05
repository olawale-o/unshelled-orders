import { api } from "../api";

export const getOrdersService = async (token, page) => {
  const response = await api.get(`/order_items?items_per_page=${page.items_per_page}&page=${page.page}&sort_by=${page.sortBy}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getSingeleOrderService = async (token, orderId) => {
  const response = await api.get(`/order_items/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const deleteOrderService = async (token, orderId) => {
  const response = await api.delete(`/order_items/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}