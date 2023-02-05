import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useAccount } from "../../provider/AccountProvider";
import { getOrdersService } from "../../services/orderService";

const Orders = () => {
  const { user } = useAccount();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrdersService(user.token, { page: currentPage, items_per_page: 10 });
        console.log(response);
        if (response.total % 10 === 0) {
          setTotalPages(response.total / 5);
        } else {
          setTotalPages(Math.floor(response.total / 10) + 1);
        }
        setOrders(response.data); 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchOrders();
    }
  }, [user, currentPage]);
  const onPageChange = async (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <table className="orders">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Id</th>
            <th>Price</th>
            <th>Date</th>
            <th>Product category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr className="order" key={i}>
              <td>{order.id}</td>
              <td>{order.product_id}</td>
              <td>{order.price}</td>
              <td>{order.date}</td>
              <td>{order.product_category_name}</td>
              <td>
                <Link to={`/order_items/${order.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={currentPage} totalPages={totalPages} setPage= {onPageChange} />
      {loading && <div className="loading loading-lg"></div>}
    </>
  );
};

export default Orders;

